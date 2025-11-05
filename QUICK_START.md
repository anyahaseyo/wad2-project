# Quick Deployment Start Guide

## 🚀 Fast Track to Deploy

### Step 1: Deploy Backend to Render (5-10 minutes)

1. Go to [render.com](https://render.com) → Sign up
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select your repo
4. Configure:
   - **Name**: `wad2-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install poetry && poetry install --no-dev` (recommended) OR `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`
5. Add environment variables (see below)
6. Click **"Create Web Service"**
7. Wait for deployment → Copy your URL: `https://your-backend.onrender.com`

**Required Environment Variables for Render:**
```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=<your-base64-encoded-json>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=WAD2 Project
GOOGLE_OAUTH_CLIENT_ID=your-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
APP_BASE_URL=https://your-app.vercel.app
```

**Note**: You can set `CORS_ALLOWED_ORIGINS` and `APP_BASE_URL` after deploying frontend.

---

### Step 2: Deploy Frontend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Click **"New Project"**
3. Import GitHub repository → Select your repo
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: Leave empty (or set to `frontend` if needed)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
5. Add environment variables (see below)
6. Click **"Deploy"**
7. Wait for deployment → Copy your URL: `https://your-app.vercel.app`

**Required Environment Variables for Vercel:**
```
VUE_APP_API_URL=https://your-backend.onrender.com
VUE_APP_FIREBASE_API_KEY=your-firebase-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=your-project-id
VUE_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
VUE_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
VUE_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: Use your Render backend URL for `VUE_APP_API_URL`

---

### Step 3: Link Frontend and Backend (2 minutes)

After both are deployed:

1. Go to Render → Your Service → Environment
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   https://your-actual-vercel-url.vercel.app,http://localhost:5173
   ```
3. Update `APP_BASE_URL`:
   ```
   https://your-actual-vercel-url.vercel.app
   ```
4. Render will auto-redeploy

---

### Step 4: Test

1. Visit your Vercel URL
2. Try logging in
3. Test pet features (Socket.IO should work)
4. Check browser console for errors

---

## 🔑 Getting Required Values

### Firebase Service Account Key (Base64)

1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. Encode to base64:
   ```bash
   # Mac/Linux:
   cat serviceAccountKey.json | base64
   
   # Windows PowerShell:
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
   ```
5. Copy entire output → Use as `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`

### Gmail App Password

1. Google Account → Security → 2-Step Verification (enable if not)
2. App passwords → Generate → Select "Mail"
3. Copy 16-character password → Use as `SMTP_PASSWORD`

### Google OAuth Credentials

1. [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (if needed)
4. Copy Client ID and Secret

---

## 📚 Detailed Guides

- **Backend Deployment**: See `RENDER_DEPLOYMENT_GUIDE.md`
- **Frontend Deployment**: See `DEPLOYMENT_GUIDE.md`
- **All Issues & Fixes**: See `VERCEL_DEPLOYMENT_ISSUES.md`

---

## ⚠️ Common Issues

### Backend spins down (Render free tier)
- First request takes 30-50 seconds after inactivity
- Normal behavior on free tier
- Upgrade to paid ($7/month) for always-on

### CORS errors
- Verify `CORS_ALLOWED_ORIGINS` includes exact Vercel URL
- No trailing slashes
- Include both production and localhost URLs

### Socket.IO not connecting
- Check backend is running (not spun down)
- Verify frontend uses correct backend URL
- Check Render logs for errors

---

## ✅ Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL obtained
- [ ] Frontend deployed to Vercel
- [ ] `VUE_APP_API_URL` set to Render URL
- [ ] `CORS_ALLOWED_ORIGINS` updated in Render
- [ ] `APP_BASE_URL` updated in Render
- [ ] Tested login
- [ ] Tested Socket.IO features
- [ ] No console errors

---

**Need help?** Check the detailed guides or Render/Vercel documentation.

