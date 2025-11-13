# Code Viewer Feature - Usage Guide

## Overview

Your portfolio now includes a GitHub-style code viewer that allows you to showcase your project code directly on your website!

## Backend API Endpoints

```
GET    /api/repositories              - Get all code repositories
GET    /api/repositories/{id}         - Get repository by ID
GET    /api/repositories/project/{id} - Get repositories for a specific project
POST   /api/repositories              - Create new repository
PUT    /api/repositories/{id}         - Update repository
DELETE /api/repositories/{id}         - Delete repository
```

## Adding Code to Your Portfolio

### Option 1: Using the API (Recommended for now)

You can add code repositories using a REST client like Postman or curl:

```bash
curl -X POST http://localhost:8080/api/repositories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fish Race AI Scanner",
    "description": "Computer vision code for fish race detection",
    "githubUrl": "https://github.com/yourusername/fish-race-ai",
    "displayOrder": 1,
    "files": [
      {
        "fileName": "fish_detector.py",
        "filePath": "src/detection/fish_detector.py",
        "language": "python",
        "lines": 150,
        "content": "import cv2\nimport numpy as np\n\nclass FishDetector:\n    def __init__(self):\n        self.model = self.load_model()\n    \n    def detect_finish_line_crossing(self, frame):\n        # AI detection logic here\n        pass"
      },
      {
        "fileName": "arduino_scanner.ino",
        "filePath": "hardware/arduino_scanner.ino",
        "language": "cpp",
        "lines": 80,
        "content": "#include <Arduino.h>\n\nvoid setup() {\n    Serial.begin(9600);\n    pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n    // IoT scanner logic\n}"
      }
    ]
  }'
```

### Option 2: Direct Database Insert

You can also use the H2 Console at `http://localhost:8080/h2-console`:

```sql
-- Connection settings:
-- JDBC URL: jdbc:h2:mem:portfoliodb
-- Username: sa
-- Password: (leave empty)

INSERT INTO code_repositories (name, description, github_url, display_order)
VALUES ('My Project Code', 'Description', 'https://github.com/...', 1);
```

## Using the Code Viewer Component

### In Any Page/Component:

```typescript
import CodeViewer from '@/components/CodeViewer';
import { repositoryApi } from '@/lib/repositoryApi';

export default function ProjectDetailsPage() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadCode() {
      const repos = await repositoryApi.getAll();
      setRepositories(repos);
    }
    loadCode();
  }, []);

  return (
    <div>
      {repositories.map(repo => (
        <CodeViewer
          key={repo.id}
          files={repo.files}
          repositoryName={repo.name}
          githubUrl={repo.githubUrl}
        />
      ))}
    </div>
  );
}
```

### For a Specific Project:

```typescript
// Get code for a specific project
const repos = await repositoryApi.getByProjectId(projectId);
```

## Supported Languages

The code viewer supports syntax highlighting for:
- Python
- JavaScript/TypeScript
- Java
- C/C++
- HTML/CSS
- SQL
- And many more!

## Features

✅ **Syntax Highlighting** - Beautiful code display with VS Code Dark+ theme
✅ **Line Numbers** - Easy code reference
✅ **File Navigation** - Switch between multiple files
✅ **Copy Code** - One-click code copying
✅ **Download Files** - Download individual files
✅ **GitHub Integration** - Link directly to your GitHub repo
✅ **Responsive Design** - Works on all devices

## Example: Adding Your Fish Race AI Code

1. **Start your backend** (if not already running):
   ```bash
   cd V:\Portefolio\backend
   mvn spring-boot:run
   ```

2. **Send your code** using the API (copy your actual code files)

3. **View it** on your portfolio at the projects section

## Next Steps

1. ✅ Backend is running with code repository API
2. ✅ Frontend has CodeViewer component ready
3. 📝 Add your code files using the API
4. 🎨 Integrate CodeViewer into your Projects component
5. 🚀 Deploy to production!

---

**Need Help?** Check the backend logs or frontend console for any errors.
