# Backend Deployment to Render

## Step-by-Step Guide

### Step 1: Prepare Your Backend

✅ All fixes are already applied. Your backend is ready to deploy.

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email if needed

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `wad2-project`

### Step 4: Configure Service Settings

**Basic Settings:**
- **Name**: `wad2-backend` (or your preferred name)
- **Region**: Choose closest to your users (Oregon, Singapore, etc.)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` ⚠️ **CRITICAL - Must be set to `backend`!**
- **Runtime**: `Python 3`
- **Build Command**: Choose one:
  - **Option A (Recommended)**: `pip install poetry && poetry install --without dev --no-root` (uses your pyproject.toml)
    - The `--no-root` flag tells Poetry not to install the project itself, only dependencies
    - **If Root Directory is NOT set**: Use `cd backend && pip install poetry && poetry install --without dev --no-root`
  - **Option B**: `pip install -r requirements.txt` (requires requirements.txt file)
- **Start Command**: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`

**Important Notes:**
- Render uses `$PORT` environment variable automatically (don't hardcode port)
- The start command uses `socket_app` (not `app`) because your Socket.IO setup creates `socket_app = socketio.ASGIApp(sio, app)`
- This ensures both REST API and WebSocket connections work correctly
- **Build Command**: Since your project has `pyproject.toml`, Render may auto-detect Poetry. Use Poetry build command (Option A) to avoid conflicts
- Render free tier may spin down after 15 minutes of inactivity (upgrade to paid to avoid this)

### Step 5: Set Environment Variables

Click **"Environment"** tab and add these variables:

#### Required Variables:

```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
```

**Important**: Replace `your-app.vercel.app` with your actual Vercel frontend URL. You can add this later after deploying frontend.

```
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=<base64-encoded-service-account-json>
```

**How to get this:**
1. Download your Firebase service account JSON from Firebase Console
2. Encode to base64:
   ```bash
   # Mac/Linux:
   cat serviceAccountKey.json | base64
   
   # Windows PowerShell:
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
   ```
3. Copy the entire output and paste as the value

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=WAD2 Project
```

**Gmail App Password:**
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App passwords
3. Generate app password for "Mail"
4. Use that password (not your regular Gmail password)

```
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
```

**Get from Google Cloud Console:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. APIs & Services → Credentials
4. Create OAuth 2.0 Client ID (if not exists)
5. Copy Client ID and Client Secret

```
APP_BASE_URL=https://your-app.vercel.app
```

**Set this after deploying frontend** - use your Vercel URL.

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Wait for deployment to complete (usually 5-10 minutes)
4. You'll get a URL like: `https://wad2-backend.onrender.com`

### Step 7: Update CORS After Frontend Deployment

After you deploy your frontend to Vercel and get the URL:

1. Go back to Render → Your Service → Environment
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app,http://localhost:5173
   ```
3. Update `APP_BASE_URL`:
   ```
   APP_BASE_URL=https://your-actual-vercel-url.vercel.app
   ```
4. Render will automatically redeploy with new environment variables

### Step 8: Test Your Backend

1. Visit: `https://your-backend.onrender.com/`
2. Should see: `{"message": "Hello World"}`
3. Test health endpoint: `https://your-backend.onrender.com/api/...` (requires auth)

---

## Render Free Tier Limitations

⚠️ **Important**: Render free tier has some limitations:

1. **Spin-down**: Services spin down after 15 minutes of inactivity
   - First request after spin-down takes ~30-50 seconds (cold start)
   - Subsequent requests are fast
   - **Solution**: Upgrade to paid plan ($7/month) for always-on service

2. **WebSocket Connections**: 
   - ✅ Free tier supports WebSockets
   - Socket.IO will work correctly
   - Connections persist while service is running

3. **Build Time**: 
   - Free tier: 500 minutes/month
   - Should be plenty for normal usage

---

## Troubleshooting

### Build Fails

**Error**: `ERROR: Could not open requirements file: [Errno 2] No such file or directory: 'requirements.txt'`
- **Fix**: 
  - **Option 1**: Use Poetry build command: `pip install poetry && poetry install --without dev` (recommended)
  - **Option 2**: Ensure `requirements.txt` is committed to your branch and Root Directory is set to `backend`
  - **Option 3**: Add environment variable `POETRY_DISABLE=1` to disable Poetry auto-detection

**Error**: `Poetry could not find a pyproject.toml file in /opt/render/project/src or its parents`
- **Fix**: 
  - **CRITICAL**: Set **Root Directory** to `backend` in Render Settings → General
  - **OR** Use build command: `cd backend && pip install poetry && poetry install --without dev --no-root`
  - This error means Poetry is running from the wrong directory (repo root instead of backend folder)

**Error**: `The option "--no-dev" does not exist`
- **Fix**: 
  - Poetry 2.0+ removed `--no-dev` flag
  - Use `poetry install --without dev --no-root` instead (installs only production dependencies)
  - The `--no-root` flag tells Poetry not to install the project itself (since it's an app, not a library)

**Error**: `Error: The current project could not be installed: No file/folder found for package backend`
- **Fix**: 
  - Add `--no-root` flag to build command: `poetry install --without dev --no-root`
  - This tells Poetry not to install your project as a package (it's an app, not a library)
  - **OR** add `package-mode = false` to `[tool.poetry]` section in `pyproject.toml`
  - **OR** use `pip install -r requirements.txt` instead

**Error**: `Module not found` or `pip install` fails
- **Fix**: Check `requirements.txt` exists and has all dependencies, or use Poetry build command
- Verify Python version (should be 3.11+ based on your `pyproject.toml`)

### Service Won't Start

**Error**: `uvicorn: command not found`
- **Fix**: Ensure `uvicorn` is in `requirements.txt` (already added ✅)

**Error**: `socket_app not found`
- **Fix**: Check start command uses `app.main:socket_app` (not `app.main:app`)

### CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`
- **Fix**: 
  1. Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
  2. Check for typos (no trailing slashes)
  3. Redeploy after updating environment variables

### Socket.IO Not Connecting

**Error**: WebSocket connection fails
- **Fix**: 
  1. Verify backend is running (not spun down)
  2. Check browser console for connection errors
  3. Ensure frontend is using correct backend URL
  4. Check Render logs for errors

### Firebase Errors

**Error**: `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set`
- **Fix**: 
  1. Verify environment variable is set in Render
  2. Check base64 encoding is correct (no line breaks)
  3. Ensure JSON is valid before encoding

---

## Monitoring

### View Logs
1. Go to Render dashboard → Your Service
2. Click **"Logs"** tab
3. Real-time logs show build and runtime output

### Health Checks
Render automatically checks if your service is responding. You can add a health endpoint:

```python
@app.get("/health")
def health():
    return {"status": "healthy"}
```

---

## Next Steps After Backend Deployment

1. ✅ Backend deployed to Render
2. ⏭️ Get backend URL (e.g., `https://wad2-backend.onrender.com`)
3. ⏭️ Deploy frontend to Vercel (see DEPLOYMENT_GUIDE.md)
4. ⏭️ Set `VUE_APP_API_URL` in Vercel to your Render backend URL
5. ⏭️ Update `CORS_ALLOWED_ORIGINS` in Render with Vercel URL
6. ⏭️ Test full application

---

## Quick Reference

**Render Service URL Format**: `https://<service-name>.onrender.com`

**Start Command**: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`

**Root Directory**: `backend`

**Build Command**: `pip install -r requirements.txt`

