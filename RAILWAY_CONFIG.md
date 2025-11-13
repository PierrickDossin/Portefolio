# Railway Backend Configuration

## Your Railway Backend URL
```
https://portefolio-production-72f9.up.railway.app
```

## API Endpoint
```
https://portefolio-production-72f9.up.railway.app/api
```

---

## ✅ Next Step: Configure Vercel

### 1. Add Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your **Portefolio** project
3. Click **Settings** tab
4. Click **Environment Variables** in left sidebar
5. Add new variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://portefolio-production-72f9.up.railway.app/api`
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

### 2. Redeploy Frontend

1. Go to **Deployments** tab
2. Click **•••** (3 dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### 3. Test Your Portfolio

Visit: https://pierricksportfolio.vercel.app

**Check:**
- Open browser DevTools (F12) → Console tab
- Look for API calls to Railway URL
- Verify no CORS errors
- Projects should load from Railway backend

---

## 🔍 Test Backend Directly

You can test if your Railway backend is running:

**Test projects endpoint:**
```
https://portefolio-production-72f9.up.railway.app/api/projects
```

**Test skills endpoint:**
```
https://portefolio-production-72f9.up.railway.app/api/skills
```

Open these URLs in your browser. You should see JSON responses.

---

## ⚠️ Important: Populate Database

Your Railway backend uses PostgreSQL, which starts empty. You need to add your projects and skills.

### Option 1: Use the REST API (Recommended)

Use Postman, Insomnia, or curl to POST your data:

**Example - Add a project:**
```bash
POST https://portefolio-production-72f9.up.railway.app/api/projects
Content-Type: application/json

{
  "title": "Ciget - Medical Platform",
  "description": "Healthcare platform connecting patients with doctors",
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

### Option 2: Use Railway Database Query

1. In Railway, click on your PostgreSQL database
2. Click **Data** or **Query** tab
3. Run SQL from `backend/src/main/resources/init-database.sql`

---

## 📊 Current Status

- ✅ Backend deployed to Railway
- ✅ PostgreSQL database connected
- ✅ Public URL generated
- ⏳ Need to add environment variable in Vercel
- ⏳ Need to populate database with projects/skills
- ⏳ Need to redeploy frontend

---

## 🎯 After Configuration

Once Vercel is configured and database is populated, your portfolio will be fully live:

- Frontend: https://pierricksportfolio.vercel.app
- Backend: https://portefolio-production-72f9.up.railway.app
- Database: PostgreSQL on Railway

All 9 projects with code viewers will work in production! 🚀
