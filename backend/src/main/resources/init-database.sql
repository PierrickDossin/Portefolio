-- Portfolio Database Initialization Script
-- Run this after deploying to Railway to populate the database

-- Note: This script uses PostgreSQL syntax
-- Skills will be inserted first, then projects, then code repositories

-- Clear existing data (optional - only if starting fresh)
-- DELETE FROM code_repositories;
-- DELETE FROM project_tags;
-- DELETE FROM projects;
-- DELETE FROM skills;

-- ============================================
-- SKILLS
-- ============================================

-- Data Engineering
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Apache Spark', 'DATA_ENGINEERING', 85, 1, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Kafka', 'DATA_ENGINEERING', 80, 2, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Airflow', 'DATA_ENGINEERING', 75, 3, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('ETL Pipelines', 'DATA_ENGINEERING', 85, 4, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Data Warehousing', 'DATA_ENGINEERING', 80, 5, NOW(), NOW());

-- Cloud & Infrastructure
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Azure', 'CLOUD_INFRASTRUCTURE', 75, 6, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Docker', 'CLOUD_INFRASTRUCTURE', 80, 7, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Kubernetes', 'CLOUD_INFRASTRUCTURE', 70, 8, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Linux', 'CLOUD_INFRASTRUCTURE', 85, 9, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Git', 'CLOUD_INFRASTRUCTURE', 90, 10, NOW(), NOW());

-- Programming & Databases
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Python', 'PROGRAMMING_DATABASES', 90, 11, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Java', 'PROGRAMMING_DATABASES', 85, 12, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('SQL', 'PROGRAMMING_DATABASES', 90, 13, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('PostgreSQL', 'PROGRAMMING_DATABASES', 85, 14, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('MongoDB', 'PROGRAMMING_DATABASES', 75, 15, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('pgAdmin', 'PROGRAMMING_DATABASES', 80, 16, NOW(), NOW());

-- Analytics & ML
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Pandas', 'ANALYTICS_ML', 90, 17, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('NumPy', 'ANALYTICS_ML', 85, 18, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Scikit-learn', 'ANALYTICS_ML', 80, 19, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('TensorFlow', 'ANALYTICS_ML', 75, 20, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Power BI', 'ANALYTICS_ML', 75, 21, NOW(), NOW());

-- Development Tools
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('VS Code', 'DEVELOPMENT_TOOLS', 95, 22, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Jupyter', 'DEVELOPMENT_TOOLS', 90, 23, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Postman', 'DEVELOPMENT_TOOLS', 85, 24, NOW(), NOW());

-- Web Development
INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('React', 'WEB_DEVELOPMENT', 85, 25, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('Spring Boot', 'WEB_DEVELOPMENT', 80, 26, NOW(), NOW());

INSERT INTO skills (name, category, level, display_order, created_at, updated_at) 
VALUES ('REST APIs', 'WEB_DEVELOPMENT', 90, 27, NOW(), NOW());

-- ============================================
-- PROJECTS
-- Note: Insert projects without code first, then update with code repository IDs
-- ============================================

-- Project 1: Ciget (no code repository)
INSERT INTO projects (title, description, category, github_url, live_url, icon_name, gradient_from, gradient_to, is_featured, display_order, created_at, updated_at)
VALUES (
  'Ciget - Medical Appointment Platform',
  'Full-stack healthcare platform connecting patients with doctors, featuring real-time appointment scheduling, video consultations, and secure medical records management.',
  'WEB_DEVELOPMENT',
  'https://github.com/PierrickDossin/Ciget',
  NULL,
  'Heart',
  '#FF6B6B',
  '#FFE66D',
  true,
  1,
  NOW(),
  NOW()
);

-- Get the ID for tags insertion
-- You'll need to insert tags separately using the project_id

-- Project 2: AI Fish Racing Game
INSERT INTO projects (title, description, category, github_url, icon_name, gradient_from, gradient_to, is_featured, display_order, created_at, updated_at)
VALUES (
  'AI Fish Racing Game',
  'AI-powered fish racing game using IoT sensors, WebSockets for real-time updates, and machine learning for fish behavior prediction. Integration project combining embedded systems, backend APIs, and interactive web interface.',
  'MACHINE_LEARNING',
  'https://github.com/PierrickDossin/IntegrationProjectAI',
  'Fish',
  '#00D9FF',
  '#7C3AED',
  true,
  2,
  NOW(),
  NOW()
);

-- Continue with other projects...
-- Due to the complexity of code repositories with their JSON file arrays,
-- it's recommended to populate code_repositories through the REST API instead
-- See DEPLOYMENT_GUIDE.md for instructions

-- ============================================
-- PROJECT TAGS
-- ============================================

-- Example: Add tags for Ciget project (replace project_id with actual ID)
-- INSERT INTO project_tags (project_id, tag) VALUES (1, 'Healthcare');
-- INSERT INTO project_tags (project_id, tag) VALUES (1, 'Spring Boot');
-- INSERT INTO project_tags (project_id, tag) VALUES (1, 'React');

-- NOTE: For full data population, see alternative method in DEPLOYMENT_GUIDE.md
-- Using the REST API is recommended for complex data structures like code repositories
