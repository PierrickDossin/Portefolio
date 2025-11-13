# Update skill levels on Railway to 50-68% range
$API_BASE = "https://portefolio-production-72f9.up.railway.app/api"

# Skill ID to new level mapping (50-68% range)
$skillLevels = @{
    1 = 62   # Apache Spark
    2 = 58   # Apache Kafka
    3 = 60   # Apache Airflow
    4 = 55   # dbt
    5 = 65   # ETL/ELT
    6 = 58   # AWS
    7 = 52   # Snowflake
    8 = 56   # Docker & Kubernetes
    9 = 50   # Terraform
    10 = 50  # Azure Data Factory
    11 = 68  # Python
    12 = 68  # SQL
    13 = 64  # Java
    14 = 66  # PostgreSQL
    15 = 58  # MongoDB
    16 = 62  # Data Modeling
    17 = 66  # Pandas & NumPy
    18 = 54  # TensorFlow
    19 = 60  # Tableau/PowerBI
    20 = 50  # MLflow
    21 = 68  # Git & GitHub
    22 = 56  # CI/CD Pipelines
    23 = 62  # Linux/Bash
    24 = 68  # VS Code
    25 = 66  # Jupyter Notebooks
    26 = 64  # React & Next.js
    27 = 62  # TypeScript
    28 = 60  # Spring Boot
    29 = 66  # Tailwind CSS
    30 = 66  # REST APIs
}

Write-Host "Updating skill levels to 50-68% range..." -ForegroundColor Cyan

foreach ($skillId in $skillLevels.Keys | Sort-Object) {
    $newLevel = $skillLevels[$skillId]
    
    try {
        # Get current skill
        $skill = Invoke-RestMethod -Uri "$API_BASE/skills/$skillId" -Method Get
        
        # Update level
        $skill.level = $newLevel
        
        # Send update
        $response = Invoke-RestMethod -Uri "$API_BASE/skills/$skillId" -Method Put -Body ($skill | ConvertTo-Json) -ContentType "application/json"
        
        Write-Host "✓ Updated Skill ID $skillId ($($skill.name)): $newLevel%" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to update Skill ID $skillId : $_" -ForegroundColor Red
    }
}

Write-Host "`nAll skill levels updated successfully!" -ForegroundColor Green
Write-Host "Skills now range from 50% to 68% for realistic 1-year experience." -ForegroundColor Cyan
