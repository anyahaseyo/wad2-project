# Achievement Claim Debugging Guide

## Issue
Achievements don't work when users claim them on the deployment page.

## Potential Causes

### 1. API URL Not Set Correctly
**Check**: Is `VUE_APP_API_URL` set correctly in Vercel?
- Should point to your Render backend URL
- Format: `https://your-backend.onrender.com`
- No trailing slash

**Verify**:
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Check `VUE_APP_API_URL` is set correctly
3. Redeploy if changed

### 2. CORS Issues
**Check**: Is frontend URL in backend CORS settings?
- Render backend → Environment Variables
- `CORS_ALLOWED_ORIGINS` should include your Vercel URL
- Format: `https://your-app.vercel.app,http://localhost:5173`

### 3. Notification Function Failing
**Issue**: The claim endpoint calls `send_achievement_notification()` which might fail if:
- Email service not configured
- SMTP credentials missing/invalid
- Firebase Auth access issues

**Fix Applied**: Wrapped notification in try-except so it doesn't break the claim.

### 4. Error Not Being Caught Properly
**Check Browser Console**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try claiming an achievement
4. Look for error messages

### 5. Network Request Failing
**Check Network Tab**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try claiming an achievement
4. Look for the POST request to `/api/achievements/{id}/claim`
5. Check:
   - Status code (should be 200)
   - Response body
   - Request headers (Authorization token present?)

## Debugging Steps

### Step 1: Check Browser Console
Open browser console and look for:
- `Error claiming achievement:` - Shows the actual error
- Network errors
- CORS errors
- Authentication errors

### Step 2: Check Network Request
1. Open Network tab in DevTools
2. Filter by "XHR" or "Fetch"
3. Try claiming an achievement
4. Find the POST request to `/api/achievements/.../claim`
5. Check:
   - Request URL (should be correct backend URL)
   - Status code
   - Response (if any)

### Step 3: Check Backend Logs
1. Go to Render → Your Service → Logs
2. Try claiming an achievement
3. Look for:
   - Error messages
   - Warning messages
   - Any exceptions

### Step 4: Test API Directly
Use curl or Postman to test:
```bash
curl -X POST https://your-backend.onrender.com/api/achievements/early_bird/claim \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json"
```

## Common Error Messages

### "Failed to claim achievement"
- Generic error - check console for details
- Usually means API call failed

### "Achievement not earned yet"
- User hasn't met the criteria
- Check achievement progress

### "Achievement already claimed"
- User already claimed this achievement
- This is expected behavior

### CORS Error
- Frontend URL not in backend CORS settings
- Add Vercel URL to `CORS_ALLOWED_ORIGINS`

### 401 Unauthorized
- Auth token missing/invalid
- User might be logged out
- Check Firebase auth state

### Network Error
- Backend not accessible
- Check backend URL is correct
- Check backend is running

## Fix Applied

I've updated the code to:
1. ✅ Wrap notification sending in try-except (won't break claim if notification fails)
2. ✅ Improved error logging in frontend
3. ✅ Better error message extraction

## Next Steps

1. **Check browser console** for specific error
2. **Check network tab** for failed requests
3. **Check Render logs** for backend errors
4. **Verify environment variables** are set correctly
5. **Test with browser DevTools open** to see exact error

## Quick Test

1. Open browser console (F12)
2. Try claiming an achievement
3. Check console for error message
4. Share the error message for further debugging

The most likely issue is:
- API URL not set correctly in Vercel
- CORS not configured properly
- Network/connectivity issue

Check these first!

