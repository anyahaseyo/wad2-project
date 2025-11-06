"""Email service for sending notifications to users."""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from datetime import datetime
from pathlib import Path

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    # Look for .env file in backend directory
    env_path = Path(__file__).parent.parent.parent / '.env'
    load_dotenv(dotenv_path=env_path)
except ImportError:
    # python-dotenv not installed, will use system env vars only
    pass


# Email configuration from environment variables
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", SMTP_USER)
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "WAD2 Project")


class EmailService:
    """Service for sending emails via SMTP."""

    def __init__(self):
        self.host = SMTP_HOST
        self.port = SMTP_PORT
        self.username = SMTP_USER
        self.password = SMTP_PASSWORD
        self.from_email = SMTP_FROM_EMAIL
        self.from_name = SMTP_FROM_NAME

    def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None,
    ) -> bool:
        """
        Send an email to a recipient.

        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML content of the email
            text_content: Plain text fallback (optional)

        Returns:
            True if email was sent successfully, False otherwise
        """
        if not self.username or not self.password:
            print("⚠️  Email credentials not configured. Skipping email send.")
            return False

        try:
            # Create message
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"{self.from_name} <{self.from_email}>"
            msg["To"] = to_email

            # Add text and HTML parts
            if text_content:
                part1 = MIMEText(text_content, "plain")
                msg.attach(part1)

            part2 = MIMEText(html_content, "html")
            msg.attach(part2)

            # Send email with timeout to prevent hanging on serverless platforms
            with smtplib.SMTP(self.host, self.port, timeout=10) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.send_message(msg)

            print(f"✅ Email sent successfully to {to_email}")
            return True

        except Exception as e:
            print(f"❌ Failed to send email to {to_email}: {str(e)}")
            return False


# Email templates

def get_achievement_email_template(
    user_name: str, achievement_title: str, achievement_icon: str, achievement_description: str
) -> tuple[str, str]:
    """Generate achievement unlock email template."""
    
    # Get frontend URL from environment variable for deployment
    frontend_url = os.getenv("FRONTEND_URL", "https://your-app-url.com")
    
    subject = f"🎉 Achievement Unlocked: {achievement_title}!"
    
    text_content = f"""
Hi {user_name},

Congratulations! You've unlocked a new achievement!

{achievement_icon} {achievement_title}
{achievement_description}

Keep up the great work on your wellness journey!

Best regards,
WAD2 Project Team
    """
    
    html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            text-align: center;
            margin-bottom: 30px;
        }}
        .achievement-icon {{
            font-size: 80px;
            margin-bottom: 20px;
        }}
        .achievement-title {{
            font-size: 28px;
            font-weight: bold;
            color: #2d3436;
            margin-bottom: 10px;
        }}
        .achievement-description {{
            font-size: 16px;
            color: #636e72;
            margin-bottom: 30px;
        }}
        .cta-button {{
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            font-size: 14px;
            color: #95a5a6;
        }}
        .celebration {{
            text-align: center;
            font-size: 48px;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="celebration">🎉✨🎊</div>
            <h1 style="color: #667eea; margin-bottom: 10px;">Achievement Unlocked!</h1>
        </div>
        
        <div style="text-align: center;">
            <div class="achievement-icon">{achievement_icon}</div>
            <div class="achievement-title">{achievement_title}</div>
            <div class="achievement-description">{achievement_description}</div>
        </div>
        
        <div style="text-align: center;">
            <p style="font-size: 16px; color: #2d3436;">
                Congratulations, {user_name}! You're making excellent progress on your wellness journey.
            </p>
            <a href="{frontend_url}/profile?tab=achievements" class="cta-button">
                View Your Achievements
            </a>
        </div>
        
        <div class="footer">
            <p>Keep up the great work! 💪</p>
            <p>WAD2 Project Team</p>
        </div>
    </div>
</body>
</html>
    """
    
    return subject, html_content, text_content


# Initialize email service
email_service = EmailService()

