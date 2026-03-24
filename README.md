# Web App Portfolio Backend

A RESTful API built with Node.js, Express, and PostgreSQL to manage portfolio projects, handle file uploads, and authenticate admin users using JWT.

---
## Tech Stack
- Node.js – Server-side runtime  
- Express.js – Web framework for RESTful APIs  
- PostgreSQL – Database for project storage  
- JWT – Authentication for admin login  
- Multer – File uploads (images, media)  

---
```
## Project Structure
web-app-portfolio-backend/
├── config/ # Database configuration
├── controllers/ # Business logic for routes
├── middleware/ # Authentication and error handling
├── models/ # Database queries
├── routes/ # API endpoints
├── uploads/ # Uploaded files
├── server.js # App entry point
├── package.json
└── .env # Environment variables (ignored in git)
```

---
## Features
- Admin authentication using JWT
- CRUD API for projects
- File upload handling
- PostgreSQL database integration
- RESTful API design
- CORS enabled for cross-origin requests
- Error handling middleware

---
## Authentication
- POST /api/login  
  Returns a JWT token if `ADMIN_PASSWORD` matches `.env`.  
- Protected routes require the token in the `Authorization` header:  

Authorization: Bearer <token>


---
## API Endpoints

### Projects
| Method | Endpoint                  | Description                 |
|--------|---------------------------|----------------------------|
| GET    | /api/projects             | Get all projects           |
| POST   | /api/projects             | Create a new project       |
| PUT    | /api/projects/:id         | Update project by ID       |
| DELETE | /api/projects/:id         | Delete project by ID       |

### Auth
| Method | Endpoint      | Description                  |
|--------|---------------|-----------------------------|
| POST   | /api/login    | Admin login with JWT token  |

---

## Installation
1. Clone repository:
```bash
git clone https://github.com/yourusername/web-app-portfolio-backend.git
cd web-app-portfolio-backend

Install dependencies:

npm install

Create .env in root folder:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=webapp_db
DB_PASSWORD=your_db_password
DB_PORT=5432

JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=your_admin_password
Run Server
node server.js

or, with nodemon:

npx nodemon server.js

Server runs on http://localhost:5000
 by default.


Test

Root test:
GET http://localhost:5000/

Login test:
POST http://localhost:5000/api/login
Body: { "password": "<your-admin-password>" }
