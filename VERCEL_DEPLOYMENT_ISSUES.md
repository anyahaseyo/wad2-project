# Critical Issues for Vercel Deployment

## 🚨 CRITICAL ARCHITECTURAL ISSUES

### 1. **Python Backend on Vercel**
**Issue**: Your backend is Python FastAPI, but Vercel's primary support is for Node.js. While Vercel supports Python via serverless functions, it has limitations:
- **Socket.IO WebSocket connections** will NOT work properly on Vercel serverless functions
- Long-running background tasks (like your pet update loop) won't work
- Static file mounting may have issues

**Solutions**:
- **Option A (Recommended)**: Deploy backend separately on:
  - Railway, Render, or Fly.io (support persistent connections)
  - AWS Elastic Beanstalk / EC2
  - Google Cloud Run / App Engine
  - DigitalOcean App Platform
- **Option B**: Refactor backend to use Vercel serverless functions (major rewrite, lose Socket.IO)
- **Option C**: Use Vercel for frontend only, backend elsewhere

### 2. **Socket.IO WebSocket Limitations**
**Issue**: Your app uses Socket.IO for real-time pet updates. Vercel serverless functions:
- Don't support persistent WebSocket connections
- Have execution time limits (10s hobby, 60s pro)
- Can't maintain state between requests

**Impact**: Pet real-time features (`pet_update`, `move_pet`, `grab_pet`) will break

**Solutions**:
- Deploy backend on platform that supports WebSockets (Railway, Render, Fly.io)
- Or use polling as fallback (less real-time)
- Or use external WebSocket service (Pusher, Ably)

---

## 🔴 HIGH PRIORITY FIXES

### 3. **Hardcoded localhost URLs**
**Files affected**:
- `frontend/src/composables/useSubjects.js` (line 12)
- `frontend/src/composables/useStudySessions.js` (line 12)
- `frontend/src/lib/api.js` (line 4) - has fallback but should use env var

**Fix**: Remove `http://localhost:8000` fallbacks, require environment variables

### 4. **Inconsistent Environment Variable Usage**
**Issue**: Mix of `VUE_APP_*` (Vue CLI) and `VITE_*` (Vite) prefixes
- `frontend/src/lib/firebase.js` uses `VUE_APP_*`
- `frontend/src/lib/api.js` supports both
- `frontend/src/composables/useSubjects.js` uses `VITE_API_URL`
- `frontend/src/composables/useStudySessions.js` uses `VITE_API_URL`

**Fix**: Standardize on one build tool (Vue CLI or Vite). Since you're using `vue-cli-service`, stick with `VUE_APP_*` prefix.

### 5. **Email Template Hardcoded URLs**
**File**: `backend/app/core/email.py`
- Line 200: `https://your-app-url.com/profile?tab=achievements`
- Line 320: `https://your-app-url.com/checkin`
- Line 438: `https://your-app-url.com/timer`

**Fix**: Use environment variable for base URL

### 6. **Missing vercel.json Configuration**
**Issue**: No deployment configuration file

**Fix**: Create `vercel.json` with proper routing and build settings

### 7. **CORS Configuration**
**Issue**: `CORS_ALLOWED_ORIGINS` environment variable required but not documented
- Must include your Vercel frontend URL
- Must include localhost for development

**Fix**: Set in Vercel environment variables

---

## 🟡 MEDIUM PRIORITY FIXES

### 8. **Static File Mounting**
**File**: `backend/app/main.py` (lines 56-58)
```python
static_path = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(static_path, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_path), name="static")
```
**Issue**: Creates directory at runtime, won't work on serverless

**Fix**: Use external storage (S3, Cloudinary) or CDN for static files

### 9. **Service Account Key File**
**File**: `backend/serviceAccountKey.json` exists in repo
**Status**: Already in `.gitignore`, but file exists - should be removed from repo if committed

### 10. **Python Dependencies**
**Issue**: Using `uv` for dependency management, but Vercel needs standard `requirements.txt`
**Fix**: Generate `requirements.txt` from `pyproject.toml` or use Vercel's Python runtime detection

### 11. **Environment Variable Documentation**
**Missing**: No clear documentation of required environment variables for production

---

## 📋 REQUIRED ENVIRONMENT VARIABLES

### Frontend (Vercel)
```
VUE_APP_API_URL=https://your-backend-url.com
VUE_APP_FIREBASE_API_KEY=...
VUE_APP_FIREBASE_AUTH_DOMAIN=...
VUE_APP_FIREBASE_PROJECT_ID=...
VUE_APP_FIREBASE_STORAGE_BUCKET=...
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=...
VUE_APP_FIREBASE_APP_ID=...
VUE_APP_FIREBASE_MEASUREMENT_ID=...
```

### Backend (Separate deployment)
```
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=<base64-encoded-service-account-json>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_FROM_EMAIL=...
SMTP_FROM_NAME=...
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
APP_BASE_URL=https://your-frontend.vercel.app
```

---

## ✅ RECOMMENDED DEPLOYMENT STRATEGY

1. **Frontend**: Deploy to Vercel (Vue.js app)
2. **Backend**: Deploy to Railway/Render/Fly.io (Python FastAPI with Socket.IO)
3. **Update CORS**: Set `CORS_ALLOWED_ORIGINS` to include Vercel URL
4. **Update API URL**: Set `VUE_APP_API_URL` in Vercel to point to backend URL

---

## 🔧 FILES TO FIX

Priority order:
1. Remove hardcoded localhost URLs
2. Standardize environment variables
3. Fix email template URLs
4. Create vercel.json
5. Add requirements.txt for Python (if deploying backend to Vercel)
6. Document all environment variables

