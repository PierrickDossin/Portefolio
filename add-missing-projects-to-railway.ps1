# Script to add missing projects to Railway backend

$baseUrl = "https://portefolio-production-72f9.up.railway.app/api"

# Project 7: Finance Dashboard
$project7 = @{
    title = "Finance Dashboard"
    description = "Interactive financial analytics dashboard with real-time data visualization, expense tracking, and budget management. Features dynamic charts, spending insights, and financial goal tracking."
    category = "WEB_DEVELOPMENT"
    tags = @("React", "Data Visualization", "Finance", "Dashboard")
    iconName = "LineChart"
    gradientFrom = "#10B981"
    gradientTo = "#3B82F6"
    isFeatured = $true
    displayOrder = 7
} | ConvertTo-Json

# Project 8: Mobile Fitness App
$project8 = @{
    title = "Mobile Fitness Tracker"
    description = "Cross-platform mobile fitness application for tracking workouts, nutrition, and health metrics. Features progress visualization, workout plans, and achievement tracking with social sharing capabilities."
    category = "MOBILE_DEVELOPMENT"
    tags = @("React Native", "Mobile", "Fitness", "Health Tracking")
    iconName = "Activity"
    gradientFrom = "#F59E0B"
    gradientTo = "#EF4444"
    isFeatured = $true
    displayOrder = 8
} | ConvertTo-Json

# Project 9: SplitTracker
$project9 = @{
    title = "SplitTracker - Expense Splitting App"
    description = "Smart expense splitting application with OCR receipt scanning. Automatically detects items and prices from photos, calculates fair splits, and tracks group expenses with payment reminders."
    category = "MOBILE_DEVELOPMENT"
    tags = @("OCR", "Mobile", "Finance", "Computer Vision", "React Native")
    iconName = "Receipt"
    gradientFrom = "#8B5CF6"
    gradientTo = "#EC4899"
    isFeatured = $true
    displayOrder = 9
} | ConvertTo-Json

Write-Host "Adding Finance Dashboard..." -ForegroundColor Cyan
try {
    $response1 = Invoke-RestMethod -Uri "$baseUrl/projects" -Method Post -Body $project7 -ContentType "application/json"
    Write-Host "✓ Added: $($response1.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Error adding Finance Dashboard: $_" -ForegroundColor Red
}

Write-Host "`nAdding Mobile Fitness Tracker..." -ForegroundColor Cyan
try {
    $response2 = Invoke-RestMethod -Uri "$baseUrl/projects" -Method Post -Body $project8 -ContentType "application/json"
    Write-Host "✓ Added: $($response2.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Error adding Mobile Fitness Tracker: $_" -ForegroundColor Red
}

Write-Host "`nAdding SplitTracker..." -ForegroundColor Cyan
try {
    $response3 = Invoke-RestMethod -Uri "$baseUrl/projects" -Method Post -Body $project9 -ContentType "application/json"
    Write-Host "✓ Added: $($response3.title)" -ForegroundColor Green
} catch {
    Write-Host "✗ Error adding SplitTracker: $_" -ForegroundColor Red
}

Write-Host "`n✅ Done! Verifying..." -ForegroundColor Green
Write-Host "`nCurrent projects in Railway database:" -ForegroundColor Cyan
$allProjects = Invoke-RestMethod -Uri "$baseUrl/projects"
$allProjects | Select-Object id, title | Format-Table -AutoSize

Write-Host "`nTotal projects: $($allProjects.Count)" -ForegroundColor Yellow
