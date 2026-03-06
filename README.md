# ProjectHub API

**ProjectHub API** is a RESTful API for managing team projects with user authentication and full CRUD operations.  
It demonstrates scalable backend structure, separation of concerns using controllers, middleware, and models, and secure authentication flows.
<br />

## 🌐 Live API

Base URL  
https://projecthub-api-bnd.onrender.com

Swagger Documentation 
https://projecthub-api-bnd.onrender.com/api-docs
<br />

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation-local-dev)
- [File Structure](#-file-structure)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Auth & Access Control](#-auth--access-control)
- [Security Features](#-security-features)
- [Error Handling](#-error-handling)
- [Sample Requests](#-sample-requests)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
<br />

## 💡 Features

- User registration, login, logout
- JWT-based authentication for protected routes
- Role-based access control (admin vs member)
- Full CRUD operations for projects
- Middleware for logging, validation, and error handling
- API documentation via Swagger
- Automated testing with Jest + Supertest
<br />

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- express-validator
- Swagger (OpenAPI)
- Jest + Supertest
<br />

## 🏗 Architecture

The API follows a layered architecture to maintain separation of concerns.

Client → Routes (Express Router) → Controllers (Business Logic) → Models (Mongoose) → MongoDB

Middleware is used for authentication, validation, logging, and error handling.
<br />

## ⚡ Installation (Local Dev)
```bash
# Clone the repository
git clone https://github.com/KellyBytes/projecthub-api.git
cd projecthub-api

# Install dependencies
npm install

# Run the server (development)
npm run dev
```
<br />

## 📁 File Structure

```
src
├── config
│   └── database.js
├── controllers
│   ├── projectController.js
│   └── userController.js
├── data
│   ├── projects.js
│   └── projects.json
├── middleware
│   ├── authentication.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── notFound.js
│   └── validate.js
├── models
│   ├── projectModel.js
│   └── userModel.js
├── routes
│   ├── projectRoutes.js
│   └── userRoutes.js
├── app.js
└── server.js
```
<br />

## 🌿 Environment Variables

Create a `.env` file in the root directory:
```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
<br />

## 📌 API Endpoints

Full interactive documentation is available via Swagger:
https://projecthub-api-bnd.onrender.com/api-docs

### Users
| Method |	Path | Description |
|:---|:---|:---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login |


### Projects
| Method | Path | Description | Auth Required |
|:---|:---|:---|:---|
| GET | `/api/projects` | Get all projects | ❌ |
| GET | `/api/projects/:id` | Get project by ID | ❌ |
| POST | `/api/projects` | Create a new project | ✅ |
| PATCH | `/api/projects/:id` | Update a project | ✅ |
| DELETE | `/api/projects/:id` | Delete a project | ✅ |

> Protected routes require JWT in `Authorization` header.

<br />

## 🔐 Auth & Access Control

- JWT issued at login
- Protected routes validated via `protect` middleware
- `adminOnly` middleware restricts admin actions

### Access rules:

- **View projects (GET)** → Public
- **Create / Update projects** → Authenticated users
- **Delete projects** → Admin only
<br />

## 🔒 Security Features

This API implements several security best practices to protect user data and prevent abuse.

### Authentication Security

- Passwords hashed using **bcrypt**
- **JWT-based authentication** for protected routes
- Tokens stored in **HTTP-only cookies** to prevent XSS access
- Secure cookies enabled in production (`secure: true`)

### Authorization

- **Role-based access control (RBAC)**
- Admin-only routes protected via middleware

### Rate Limiting

- **express-rate-limit** used to prevent abuse and brute force attacks
- Limits API requests per IP within a defined time window

Example:

100 requests per 5 minutes per IP.  
If the limit is exceeded, the API returns:

```bash
429 Too Many Requests
```

### Input Validation

- Request validation via **express-validator**
- Prevents malformed or malicious input
<br />

## ⚠ Error Handling

- Global error handler middleware
- 404 Not Found for invalid paths
- Validation errors return detailed messages
<br />

## 📝 Sample Requests

### 1. Register User

`POST https://projecthub-api-bnd.onrender.com/api/users/register`

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}
```

### 2. Login

`POST https://projecthub-api-bnd.onrender.com/api/users/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
### Response:

```json
{
  "message": "User logged in",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "USER_ID",
    "username": "john",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### 3. Create Project (Protected)

`POST https://projecthub-api-bnd.onrender.com/api/projects`

```bash
Authorization: Bearer JWT_TOKEN_HERE
```
```json
{
  "title": "Project 1",
  "description": "First project",
  "team": "Team A"
}
```

### 4. Get All Projects

`GET https://projecthub-api-bnd.onrender.com/api/projects`
<br />

## 🧪 Testing

Run all tests locally:
```bash
npm test
```

### Sample output:

```
PASS  tests/userLoginJWT.test.js
PASS  tests/project.test.js
Tests: 8 passed, 0 failed
```
> Demonstrates user auth, JWT handling, and project CRUD.

## 🤝 Contributing

1. Fork repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make changes
4. Open a Pull Request
<br />

## 📄 License

MIT License

---
[Back to Top](#projecthub-api)