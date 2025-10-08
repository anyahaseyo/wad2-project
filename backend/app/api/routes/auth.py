from fastapi import APIRouter, Response, Depends

from ..deps.auth import require_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(response: Response, user=Depends(require_user)):
    return {"ok": True, "uid": user["uid"], "claims": user}
