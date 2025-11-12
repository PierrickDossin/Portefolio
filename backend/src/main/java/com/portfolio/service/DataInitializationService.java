package com.portfolio.service;

import com.portfolio.domain.model.CodeRepository;
import com.portfolio.domain.model.Project;
import com.portfolio.domain.model.Skill;
import com.portfolio.repository.CodeRepositoryRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataInitializationService implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final CodeRepositoryRepository codeRepositoryRepository;

    @Override
    public void run(String... args) {
        log.info("Initializing database with sample data...");
        initializeProjects();
        initializeSkills();
        initializeCodeRepositories();
        log.info("Database initialization completed!");
    }

    private void initializeProjects() {
        if (projectRepository.count() > 0) {
            log.info("Projects already exist, skipping initialization");
            return;
        }

        log.info("Creating sample projects...");

        // Real Projects
        Project project1 = new Project();
        project1.setTitle("Ciget Commercial Website");
        project1.setDescription("Developed a professional commercial website for Ciget, featuring modern UI/UX design, responsive layout, and seamless user experience. Built with cutting-edge web technologies for optimal performance and SEO.");
        project1.setCategory(Project.ProjectCategory.WEB_DEVELOPMENT);
        project1.setTags(Arrays.asList("Web Design", "Responsive", "SEO", "UI/UX"));
        project1.setIconName("Globe");
        project1.setGradientFrom("blue-600");
        project1.setGradientTo("cyan-600");
        project1.setIsFeatured(true);
        project1.setDisplayOrder(1);

        Project project2 = new Project();
        project2.setTitle("AI Fish Race Gambling Platform");
        project2.setDescription("Revolutionary gambling platform using computer vision AI to detect when fish cross the finish line in real-time. Integrated IoT scanners built with Arduino for accurate race tracking and automated result verification.");
        project2.setCategory(Project.ProjectCategory.MACHINE_LEARNING);
        project2.setTags(Arrays.asList("AI", "Computer Vision", "IoT", "Arduino", "Real-time Processing"));
        project2.setIconName("Cpu");
        project2.setGradientFrom("purple-600");
        project2.setGradientTo("pink-600");
        project2.setIsFeatured(true);
        project2.setDisplayOrder(2);

        Project project3 = new Project();
        project3.setTitle("Energy Education 3D Game");
        project3.setDescription("Collaborative 3D video game developed with a team of 6 developers to teach children about energy usage and conservation. Interactive gameplay makes learning about sustainability fun and engaging through immersive 3D environments.");
        project3.setCategory(Project.ProjectCategory.WEB_DEVELOPMENT);
        project3.setTags(Arrays.asList("JavaScript", "3D Graphics", "Education", "Game Development", "Team Project"));
        project3.setIconName("Gamepad2");
        project3.setGradientFrom("green-600");
        project3.setGradientTo("emerald-600");
        project3.setIsFeatured(true);
        project3.setDisplayOrder(3);

        Project project4 = new Project();
        project4.setTitle("Real-Time Data Pipeline with Airflow");
        project4.setDescription("Engineered a real-time data processing pipeline using Apache Airflow orchestration and Docker containerization. Handles continuous data ingestion, transformation, and loading with automated monitoring and error handling.");
        project4.setCategory(Project.ProjectCategory.DATA_ENGINEERING);
        project4.setTags(Arrays.asList("Apache Airflow", "Docker", "Real-time Processing", "ETL", "Python"));
        project4.setIconName("Workflow");
        project4.setGradientFrom("orange-600");
        project4.setGradientTo("red-600");
        project4.setIsFeatured(true);
        project4.setDisplayOrder(4);

        Project project5 = new Project();
        project5.setTitle("Azure Flower Database - Batch Processing");
        project5.setDescription("Batch processing system for flower data with input validation and Azure Container Database integration. Automated data ingestion pipeline validates entries before storage, ensuring data quality and consistency in the cloud database.");
        project5.setCategory(Project.ProjectCategory.DATA_ENGINEERING);
        project5.setTags(Arrays.asList("Azure", "Batch Processing", "Data Validation", "Container Database", "ETL"));
        project5.setIconName("Database");
        project5.setGradientFrom("indigo-600");
        project5.setGradientTo("blue-600");
        project5.setIsFeatured(true);
        project5.setDisplayOrder(5);

        Project project6 = new Project();
        project6.setTitle("Depression Prediction ML Model");
        project6.setDescription("Machine learning model designed to predict depression risk based on patient data and behavioral patterns. Uses advanced algorithms to identify early warning signs, achieving high accuracy in mental health assessment.");
        project6.setCategory(Project.ProjectCategory.MACHINE_LEARNING);
        project6.setTags(Arrays.asList("Machine Learning", "Python", "Healthcare", "Predictive Analytics", "Data Science"));
        project6.setIconName("Brain");
        project6.setGradientFrom("pink-600");
        project6.setGradientTo("rose-600");
        project6.setIsFeatured(true);
        project6.setDisplayOrder(6);

        Project project7 = new Project();
        project7.setTitle("Finance Dashboard");
        project7.setDescription("Interactive financial analytics dashboard with real-time data visualization, expense tracking, and budget management. Features dynamic charts, spending insights, and financial goal tracking.");
        project7.setCategory(Project.ProjectCategory.WEB_DEVELOPMENT);
        project7.setTags(Arrays.asList("React", "Data Visualization", "Finance", "Dashboard", "Charts"));
        project7.setIconName("LineChart");
        project7.setGradientFrom("#10B981");
        project7.setGradientTo("#3B82F6");
        project7.setIsFeatured(true);
        project7.setDisplayOrder(7);

        Project project8 = new Project();
        project8.setTitle("Mobile Fitness Tracker");
        project8.setDescription("Cross-platform mobile fitness application for tracking workouts, nutrition, and health metrics. Features progress visualization, workout plans, and achievement tracking with social sharing capabilities.");
        project8.setCategory(Project.ProjectCategory.MOBILE_DEVELOPMENT);
        project8.setTags(Arrays.asList("React Native", "Mobile", "Fitness", "Health Tracking", "Cross-platform"));
        project8.setIconName("Activity");
        project8.setGradientFrom("#F59E0B");
        project8.setGradientTo("#EF4444");
        project8.setIsFeatured(true);
        project8.setDisplayOrder(8);

        Project project9 = new Project();
        project9.setTitle("SplitTracker - Expense Splitting App");
        project9.setDescription("Smart expense splitting application with OCR receipt scanning. Automatically detects items and prices from photos, calculates fair splits, and tracks group expenses with payment reminders.");
        project9.setCategory(Project.ProjectCategory.MOBILE_DEVELOPMENT);
        project9.setTags(Arrays.asList("OCR", "Mobile", "Finance", "Computer Vision", "React Native"));
        project9.setIconName("Receipt");
        project9.setGradientFrom("#8B5CF6");
        project9.setGradientTo("#EC4899");
        project9.setIsFeatured(true);
        project9.setDisplayOrder(9);

        projectRepository.saveAll(Arrays.asList(project1, project2, project3, project4, project5, project6, project7, project8, project9));
        log.info("Created {} sample projects", 9);
    }

    private void initializeSkills() {
        if (skillRepository.count() > 0) {
            log.info("Skills already exist, skipping initialization");
            return;
        }

        log.info("Creating sample skills...");

        // Data Engineering Skills
        skillRepository.save(createSkill("Apache Spark", Skill.SkillCategory.DATA_ENGINEERING, 95, 1));
        skillRepository.save(createSkill("Apache Kafka", Skill.SkillCategory.DATA_ENGINEERING, 90, 2));
        skillRepository.save(createSkill("Apache Airflow", Skill.SkillCategory.DATA_ENGINEERING, 92, 3));
        skillRepository.save(createSkill("dbt", Skill.SkillCategory.DATA_ENGINEERING, 88, 4));
        skillRepository.save(createSkill("ETL/ELT", Skill.SkillCategory.DATA_ENGINEERING, 95, 5));

        // Cloud & Infrastructure
        skillRepository.save(createSkill("AWS (S3, Redshift, EMR)", Skill.SkillCategory.CLOUD_INFRASTRUCTURE, 93, 1));
        skillRepository.save(createSkill("Snowflake", Skill.SkillCategory.CLOUD_INFRASTRUCTURE, 90, 2));
        skillRepository.save(createSkill("Docker & Kubernetes", Skill.SkillCategory.CLOUD_INFRASTRUCTURE, 87, 3));
        skillRepository.save(createSkill("Terraform", Skill.SkillCategory.CLOUD_INFRASTRUCTURE, 85, 4));
        skillRepository.save(createSkill("Azure Data Factory", Skill.SkillCategory.CLOUD_INFRASTRUCTURE, 82, 5));

        // Programming & Databases
        skillRepository.save(createSkill("Python", Skill.SkillCategory.PROGRAMMING_DATABASES, 95, 1));
        skillRepository.save(createSkill("SQL", Skill.SkillCategory.PROGRAMMING_DATABASES, 98, 2));
        skillRepository.save(createSkill("Java", Skill.SkillCategory.PROGRAMMING_DATABASES, 92, 3));
        skillRepository.save(createSkill("PostgreSQL", Skill.SkillCategory.PROGRAMMING_DATABASES, 92, 4));
        skillRepository.save(createSkill("MongoDB", Skill.SkillCategory.PROGRAMMING_DATABASES, 85, 5));

        // Analytics & ML
        skillRepository.save(createSkill("Data Modeling", Skill.SkillCategory.ANALYTICS_ML, 93, 1));
        skillRepository.save(createSkill("Pandas & NumPy", Skill.SkillCategory.ANALYTICS_ML, 90, 2));
        skillRepository.save(createSkill("TensorFlow", Skill.SkillCategory.ANALYTICS_ML, 78, 3));
        skillRepository.save(createSkill("Tableau/PowerBI", Skill.SkillCategory.ANALYTICS_ML, 85, 4));
        skillRepository.save(createSkill("MLflow", Skill.SkillCategory.ANALYTICS_ML, 80, 5));

        // Development Tools
        skillRepository.save(createSkill("Git & GitHub", Skill.SkillCategory.DEVELOPMENT_TOOLS, 92, 1));
        skillRepository.save(createSkill("CI/CD Pipelines", Skill.SkillCategory.DEVELOPMENT_TOOLS, 88, 2));
        skillRepository.save(createSkill("Linux/Bash", Skill.SkillCategory.DEVELOPMENT_TOOLS, 90, 3));
        skillRepository.save(createSkill("VS Code", Skill.SkillCategory.DEVELOPMENT_TOOLS, 95, 4));
        skillRepository.save(createSkill("Jupyter Notebooks", Skill.SkillCategory.DEVELOPMENT_TOOLS, 93, 5));

        // Web Development
        skillRepository.save(createSkill("React & Next.js", Skill.SkillCategory.WEB_DEVELOPMENT, 88, 1));
        skillRepository.save(createSkill("TypeScript", Skill.SkillCategory.WEB_DEVELOPMENT, 85, 2));
        skillRepository.save(createSkill("Spring Boot", Skill.SkillCategory.WEB_DEVELOPMENT, 90, 3));
        skillRepository.save(createSkill("Tailwind CSS", Skill.SkillCategory.WEB_DEVELOPMENT, 90, 4));
        skillRepository.save(createSkill("REST APIs", Skill.SkillCategory.WEB_DEVELOPMENT, 92, 5));

        log.info("Created 30 sample skills");
    }

    private Skill createSkill(String name, Skill.SkillCategory category, int level, int displayOrder) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setLevel(level);
        skill.setDisplayOrder(displayOrder);
        return skill;
    }

    private void initializeCodeRepositories() {
        if (codeRepositoryRepository.count() > 0) {
            log.info("Code repositories already exist, skipping initialization");
            return;
        }

        log.info("Creating code repositories...");

        // Get projects from database
        Project project3 = projectRepository.findById(3L).orElse(null); // Energy Education 3D Game
        Project project4 = projectRepository.findById(4L).orElse(null); // Real-Time Data Pipeline

        if (project3 != null && project4 != null) {
            // Create repositories with project associations
            codeRepositoryRepository.save(createRepository(project4));
            codeRepositoryRepository.save(createRepository(project3));
            log.info("Created code repositories for projects 3 and 4");
        } else {
            log.warn("Projects not found, skipping code repository initialization");
        }
    }

    private CodeRepository createRepository(Project project) {
        CodeRepository repo = new CodeRepository();
        repo.setProject(project);
        
        if (project.getId() == 3L) {
            // Energy Education 3D Game
            repo.setName("Energy Education 3D Game");
            repo.setDescription("Interactive 3D educational game built with Three.js by a team of 6 developers. Features low-poly cartoon city with animated wind turbines, particle systems, procedural generation, and real-time shadows. Teaches renewable energy concepts through visual exploration.");
            repo.setDisplayOrder(1);
        } else if (project.getId() == 4L) {
            // Real-Time Data Pipeline
            repo.setName("Formula 1 Real-Time Processing Pipeline");
            repo.setDescription("Real-time data pipeline processing Formula 1 pitstop data (1950-2024). Features continuous file monitoring, comprehensive F1-specific validation (35+ teams & circuits), feature engineering with 5 transformations, and dual-output storage (local + Azure Blob).");
            repo.setDisplayOrder(1);
        }
        
        return repo;
    }
}
