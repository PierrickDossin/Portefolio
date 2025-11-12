# Portfolio Backend - Spring Boot Application

A RESTful API backend for the portfolio website built with Spring Boot, JPA, and H2/PostgreSQL database.

## Architecture

This application follows a **layered architecture** pattern:

```
┌─────────────────────────────────────┐
│         Controller Layer            │  ← REST API endpoints
├─────────────────────────────────────┤
│          Service Layer              │  ← Business logic
├─────────────────────────────────────┤
│        Repository Layer             │  ← Data access (JPA)
├─────────────────────────────────────┤
│         Domain/Model Layer          │  ← Entity models
└─────────────────────────────────────┘
```

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database (development)
- **PostgreSQL** - Production database
- **Lombok** - Boilerplate code reduction
- **Maven** - Dependency management

## Project Structure

```
backend/
├── src/main/java/com/portfolio/
│   ├── PortfolioApplication.java           # Main application class
│   ├── config/
│   │   └── WebConfig.java                  # CORS configuration
│   ├── controller/                         # REST Controllers
│   │   ├── ProjectController.java
│   │   ├── SkillController.java
│   │   └── ContactMessageController.java
│   ├── service/                            # Business logic layer
│   │   ├── ProjectService.java
│   │   ├── SkillService.java
│   │   ├── ContactMessageService.java
│   │   └── DataInitializationService.java
│   ├── repository/                         # JPA Repositories
│   │   ├── ProjectRepository.java
│   │   ├── SkillRepository.java
│   │   └── ContactMessageRepository.java
│   └── domain/model/                       # Domain entities
│       ├── Project.java
│       ├── Skill.java
│       └── ContactMessage.java
└── src/main/resources/
    ├── application.properties              # Development config
    └── application-prod.properties         # Production config
```

## Database Schema

### Projects Table
- `id` (PK)
- `title`, `description`, `category`
- `tags` (one-to-many)
- `github_url`, `live_url`
- `icon_name`, `gradient_from`, `gradient_to`
- `is_featured`, `display_order`
- `created_at`, `updated_at`

### Skills Table
- `id` (PK)
- `name`, `category`, `level`
- `display_order`
- `created_at`, `updated_at`

### Contact Messages Table
- `id` (PK)
- `name`, `email`, `message`
- `is_read`
- `created_at`

## API Endpoints

### Projects API
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/{category}` - Get projects by category
- `GET /api/projects/tag/{tag}` - Get projects by tag
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Skills API
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/{category}` - Get skills by category
- `GET /api/skills/{id}` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Contact Messages API
- `GET /api/contact` - Get all messages
- `GET /api/contact/unread` - Get unread messages
- `GET /api/contact/{id}` - Get message by ID
- `POST /api/contact` - Create new message
- `PATCH /api/contact/{id}/read` - Mark message as read
- `DELETE /api/contact/{id}` - Delete message

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Development Mode (H2 Database)

```bash
cd backend
mvn spring-boot:run
```

The application will start on `http://localhost:8080`
H2 Console available at: `http://localhost:8080/h2-console`

### Production Mode (PostgreSQL)

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## Sample Data

The application automatically initializes with sample data on startup:
- 6 sample projects (data engineering and web development)
- 30 skills across 6 categories

## Testing

Access the H2 console for database inspection:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:portfoliodb`
- Username: `sa`
- Password: (leave empty)

## Configuration

Edit `application.properties` for development settings
Edit `application-prod.properties` for production PostgreSQL configuration

## CORS Configuration

CORS is configured to allow requests from `http://localhost:3000` (frontend)
