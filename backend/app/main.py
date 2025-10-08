from fastapi import FastAPI
from firebase_admin import credentials, firestore, initialize_app
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth

app = FastAPI()

cred = credentials.Certificate("serviceAccountKey.json")
initialize_app(cred)
db = firestore.client()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Hello World"}
