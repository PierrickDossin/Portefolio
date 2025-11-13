# Update skill levels on Railway to be more realistic
$API_BASE = "https://portefolio-production-72f9.up.railway.app/api"

# Updated skill levels (more realistic for a 3rd year student with 2 years experience)
$skillUpdates = @{
    # Data Engineering Skills (IDs 1-5)
    1 = 75  # Apache Spark
    2 = 70  # Apache Kafka
    3 = 72  # Apache Airflow
    4 = 68  # dbt
    5 = 80  # ETL/ELT
    
    # Cloud & Infrastructure (IDs 6-10)
    6 = 70   # AWS
    7 = 65   # Snowflake
    8 = 68   # Docker & Kubernetes
    9 = 60   # Terraform
    10 = 55  # Azure Data Factory
    
    # Programming & Databases (IDs 11-15)
    11 = 85  # Python
    12 = 88  # SQL
    13 = 78  # Java
    14 = 82  # PostgreSQL
    15 = 70  # MongoDB
    
    # Analytics & ML (IDs 16-20)
    16 = 75  # Data Modeling
    17 = 80  # Pandas & NumPy
    18 = 65  # TensorFlow
    19 = 72  # Tableau/PowerBI
    20 = 58  # MLflow
    
    # Development Tools (IDs 21-25)
    21 = 85  # Git & GitHub
    22 = 68  # CI/CD Pipelines
    23 = 75  # Linux/Bash
    24 = 90  # VS Code
    25 = 82  # Jupyter Notebooks
    
    # Web Development (IDs 26-30)
    26 = 78  # React & Next.js
    27 = 75  # TypeScript
    28 = 72  # Spring Boot
    29 = 80  # Tailwind CSS
    30 = 82  # REST APIs
}

Write-Host "Updating skill levels to more realistic values..." -ForegroundColor Cyan

foreach ($skillId in $skillUpdates.Keys) {
    $newLevel = $skillUpdates[$skillId]
    
    try {
        # Get the current skill data
        $skill = Invoke-RestMethod -Uri "$API_BASE/skills/$skillId" -Method Get
        
        # Update the level
        $skill.level = $newLevel
        
        # Send PUT request to update
        $response = Invoke-RestMethod -Uri "$API_BASE/skills/$skillId" `
            -Method Put `
            -ContentType "application/json" `
            -Body ($skill | ConvertTo-Json)
        
        Write-Host "✓ Updated Skill ID $skillId ($($skill.name)): $newLevel%" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to update Skill ID $skillId" -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
    }
}

Write-Host "`nAll skill levels updated successfully!" -ForegroundColor Green
Write-Host "The skills now show more realistic proficiency levels for a student with 2 years experience." -ForegroundColor Cyan
