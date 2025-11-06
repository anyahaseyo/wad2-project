"""Helper functions for sending notifications with email integration."""

from datetime import datetime, timezone
from typing import Optional, Dict, Any
from google.cloud import firestore

from .firebase import db
from .email import (
    email_service,
    get_achievement_email_template,
)


def _user_doc(uid: str):
    """Get user document reference."""
    return db.collection("users").document(uid)


def _notifications_collection(uid: str):
    """Get user's notifications collection reference."""
    return _user_doc(uid).collection("notifications")


def get_user_email(uid: str) -> Optional[str]:
    """Get user's email address from Firebase Auth or user document."""
    try:
        # Try to get from user document first
        user_doc = _user_doc(uid).get()
        if user_doc.exists:
            user_data = user_doc.to_dict() or {}
            if "email" in user_data and user_data["email"]:
                return user_data["email"]
        
        # If not found in Firestore, get from Firebase Auth
        try:
            import firebase_admin.auth as auth
            user_record = auth.get_user(uid)
            if user_record.email:
                return user_record.email
        except Exception as auth_error:
            print(f"Error getting email from Firebase Auth: {auth_error}")
        
        return None
    except Exception as e:
        print(f"Error getting user email: {e}")
        return None


def get_user_notification_settings(uid: str) -> Dict[str, bool]:
    """Get user's notification settings."""
    try:
        user_doc = _user_doc(uid).get()
        if user_doc.exists:
            user_data = user_doc.to_dict() or {}
            settings = user_data.get("notification_settings", {})
            return {
                "achievement_notifications": settings.get("achievement_notifications", False),
            }
        return {
            "achievement_notifications": False,
        }
    except Exception as e:
        print(f"Error getting notification settings: {e}")
        # Return default settings instead of empty dict to prevent issues
        return {
            "achievement_notifications": False,
        }


def send_achievement_notification(
    uid: str,
    achievement_title: str,
    achievement_icon: str,
    achievement_description: str,
    achievement_id: str,
) -> bool:
    """
    Send achievement unlock notification (in-app + email).
    
    This function is designed to be non-blocking - failures in notification sending
    should not prevent achievement claims from succeeding.
    
    Args:
        uid: User ID
        achievement_title: Title of the achievement
        achievement_icon: Icon/emoji for the achievement
        achievement_description: Description of what was achieved
        achievement_id: ID of the achievement
    
    Returns:
        True if notification was created successfully, False otherwise
    """
    try:
        # Check if user has achievement notifications enabled
        settings = get_user_notification_settings(uid)
        if not settings or not settings.get("achievement_notifications", False):
            print(f"Achievement notifications disabled for user {uid}")
            return False
        
        notification_sent = False
        email_sent = False
        
        # Create in-app notification (separate try-catch to prevent one failure from blocking the other)
        try:
            now = datetime.now(timezone.utc)
            notification_data = {
                "type": "achievement",
                "title": f"Achievement Unlocked: {achievement_title}",
                "message": achievement_description,
                "is_read": False,
                "created_at": now,
                "action_url": "/profile?tab=achievements",
                "metadata": {
                    "achievement_id": achievement_id,
                    "achievement_icon": achievement_icon,
                },
            }
            
            _notifications_collection(uid).add(notification_data)
            print(f"✅ In-app notification created for user {uid}")
            notification_sent = True
        except Exception as e:
            print(f"⚠️  Failed to create in-app notification for user {uid}: {e}")
            # Don't return False here - continue to try email
        
        # Send email notification (separate try-catch)
        try:
            user_email = get_user_email(uid)
            if user_email:
                # Get user name
                try:
                    user_doc = _user_doc(uid).get()
                    user_name = "there"
                    if user_doc.exists:
                        user_data = user_doc.to_dict() or {}
                        user_name = user_data.get("displayName") or user_data.get("name") or "there"
                except Exception as name_error:
                    print(f"⚠️  Could not get user name: {name_error}")
                    user_name = "there"
                
                subject, html_content, text_content = get_achievement_email_template(
                    user_name, achievement_title, achievement_icon, achievement_description
                )
                
                email_result = email_service.send_email(
                    to_email=user_email,
                    subject=subject,
                    html_content=html_content,
                    text_content=text_content,
                )
                if email_result:
                    email_sent = True
                    print(f"✅ Email notification sent to {user_email}")
        except Exception as e:
            print(f"⚠️  Failed to send email notification for user {uid}: {e}")
            # Don't return False here - in-app notification might have succeeded
        
        # Return True if at least one notification method succeeded
        return notification_sent or email_sent
        
    except Exception as e:
        # Catch any unexpected errors and log them, but don't propagate
        print(f"⚠️  Error in send_achievement_notification for user {uid}: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return False



