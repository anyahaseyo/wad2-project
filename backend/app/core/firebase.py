from firebase_admin import credentials, firestore, initialize_app
import firebase_admin

if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    initialize_app(cred)

db = firestore.client()
