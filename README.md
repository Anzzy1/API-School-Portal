# Aguinaldo Polytechnic Institute - School Portal 🎓

A fully functional school portal with Student Information System (SIS).

## Project Structure

```
ICCT School Portal/
├── backend/
│   ├── server.js          # Express server (all routes)
│   ├── package.json        # Dependencies
│   └── .env               # Environment variables
├── cpp-report/
│   ├── report_generator.cpp  # C++ PDF/text report engine
│   └── compile.bat           # Compilation script
├── public/
│   ├── index.html          # Main portal (SPA-style)
│   ├── dashboard.html      # Standalone dashboard
│   ├── style.css           # All styles
│   └── script.js           # All frontend logic
├── database.sql            # Full database schema + sample data
└── README.md               # This file
```

## Features Implemented

### Public Pages
- [x] **Home** - Hero section, features, campus map, newsletter
- [x] **About** - Mission, vision, history, statistics
- [x] **Courses** - Dynamic course listing from database
- [x] **FAQ** - Interactive accordion (6 questions)
- [x] **Contact** - Contact form + info cards
- [x] **Login / Register** - JWT-based authentication

### Student Dashboard (Role-Based)
- [x] **Overview** - Stats cards (students, courses, etc.)
- [x] **My Profile** - View account information
- [x] **All Students** - Table with search and add functionality
- [x] **Reports** - Generate PDF reports via C++ backend
- [x] **Backup** - Export all database data to JSON

### C++ Integration
- [x] Report generation microservice
- [x] Spawned via Node.js child_process
- [x] Generates formatted text reports
- [x] Graceful fallback when C++ not compiled

### Cloud Backup
- [x] Exports all database tables to JSON
- [x] Saves with timestamp filenames
- [x] Ready for Google Drive API integration

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/register | No | Register new user |
| POST | /api/login | No | Login, returns JWT |
| GET | /api/profile | Yes | Get user profile |
| GET | /api/students | Yes | Get all students |
| POST | /api/students | Yes | Add new student |
| PUT | /api/students | Yes | Update student |
| DELETE | /api/students | Yes | Delete student |
| GET | /api/students/search?q= | Yes | Search students |
| GET | /api/courses | No | Get all courses |
| POST | /api/grades | Yes | Add grade |
| GET | /api/grades/:id | Yes | Get student grades |
| POST | /api/contact | No | Submit contact form |
| POST | /api/newsletter | No | Subscribe to newsletter |
| GET | /api/notifications/:id | Yes | Get user notifications |
| POST | /api/generate-report | Yes | Generate C++ report |
| POST | /api/backup | Yes | Create database backup |

## License
ICCT Colleges - School Portal Project
