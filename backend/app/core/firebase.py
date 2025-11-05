import os
import base64
import json
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin

if not firebase_admin._apps:
    encoded = os.environ.get("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64")
    if not encoded:
        raise ValueError("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set")
    decoded = base64.b64decode(encoded).decode("utf-8")
    cred_dict = json.loads(decoded)
    cred = credentials.Certificate(cred_dict)
    initialize_app(cred)

db = firestore.client()
