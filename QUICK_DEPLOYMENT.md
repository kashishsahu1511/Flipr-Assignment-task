# 🚀 Quick Deployment Steps

## Prerequisites
- MongoDB Atlas account (free tier)
- Heroku account (free tier)
- Vercel account (free tier)
- GitHub repository with code pushed

---

## Step 1: Setup MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Cluster
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create new project → "Real Trust App"
4. Create cluster → Select M0 (Free tier)
5. Wait for cluster to be ready (5-10 minutes)
```

### 1.2 Create Database User
```
1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Username: admin (or any username)
4. Password: Generate secure password
5. Select "Read and write to any database"
6. Click "Add User"
7. Save credentials safely!
```

### 1.3 Get Connection String
```
1. Click "Clusters" → "Connect" button
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Example: mongodb+srv://admin:PASSWORD@cluster.mongodb.net/realtrustdb?retryWrites=true&w=majority
5. Replace PASSWORD with your actual password
```

### 1.4 Add IP Whitelist
```
1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. For cloud deployment, select "Allow access from anywhere" (0.0.0.0)
4. Click "Confirm"
```

---

## Step 2: Deploy Backend to Heroku

### 2.1 Install Heroku CLI
```bash
# Windows (using Chocolatey)
choco install heroku-cli

# Or download: https://devcenter.heroku.com/articles/heroku-cli
```

### 2.2 Login & Create Heroku App
```bash
heroku login
cd practicesession
heroku create real-trust-api
```

### 2.3 Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://admin:PASSWORD@cluster.mongodb.net/realtrustdb"
heroku config:set JWT_SECRET="your-super-secure-secret-key-here"
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL="https://your-vercel-url.vercel.app"
```

### 2.4 Deploy Code
```bash
git push heroku main
```

### 2.5 Check Status
```bash
heroku logs --tail
```

**Your backend is now live at:** `https://real-trust-api.herokuapp.com`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Via GitHub (Easiest)
```
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Choose project type: "Other"
5. Root directory: frontend
6. Build command: npm run build
7. Output directory: dist
8. Click Deploy
```

### 3.2 Configure Environment Variables
```
1. In Vercel dashboard, go to Project Settings
2. Go to "Environment Variables"
3. Add new variable:
   - Name: VITE_API_URL
   - Value: https://real-trust-api.herokuapp.com/api
   - Environments: Production
4. Click Save
5. Redeploy project
```

### 3.3 Via Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel
# Follow prompts, link to GitHub repo
# Add environment variable when prompted
```

**Your frontend is now live at:** `https://your-project-name.vercel.app`

---

## Step 4: Update Frontend API Configuration

### 4.1 Create .env.production in frontend folder
```
VITE_API_URL=https://real-trust-api.herokuapp.com/api
```

### 4.2 Update API calls in components
In your components where you make API calls, use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

---

## Step 5: Test Deployment

### Test Backend
```bash
curl https://real-trust-api.herokuapp.com/api/projects
# Should return JSON with projects
```

### Test Frontend
- Visit: `https://your-vercel-url.vercel.app`
- Check that images and data load
- Test contact form submission
- Test newsletter signup

### Test Admin Panel
- Visit: `https://your-vercel-url.vercel.app/admin`
- Login with: admin@example.com / admin123
- Should connect to deployed backend

---

## Common Issues & Fixes

### Issue: "Cannot GET /"
**Solution:** Backend not deployed. Check `heroku logs --tail`

### Issue: CORS Error on Frontend
**Solution:** Add frontend URL to CORS in backend server.js (already done)

### Issue: Images Not Loading
**Solution:** Images stored locally. Deploy images to cloud storage:
- AWS S3
- Cloudinary
- Or use image URLs from the API

### Issue: MongoDB Connection Error
**Solution:**
1. Check connection string is correct
2. Verify password has no special characters (or URL encode them)
3. Add IP to whitelist in MongoDB Atlas
4. Check MONGODB_URI env var is set: `heroku config`

### Issue: Frontend Can't Connect to Backend
**Solution:**
1. Check VITE_API_URL is set correctly
2. Check backend is running: `heroku logs --tail`
3. Check CORS is enabled
4. Try API directly: `https://real-trust-api.herokuapp.com/api/projects`

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained and IP whitelisted
- [ ] Heroku app created
- [ ] Environment variables set on Heroku
- [ ] Backend code pushed to Heroku
- [ ] Backend logs show "Server running"
- [ ] Backend API responds to requests
- [ ] Vercel project created from GitHub
- [ ] Frontend environment variables set
- [ ] Frontend deployed successfully
- [ ] Frontend loads and connects to backend
- [ ] Admin panel works with deployed backend
- [ ] Contact form sends data to backend
- [ ] Images load properly

---

## Final URLs After Deployment

| Component | URL |
|-----------|-----|
| **Backend API** | https://real-trust-api.herokuapp.com/api |
| **Frontend App** | https://your-project.vercel.app |
| **Admin Panel** | https://your-project.vercel.app/admin |
| **Database** | MongoDB Atlas Dashboard |

---

## Update GitHub with Deployment Info

After successful deployment, update your GitHub README with deployment URLs:

```markdown
## 🌐 Live Demo

- **Frontend:** https://your-project.vercel.app
- **Backend API:** https://real-trust-api.herokuapp.com/api
- **Admin Panel:** https://your-project.vercel.app/admin

### Test Credentials
- Email: admin@example.com
- Password: admin123
```

---

## Next Steps

1. Monitor application performance
2. Set up error tracking (Sentry)
3. Enable analytics
4. Configure custom domain
5. Set up automated backups
6. Monitor MongoDB usage
7. Optimize images and assets

---

## Support

- **Heroku Docs:** https://devcenter.heroku.com
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com
- **GitHub:** Your repository issues

---

**✅ Deployment Complete!**
Your Real Trust application is now live on the internet! 🎉
