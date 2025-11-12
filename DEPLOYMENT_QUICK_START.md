# Quick Deployment Steps

Your portfolio is ready for deployment! Follow these steps:

## ✅ Already Complete

- [x] Frontend deployed to Vercel: https://pierricksportfolio.vercel.app
- [x] Dockerfile created for backend
- [x] CORS configured for Vercel domains
- [x] PostgreSQL dependency added to pom.xml
- [x] Production Spring Boot configuration ready
- [x] All code committed and pushed to GitHub

## 🚀 Next: Deploy Backend to Railway

### Step 1: Create Railway Account (2 minutes)

1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Deploy Backend (5 minutes)

1. Click "New Project" → "Deploy from GitHub repo"
2. Select `PierrickDossin/Portefolio`
3. Click on the service → Settings → Root Directory: **`/backend`**
4. Railway will automatically detect Dockerfile and deploy

### Step 3: Add PostgreSQL Database (1 minute)

1. In your project, click "New" → "Database" → "PostgreSQL"
2. Railway provisions database and connects it automatically

### Step 4: Set Environment Variable (1 minute)

1. Click backend service → "Variables" tab
2. Add: `SPRING_PROFILES_ACTIVE` = `production`
3. Redeploy will happen automatically

### Step 5: Generate Domain (1 minute)

1. Backend service → Settings → Networking
2. Click "Generate Domain"
3. **Copy the URL** (e.g., `https://portfolio-backend-production-xxxx.up.railway.app`)

### Step 6: Update Vercel Environment (2 minutes)

1. Go to https://vercel.com/dashboard
2. Select `Portefolio` project
3. Settings → Environment Variables
4. Add:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-url.up.railway.app/api` (paste your Railway URL + /api)
   - **Environment**: All (Production, Preview, Development)
5. Go to Deployments → Click latest → Redeploy

### Step 7: Populate Database

Use the API to add your projects and skills (Postman or any HTTP client):

**Example: Add a project**
```bash
POST https://your-railway-url.up.railway.app/api/projects
Content-Type: application/json

{
  "title": "Ciget - Medical Platform",
  "description": "Healthcare platform...",
  "category": "WEB_DEVELOPMENT",
  "tags": ["Healthcare", "Spring Boot", "React"],
  "githubUrl": "https://github.com/PierrickDossin/Ciget",
  "iconName": "Heart",
  "gradientFrom": "#FF6B6B",
  "gradientTo": "#FFE66D",
  "isFeatured": true,
  "displayOrder": 1
}
```

**Or** use the init-database.sql script for skills (Railway dashboard → Database → Query)

### Step 8: Verify

1. Visit https://pierricksportfolio.vercel.app
2. Check browser console (F12) - should see no errors
3. Projects and skills should load from Railway backend

## 📊 Total Time: ~15 minutes

## 💰 Cost

- **Vercel**: FREE (generous limits)
- **Railway**: $5 free trial credit/month, then ~$5-10/month

## 📚 Detailed Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for troubleshooting and advanced configuration.

## 🎯 What You'll Have

- ✅ Professional portfolio with 9 projects
- ✅ Working code viewer for 6 projects
- ✅ Fast frontend on Vercel CDN
- ✅ Scalable backend on Railway
- ✅ PostgreSQL database
- ✅ HTTPS everywhere
- ✅ Ready for job applications!

---

**Ready to deploy? Start with Step 1 above!** 🚀
