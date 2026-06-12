# Aguinaldo Polytechnic Institute - School Portal 🎓

A fully functional school portal with Student Information System (SIS), role-based authentication, C++ backend integration for PDF report generation, and cloud backup capabilities.

## Team Structure (10 Members)

| Role | Members | Responsibilities |
|------|---------|-----------------|
| Project Manager | 1 | Timeline, task boards, deployment |
| UI/UX Designer | 1 | Wireframes, accessibility, diagrams |
| Frontend Devs | 2 | HTML/CSS/JS, 3+ panels, responsive |
| Backend Devs (JS) | 2 | Express API, JWT auth, routing |
| Backend Dev (C++) | 1 | Report generator microservice |
| Database Admin | 1 | Schema/ERD design, queries, backups |
| QA & Docs | 2 | Testing, security, documentation |

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MySQL (via XAMPP)
- **C++ Integration:** Report generation microservice
- **Auth:** JWT (JSON Web Tokens)
- **Cloud Backup:** JSON export (Google Drive ready)

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

## Security
- Passwords hashed with bcryptjs
- JWT tokens with 24h expiration
- SQL injection protection via parameterized queries
- CORS enabled for API access

## Deployment
For live deployment:
1. **Frontend:** Deploy `public/` folder to Vercel, Netlify, or Cloudflare Pages
2. **Backend:** Deploy `backend/` to Railway, Render, or any Node.js host
3. **Database:** Use a cloud MySQL host or keep local for demo
4. **Set environment variables** on the deployment platform

## Google Drive Backup Integration
To enable actual Google Drive backup:
1. Create a Google Cloud Project
2. Enable Google Drive API
3. Create OAuth 2.0 credentials
4. Install `googleapis` npm package
5. Modify `/api/backup` endpoint to upload to Drive

## License
ICCT Colleges - School Portal Project
