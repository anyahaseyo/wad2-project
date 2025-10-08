from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from ..deps.auth import require_user
from ...core.firebase import db

router = APIRouter(prefix="/profile", tags=["profile"])


class Profile(BaseModel):
    name: str
    email: EmailStr
    avatar: str


@router.post("/")
# verify user id token before upserting profile
def upsert_profile(payload: dict, user: dict = Depends(require_user)):
    print(user)
    uid = user["uid"]
    # create document in users collection
    db.collection("users").document(uid).set(
        {
            "full_name": payload["name"],
            "email": payload["email"],
            "created_at": datetime.now(timezone.utc),
        },
        merge=True,
    )
    return {"ok": True, "uid": uid, "message": "profile upserted successfully"}
