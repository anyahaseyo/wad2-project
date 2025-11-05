# Poetry No-Root Fix

## 🔴 Current Error
```
Error: The current project could not be installed: No file/folder found for package backend
```

## Root Cause

Poetry is trying to install your project as a Python package, but:
- Your project is a **FastAPI application** (not a library)
- It doesn't need to be installed as a package
- Poetry can't find the package structure because it's not configured as one

## ✅ Solution

Add the `--no-root` flag to tell Poetry to install dependencies only, not the project itself.

### Fix Build Command

**In Render Dashboard:**
1. Go to your service → Settings
2. Update **Build Command** from:
   ```bash
   pip install poetry && poetry install --without dev  ❌
   ```
   
   To:
   ```bash
   pip install poetry && poetry install --without dev --no-root  ✅
   ```

3. Click **Save Changes**
4. Redeploy

---

## What `--no-root` Does

- **Without `--no-root`**: Poetry tries to install your project as a package (for libraries)
- **With `--no-root`**: Poetry only installs dependencies, not the project itself
- **Perfect for apps**: FastAPI apps don't need to be installed as packages

---

## Alternative Solutions

If you prefer not to use `--no-root`, you can configure `pyproject.toml`:

### Option 1: Disable Package Mode
Add to `pyproject.toml`:
```toml
[tool.poetry]
package-mode = false
```

### Option 2: Configure Packages
Add to `pyproject.toml`:
```toml
[tool.poetry]
packages = [{include = "app"}]
```

**But `--no-root` is simpler and cleaner for applications!**

---

## Updated Build Commands

### If Root Directory is set to `backend`:
```bash
pip install poetry && poetry install --without dev --no-root
```

### If Root Directory is NOT set:
```bash
cd backend && pip install poetry && poetry install --without dev --no-root
```

---

## Why This Works

- Your FastAPI app doesn't need to be installed as a package
- You just need dependencies installed
- `--no-root` skips package installation
- Your app code runs directly (not as an installed package)

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `poetry install --without dev` | Install dependencies (tries to install project too) |
| `poetry install --without dev --no-root` | Install dependencies only (skip project) ✅ |

After updating the build command, your deployment should succeed! 🎉

