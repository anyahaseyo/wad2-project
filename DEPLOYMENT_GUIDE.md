# Vercel Deployment Guide

## ⚠️ CRITICAL: Backend Deployment Strategy

**Your backend uses Socket.IO for real-time features, which WILL NOT work on Vercel serverless functions.**

### Recommended Approach:
1. **Deploy Frontend to Vercel** (this guide)
2. **Deploy Backend to Render** (see RENDER_DEPLOYMENT_GUIDE.md for detailed steps)

### Why?
- Vercel serverless functions don't support persistent WebSocket connections
- Your pet update loop requires long-running processes
- Socket.IO needs persistent connections

---

## Frontend Deployment to Vercel

### Step 1: Prepare Repository
✅ All critical fixes have been applied:
- Hardcoded localhost URLs removed
- Environment variables standardized
- Email template URLs made dynamic
- vercel.json configuration created

### Step 2: Set Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
VUE_APP_API_URL=https://your-backend-url.com
VUE_APP_FIREBASE_API_KEY=your-firebase-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=your-project-id
VUE_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
VUE_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
VUE_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: Replace `your-backend-url.com` with your actual Render backend URL (e.g., `https://your-backend.onrender.com`)

**Note**: You'll get the backend URL after deploying to Render. See `RENDER_DEPLOYMENT_GUIDE.md` for backend deployment steps.

### Step 3: Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set root directory: **Leave empty** (Vercel will use root)
3. Build command: Already configured in `vercel.json`
4. Output directory: `frontend/dist` (already configured)
5. Install command: `cd frontend && npm install` (already configured)

### Step 4: Update Backend CORS

After getting your Vercel URL, update your backend's `CORS_ALLOWED_ORIGINS`:

```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
```

---

## Backend Deployment to Render

**See `RENDER_DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.**

Quick summary:
1. Sign up at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Settings:
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
5. Add environment variables (see RENDER_DEPLOYMENT_GUIDE.md)
6. Render provides URL like `https://your-backend.onrender.com`
7. Update `VUE_APP_API_URL` in Vercel to this URL

---

## Environment Variables Summary

### Frontend (Vercel)
| Variable | Description | Example |
|----------|-------------|---------|
| `VUE_APP_API_URL` | Backend API URL | `https://your-app.railway.app` |
| `VUE_APP_FIREBASE_API_KEY` | Firebase API key | From Firebase Console |
| `VUE_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `VUE_APP_FIREBASE_PROJECT_ID` | Firebase project ID | From Firebase Console |
| `VUE_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage | `project.appspot.com` |
| `VUE_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | From Firebase Console |
| `VUE_APP_FIREBASE_APP_ID` | Firebase app ID | From Firebase Console |
| `VUE_APP_FIREBASE_MEASUREMENT_ID` | Firebase analytics | From Firebase Console |

### Backend (Render)
| Variable | Description | Example |
|----------|-------------|---------|
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://app.vercel.app,http://localhost:5173` |
| `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` | Base64 encoded service account | See below |
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | Your email |
| `SMTP_PASSWORD` | SMTP app password | Gmail app password |
| `SMTP_FROM_EMAIL` | From email | Your email |
| `SMTP_FROM_NAME` | From name | `WAD2 Project` |
| `GOOGLE_OAUTH_CLIENT_ID` | Google OAuth client ID | From Google Cloud Console |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth secret | From Google Cloud Console |
| `APP_BASE_URL` | Frontend URL | `https://your-app.vercel.app` |

---

## Encoding Firebase Service Account Key

To get `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`:

1. Download your service account JSON from Firebase Console
2. Encode it to base64:
   ```bash
   # On Mac/Linux:
   cat serviceAccountKey.json | base64
   
   # On Windows (PowerShell):
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
   ```
3. Copy the entire output and set it as `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`

---

## Testing Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Check health endpoint: `https://your-backend-url.com/`
3. **CORS**: Try logging in from frontend
4. **Socket.IO**: Test pet real-time features (if backend is deployed correctly)

---

## Troubleshooting

### Frontend Issues
- **API calls failing**: Check `VUE_APP_API_URL` is set correctly
- **Build fails**: Check Node version (should be 18+)
- **Environment variables not working**: Ensure they start with `VUE_APP_`

### Backend Issues
- **Socket.IO not working**: Verify backend is NOT on Vercel (use Railway/Render)
- **CORS errors**: Add frontend URL to `CORS_ALLOWED_ORIGINS`
- **Firebase errors**: Check `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` is correctly encoded

---

## Deployment Order

**Recommended deployment order:**

1. ✅ Code fixes applied
2. ⏭️ **Deploy backend to Render first** (see `RENDER_DEPLOYMENT_GUIDE.md`)
3. ⏭️ Get Render backend URL (e.g., `https://your-backend.onrender.com`)
4. ⏭️ **Deploy frontend to Vercel** with backend URL in environment variables
5. ⏭️ Get Vercel frontend URL
6. ⏭️ Update `CORS_ALLOWED_ORIGINS` in Render with Vercel URL
7. ⏭️ Update `APP_BASE_URL` in Render with Vercel URL
8. ⏭️ Test all features

**Why this order?**
- Backend needs to know frontend URL for CORS
- Frontend needs backend URL to make API calls
- Deploy backend first, then frontend, then update CORS

