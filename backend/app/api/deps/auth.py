from fastapi import Header, HTTPException
from firebase_admin import auth


# verify id token issued by firebase
def require_user(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="missing token")
    id_token = authorization.split(" ", 1)[1]
    try:
        decoded = auth.verify_id_token(id_token)
        return decoded  # includes 'uid', 'email', etc.
    except Exception:
        raise HTTPException(status_code=401, detail="invalid or expired token")
