import os
import base64
import binascii
import json
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin

if not firebase_admin._apps:
    encoded = os.environ.get("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64")
    if not encoded:
        raise ValueError("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set")
    
    # Clean and fix base64 string (remove whitespace, add padding if needed)
    encoded = encoded.strip().replace('\n', '').replace(' ', '')
    
    # Add padding if needed (base64 strings must be multiple of 4)
    missing_padding = len(encoded) % 4
    if missing_padding:
        encoded += '=' * (4 - missing_padding)
    
    try:
        decoded = base64.b64decode(encoded).decode("utf-8")
        cred_dict = json.loads(decoded)
        cred = credentials.Certificate(cred_dict)
        initialize_app(cred)
    except (binascii.Error, ValueError) as e:
        raise ValueError(f"Failed to decode FIREBASE_SERVICE_ACCOUNT_KEY_BASE64: {str(e)}. Please check that the value is a valid base64-encoded JSON string.")

db = firestore.client()
