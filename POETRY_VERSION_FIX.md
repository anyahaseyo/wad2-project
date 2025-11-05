# Poetry 2.0+ Command Fix

## 🔴 Current Error
```
The option "--no-dev" does not exist
```

## ✅ Solution

Poetry 2.0+ removed the `--no-dev` flag. Use the new syntax instead.

### Fix Build Command

**In Render Dashboard:**
1. Go to your service → Settings
2. Update **Build Command** from:
   ```bash
   pip install poetry && poetry install --no-dev  ❌ WRONG
   ```
   
   To:
   ```bash
   pip install poetry && poetry install --without dev  ✅ CORRECT
   ```

3. Click **Save Changes**
4. Redeploy

---

## Poetry 2.0+ Command Options

### Option 1: Exclude Dev Dependencies (Recommended)
```bash
poetry install --without dev
```
Installs all dependencies except those in the `dev` dependency group.

### Option 2: Install Only Main Dependencies
```bash
poetry install --only main
```
Only installs dependencies from the `main` group (if you have groups defined).

### Option 3: Install All Dependencies
```bash
poetry install
```
Installs all dependencies including dev (not recommended for production, but works).

---

## Why This Happened

- **Poetry 1.x**: Used `--no-dev` flag
- **Poetry 2.0+**: Removed `--no-dev`, uses `--without dev` instead
- Render installed Poetry 2.2.1, which doesn't support the old flag

---

## Updated Build Commands

### If Root Directory is set to `backend`:
```bash
pip install poetry && poetry install --without dev
```

### If Root Directory is NOT set:
```bash
cd backend && pip install poetry && poetry install --without dev
```

---

## Quick Reference

| Old Command (Poetry 1.x) | New Command (Poetry 2.0+) |
|--------------------------|---------------------------|
| `poetry install --no-dev` | `poetry install --without dev` |
| `poetry install` | `poetry install` (still works) |

---

After updating the build command, your deployment should succeed! ✅

