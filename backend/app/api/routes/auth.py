from fastapi import APIRouter
from firebase_admin import auth
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["auth"])


class SignUp(BaseModel):
    name: str
    email: EmailStr
    password: str


class Login(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
def signup(request: SignUp):
    # user = auth.create_user(email=request.email, password=request.password)
    return {"message": "Signup successful"}


@router.post("/login")
def login(request: Login):
    return {"message": "Login successful"}
    # user = auth.sign_in_with_email_and_password(request.email, request.password)
