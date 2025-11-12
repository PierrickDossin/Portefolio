# Deployment Guide

This guide explains how to deploy your portfolio to production with the frontend on Vercel and backend on Railway.

## Current Status

✅ Frontend deployed: https://pierricksportfolio.vercel.app
⏳ Backend needs deployment (currently using localhost)

## Architecture

- **Frontend**: Next.js on Vercel (serverless, optimized for Next.js)
- **Backend**: Spring Boot on Railway (supports Docker, Java, databases)
- **Database**: PostgreSQL on Railway
- **Connection**: CORS-enabled REST API

## Step 1: Deploy Backend to Railway

### 1.1 Sign Up for Railway

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub repositories

### 1.2 Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `PierrickDossin/Portefolio` repository
4. Railway will detect the repository

### 1.3 Configure Backend Service

1. Click "Add Service" → "GitHub Repo"
2. Select the `Portefolio` repository
3. In the service settings:
   - **Root Directory**: `/backend`
   - **Build Command**: (leave empty - Docker handles this)
   - **Start Command**: (leave empty - Docker handles this)

Railway will automatically detect the Dockerfile in the backend folder and use it.

### 1.4 Add PostgreSQL Database

1. In your Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will provision a PostgreSQL database
3. Note the connection details (automatically available as environment variables)

### 1.5 Configure Environment Variables

Railway automatically provides database connection variables. You need to update your Spring Boot configuration:

1. In the backend service, go to "Variables" tab
2. Add these variables:
   ```
   SPRING_PROFILES_ACTIVE=production
   ```

3. Create a new file `backend/src/main/resources/application-production.properties`:
   ```properties
   # Server Configuration
   server.port=${PORT:8080}
   spring.application.name=portfolio-backend
   
   # PostgreSQL Database Configuration (Production)
   spring.datasource.url=${DATABASE_URL}
   spring.datasource.driverClassName=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   
   # CORS Configuration (Production)
   spring.web.cors.allowed-origins=https://pierricksportfolio.vercel.app,https://*.vercel.app
   spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
   spring.web.cors.allowed-headers=*
   spring.web.cors.allow-credentials=true
   
   # Logging (Production)
   logging.level.com.portfolio=INFO
   ```

4. Commit and push this file:
   ```bash
   git add backend/src/main/resources/application-production.properties
   git commit -m "Add production Spring Boot configuration"
   git push
   ```

5. Railway will automatically redeploy with the new configuration

### 1.6 Get Backend URL

1. In your Railway backend service, go to "Settings" → "Networking"
2. Click "Generate Domain" to get a public URL
3. Your backend will be available at something like:
   ```
   https://portfolio-backend-production-xxxx.up.railway.app
   ```
4. **Copy this URL** - you'll need it for the next step

### 1.7 Initialize Database

Once deployed, you need to populate the database with your projects and skills:

Option A - **Access H2 Console Locally and Export**:
1. Run backend locally: `cd backend && mvn spring-boot:run`
2. Access H2 console: http://localhost:8080/h2-console
3. Export your data using SQL scripts

Option B - **Use Spring Boot Data Initialization**:
Create `backend/src/main/resources/data.sql` with INSERT statements for your projects, skills, and code repositories, then commit and push.

Option C - **Use the API**:
Use Postman or curl to POST your projects and skills through the Railway backend API.

## Step 2: Update Frontend Environment Variables

### 2.1 Configure Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your `Portefolio` project
3. Go to "Settings" → "Environment Variables"
4. Add a new variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app/api`
   - **Environment**: Production, Preview, Development

Example:
```
NEXT_PUBLIC_API_URL=https://portfolio-backend-production-xxxx.up.railway.app/api
```

### 2.2 Redeploy Frontend

1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

OR simply push any small change to trigger a new deployment.

## Step 3: Verify Deployment

1. Visit your frontend: https://pierricksportfolio.vercel.app
2. Open browser DevTools (F12) → Console tab
3. Check for:
   - ✅ No CORS errors
   - ✅ Projects loading correctly
   - ✅ Skills displaying
   - ✅ Code viewer working for projects with code

4. Test the API directly:
   ```
   https://your-railway-backend-url.up.railway.app/api/projects
   https://your-railway-backend-url.up.railway.app/api/skills
   ```

## Troubleshooting

### Frontend shows "Failed to fetch" errors

**Issue**: Frontend can't reach backend
**Solution**: 
1. Check NEXT_PUBLIC_API_URL is set correctly in Vercel
2. Verify Railway backend is running (check Railway dashboard)
3. Test backend URL directly in browser

### CORS errors in browser console

**Issue**: Backend not allowing frontend requests
**Solution**:
1. Check application-production.properties has correct CORS origins
2. Verify Vercel URL matches CORS configuration
3. Make sure Railway environment has SPRING_PROFILES_ACTIVE=production

### Database is empty

**Issue**: No projects/skills showing
**Solution**:
1. Check Railway PostgreSQL is connected
2. Use Railway's database viewer or connect with pgAdmin
3. Populate database using one of the methods in Step 1.7

### Railway build fails

**Issue**: Docker build errors
**Solution**:
1. Check Dockerfile syntax
2. Verify pom.xml is valid
3. Check Railway logs for specific error messages
4. Ensure root directory is set to `/backend`

## Cost Considerations

### Vercel
- **Free Tier**: 
  - 100 GB bandwidth
  - 6,000 build minutes
  - Commercial use allowed
- Perfect for your portfolio frontend

### Railway
- **Free Tier** (Trial):
  - $5 credit/month
  - Enough for small projects
  - After trial: ~$5-10/month estimated for backend + database
  
**Alternative free options** for backend:
- **Render**: Free tier available (apps sleep after 15 min inactivity)
- **Fly.io**: Free tier with limitations

## Production Checklist

Before going live:

- [ ] Backend deployed to Railway with PostgreSQL
- [ ] Railway backend URL generated
- [ ] Production Spring Boot configuration created
- [ ] Database populated with projects, skills, code repositories
- [ ] Vercel environment variable NEXT_PUBLIC_API_URL set
- [ ] Frontend redeployed with new environment variable
- [ ] Test all API endpoints work from production frontend
- [ ] Verify code viewer displays projects correctly
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Update README.md with live URL

## Next Steps

1. **Add PostgreSQL dependency** to pom.xml:
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. **Monitor your application**:
   - Railway provides logs and metrics
   - Vercel shows analytics and deployment logs

3. **Set up custom domain** (optional):
   - Buy domain from Namecheap/Google Domains
   - Add to Vercel: Settings → Domains
   - Update CORS in backend to include your domain

## Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Spring Boot on Docker**: https://spring.io/guides/gs/spring-boot-docker

---

**Your portfolio is ready for production!** 🚀

Once backend is deployed, you'll have a fully functional, professionally hosted portfolio showcasing your projects with viewable code.
