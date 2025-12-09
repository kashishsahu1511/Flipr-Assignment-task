# 🚀 Deployment Guide - Real Trust Application

This guide covers deploying the full-stack Real Trust application to multiple cloud platforms.

## 📋 Prerequisites

- GitHub account with the repository pushed
- MongoDB Atlas account (free tier available)
- Cloud platform account (Heroku, Vercel, Railway, or similar)
- Node.js v20+ installed locally

---

## 🗄️ Database Setup: MongoDB Atlas (Free Tier)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project

### Step 2: Create a Cluster
1. Click "Create" to deploy a cluster
2. Select **Free tier (M0)**
3. Choose region closest to your users
4. Click "Create Cluster"

### Step 3: Add Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set privilege to "Read and write to any database"

### Step 4: Get Connection String
1. Go to "Clusters" → Click "Connect"
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

---

## 🔧 Backend Deployment: Heroku

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed
- GitHub repository with code pushed

### Step 1: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
cd practicesession
heroku create real-trust-api
```

### Step 4: Set Environment Variables
```bash
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_secure_secret_key_here"
heroku config:set NODE_ENV=production
```

### Step 5: Deploy
```bash
git push heroku main
```

### Step 6: View Logs
```bash
heroku logs --tail
```

### Access Backend
Your backend will be available at:
```
https://real-trust-api.herokuapp.com
```

---

## 🎨 Frontend Deployment: Vercel

### Option 1: Using Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

Follow the prompts:
- Link to GitHub repo
- Select project folder
- Accept default settings
- Enter VITE_API_URL when prompted

#### Step 3: Update Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL=https://real-trust-api.herokuapp.com/api`

### Option 2: GitHub Integration (Automatic Deployment)

#### Step 1: Connect GitHub
1. Go to [Vercel](https://vercel.com)
2. Sign up / Log in
3. Click "Import Project"
4. Select your GitHub repository

#### Step 2: Configure
1. Select root directory: `frontend`
2. Framework: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`

#### Step 3: Environment Variables
1. Add `VITE_API_URL=https://real-trust-api.herokuapp.com/api`
2. Click Deploy

### Step 4: Update Frontend API URL

Create `.env.production` in frontend directory:
```
VITE_API_URL=https://real-trust-api.herokuapp.com/api
```

Update your frontend API calls:
```javascript
// In frontend components (axios configuration)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

axios.defaults.baseURL = API_URL;
```

---

## ☁️ Alternative Deployment Options

### 1. AWS (Elastic Beanstalk)
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create real-trust-env

# Deploy
eb deploy
```

### 2. Railway.app (Simple & Free)
1. Go to [Railway](https://railway.app)
2. Connect GitHub
3. Select repository
4. Add MongoDB service
5. Configure environment variables
6. Deploy

### 3. Azure App Service
```bash
# Install Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

az login
az group create --name rg-real-trust --location eastus
az appservice plan create --name real-trust-plan --resource-group rg-real-trust --sku F1
az webapp create --resource-group rg-real-trust --plan real-trust-plan --name real-trust-api
```

### 4. Google Cloud Run
```bash
gcloud auth login
gcloud run deploy real-trust-api --source .
```

---

## 📝 Environment Variables Checklist

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-min-32-characters
NODE_ENV=production
PORT=5000
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Post-Deployment Testing

### Test Backend API
```bash
curl https://real-trust-api.herokuapp.com/api/projects
```

### Test Frontend
Visit: `https://your-frontend-url.vercel.app`

### Common Issues & Solutions

**Issue: CORS Error**
- Add frontend URL to backend CORS configuration
- Update `server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5175'
  ]
}));
```

**Issue: MongoDB Connection Failed**
- Verify connection string is correct
- Add IP whitelist in MongoDB Atlas (allow 0.0.0.0 for cloud deployment)
- Check database credentials

**Issue: Images Not Loading**
- Upload images to cloud storage (AWS S3, Cloudinary)
- Update image URLs in database
- Use signed URLs for private images

---

## 🔐 Security Best Practices

1. **Never commit .env files** - Use `.env.example` instead
2. **Use strong JWT secrets** - Min 32 characters
3. **Enable HTTPS** - Both platforms use HTTPS by default
4. **IP Whitelist MongoDB** - Allow only your server IPs
5. **Use CORS properly** - Restrict to your frontend domain
6. **Keep dependencies updated** - Run `npm audit` regularly
7. **Use secrets management** - Don't expose credentials in code

---

## 📊 Monitoring & Logging

### Heroku Logs
```bash
heroku logs --tail
```

### Vercel Analytics
- Dashboard shows performance metrics
- Build logs available in Deployments tab

### MongoDB Atlas Monitoring
- Cluster health dashboard
- Query performance analytics
- Security alerts

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "real-trust-api"
        heroku_email: "your-email@example.com"
```

---

## 📱 Final URLs

After deployment, your application will be available at:

- **Backend API**: `https://real-trust-api.herokuapp.com/api`
- **Frontend App**: `https://real-trust.vercel.app`
- **Admin Panel**: `https://real-trust.vercel.app/admin`
- **Database**: MongoDB Atlas cluster

---

## 🆘 Need Help?

- **Heroku Docs**: https://devcenter.heroku.com
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **GitHub Issues**: Check your repository issues

---

## 📝 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created and credentials saved
- [ ] Connection string obtained
- [ ] Backend environment variables set
- [ ] Frontend environment variables set
- [ ] CORS configured properly
- [ ] Backend deployed to Heroku
- [ ] Frontend deployed to Vercel
- [ ] API URL updated in frontend
- [ ] Testing completed
- [ ] Domain/SSL verified
- [ ] Monitoring setup

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Ready for Deployment ✅
