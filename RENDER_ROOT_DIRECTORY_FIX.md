# Render Root Directory Fix

## 🔴 Current Error
```
Poetry could not find a pyproject.toml file in /opt/render/project/src or its parents
```

## ✅ Solution

The issue is that **Root Directory is not set to `backend`** in your Render service settings.

### Step-by-Step Fix

1. **Go to Render Dashboard**
   - Click on your service
   - Click **"Settings"** tab

2. **Find "Root Directory" Setting**
   - Scroll down to **"Build & Deploy"** section
   - Look for **"Root Directory"** field

3. **Set Root Directory**
   - Enter: `backend`
   - **NOT** `/backend` or `./backend` - just `backend`

4. **Save Changes**
   - Click **"Save Changes"** at the bottom

5. **Redeploy**
   - Go to **"Events"** tab
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Alternative: Update Build Command

If you can't set Root Directory for some reason, update the build command to change directory first:

**Build Command:**
```bash
cd backend && pip install poetry && poetry install --no-dev
```

This explicitly changes to the backend directory before running Poetry.

---

## Verify Your Settings

Your Render service settings should look like this:

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `pip install poetry && poetry install --no-dev` |
| **Start Command** | `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT` |

---

## Why This Matters

- Render clones your entire repository to `/opt/render/project/src`
- If Root Directory is NOT set, it runs commands from the repo root
- Your `pyproject.toml` is in the `backend/` folder
- Poetry needs to run from the `backend/` directory to find `pyproject.toml`
- Setting Root Directory tells Render to `cd backend` before running commands

---

## After Fixing

Once Root Directory is set correctly:
1. Poetry will find `pyproject.toml` in the `backend/` directory
2. Dependencies will install correctly
3. Service should start successfully

Watch the logs to confirm:
- ✅ Should see Poetry installing dependencies
- ✅ Should see "Installing dependencies from lock file"
- ✅ Should see "Your service is live at https://..."

