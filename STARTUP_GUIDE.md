# 🚀 STARTUP SCRIPT - One-Time Setup

## Initial Setup (Run This Once)

### Step 1: Terminal 1 - Start Backend Server
```bash
cd backend
node server.js
```

Wait for these messages:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected Successfully
```

### Step 2: Terminal 2 - Create Admin User (FIRST TIME ONLY)
```bash
cd backend
node seedAdmin.js
```

You should see:
```
✅ MongoDB Connected
✅ Admin user created successfully
📧 Email: admin@example.com
🔐 Password: admin123
```

**Note**: Only run this once. Next time, skip this step.

### Step 3: Terminal 3 - Start Frontend
```bash
cd frontend
npm run dev
```

Wait for this message:
```
➜  Local:   http://localhost:5175/
```

---

## Daily Usage (After Setup)

### Each Time You Want to Use the App

**Terminal 1**:
```bash
cd backend
node server.js
```

**Terminal 2**:
```bash
cd frontend
npm run dev
```

(No need to run `seedAdmin.js` again)

---

## 🔐 Login Credentials

Once everything is running:

1. Open browser: `http://localhost:5175/admin/login`
2. Enter:
   - **Email**: `admin@example.com`
   - **Password**: `admin123`
3. Click **Login**
4. You're in the admin dashboard!

---

## 📋 What Each Terminal Does

| Terminal | Command | Purpose | Output |
|----------|---------|---------|--------|
| 1 | `node server.js` | Starts backend API | Port 5000 |
| 2 | `node seedAdmin.js` | Creates admin user | One time only |
| 3 | `npm run dev` | Starts frontend | Port 5175 |

---

## ⚡ Quick Reference

### Stop Servers
- **Each terminal**: Press `Ctrl + C`

### Restart Servers
- **Backend**: Press `Ctrl + C`, then run `node server.js` again
- **Frontend**: Press `Ctrl + C`, then run `npm run dev` again

### Clear Browser Cache
- Press: `Ctrl + Shift + Delete`
- Select: All time
- Click: Clear data

---

## 🆘 If Ports Are In Use

### Port 5000 (Backend) Already Used
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Start backend again
node server.js
```

### Port 5175 (Frontend) Already Used
```bash
# Find process using port 5175
netstat -ano | findstr :5175

# Kill the process
taskkill /PID <PID> /F

# Start frontend again
npm run dev
```

---

## ✅ Verification

After startup, verify:

- [ ] Backend console shows: "✅ MongoDB Connected Successfully"
- [ ] Frontend console shows: "Local: http://localhost:5175/"
- [ ] Can open: `http://localhost:5175/`
- [ ] Can open: `http://localhost:5175/admin/login`
- [ ] Can login with admin credentials
- [ ] Can see admin dashboard with 4 tabs

---

## 🎯 Typical Session

### Morning Start
```bash
# Terminal 1
cd backend
node server.js

# Wait for MongoDB connection message ✅

# Terminal 2 (new)
cd frontend
npm run dev

# Wait for "ready" message ✅

# Open browser
# Visit: http://localhost:5175/admin/login
# Login with admin credentials
```

### During Development
- Both servers keep running
- Make code changes
- Frontend auto-refreshes (hot reload)
- Backend needs manual refresh if you change backend code

### End of Day
- Press `Ctrl + C` in each terminal
- Or just close the terminal windows

---

## 📝 Notes

1. **First Time Setup**: Always run `node seedAdmin.js` once
2. **Subsequent Times**: Skip `node seedAdmin.js`, just start the servers
3. **Keep Both Running**: Both backend and frontend must be running
4. **Don't Close Terminals**: While you're using the app
5. **Hot Reload**: Frontend auto-refreshes, backend doesn't

---

## 🔄 If Admin Login Doesn't Work

1. Stop backend: `Ctrl + C`
2. Run: `node seedAdmin.js`
3. Start backend again: `node server.js`
4. Clear browser cache: `Ctrl + Shift + Delete`
5. Try login again

---

## 💾 Sample Data

After setup, you'll have:
- ✅ 1 admin user (admin@example.com)
- ✅ 5 sample clients (for demo)
- ✅ 0 projects (add via admin panel)
- ✅ 0 contacts (add via public form)
- ✅ 0 newsletter subscribers (add via navbar)

---

## 🚀 Everything Ready!

Once these 3 terminals are running, you're good to go:

1. ✅ Backend on localhost:5000
2. ✅ Frontend on localhost:5175
3. ✅ Ready to login and use admin panel!

---

**Time to first login**: ~2 minutes

**Total setup time (first time)**: ~5 minutes

**Daily startup time**: ~1 minute

---

**That's it! You're all set! 🎉**
