# Render Deployment Fix

## Problem
Render deployment fails with: `ERROR: Could not open requirements file: [Errno 2] No such file or directory: 'requirements.txt'`

## Root Cause
Render detected Poetry (because `pyproject.toml` exists) but the build command is trying to use `pip install -r requirements.txt`. The file might also not be committed to your branch.

## Solution Options

### Option 1: Use Poetry (Recommended - since you have pyproject.toml)

**CRITICAL: Make sure Root Directory is set to `backend` in Render Settings!**

**In Render Dashboard:**
1. Go to your service → Settings
2. **VERIFY Root Directory is set to: `backend`** (This is the most common issue!)
3. Update **Build Command** to:
   ```bash
   pip install poetry && poetry install --without dev --no-root
   ```
   OR if Root Directory can't be set, use:
   ```bash
   cd backend && pip install poetry && poetry install --without dev --no-root
   ```
   The `--no-root` flag tells Poetry not to install the project as a package (since it's an app, not a library)
4. Keep **Start Command** as:
   ```bash
   uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT
   ```

**Why this works:**
- Your project uses `pyproject.toml` which Poetry understands
- Poetry will install dependencies from `pyproject.toml`
- No need for `requirements.txt`

---

### Option 2: Use pip with requirements.txt (Simpler)

**Step 1: Ensure requirements.txt is committed**
```bash
# Make sure you're in the backend directory
cd backend
git add requirements.txt
git commit -m "Add requirements.txt for Render deployment"
git push
```

**Step 2: In Render Dashboard**
1. Go to your service → Settings
2. Make sure **Root Directory** is set to: `backend`
3. **Build Command** should be:
   ```bash
   pip install -r requirements.txt
   ```
4. **Start Command**:
   ```bash
   uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT
   ```

**Step 3: Redeploy**
- Click "Manual Deploy" → "Deploy latest commit"

---

### Option 3: Disable Poetry Auto-Detection

If Render keeps trying to use Poetry:

1. In Render Dashboard → Settings
2. Add environment variable:
   - Key: `POETRY_DISABLE`
   - Value: `1`
3. Set **Build Command** to:
   ```bash
   pip install -r requirements.txt
   ```
4. Redeploy

---

## Quick Fix (Choose One)

### Fastest: Use Poetry
**Build Command:**
```bash
pip install poetry && poetry install --no-dev
```

### Alternative: Use pip
**Build Command:**
```bash
pip install -r requirements.txt
```

Make sure `requirements.txt` is in the `backend/` directory and committed to your branch.

---

## Verify Your Setup

1. **Root Directory**: Should be `backend`
2. **Build Command**: Either Poetry or pip command above
3. **Start Command**: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`
4. **Python Version**: Should be 3.11+ (Render auto-detects from pyproject.toml)

---

## After Fixing

1. Click "Manual Deploy" in Render
2. Watch the logs - should see dependencies installing
3. Should see: "Your service is live at https://..."

