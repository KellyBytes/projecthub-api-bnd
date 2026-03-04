# ProjectHub API

**ProjectHub API** is a RESTful API for managing team projects with user authentication and full CRUD operations.  
It demonstrates scalable backend structure, separation of concerns using controllers, middleware, and models, and secure authentication flows.
<br />

## 🌐 Live API

After deploying to Render, access the API at:  
`https://your-projecthub-api.onrender.com`

Swagger (interactive API docs):  
`https://your-projecthub-api.onrender.com/api-docs`
<br />

## Table of Contents

- Features
- Tech Stack
- Installation
- File Structure
- Environment Variables
- API Endpoints
- Auth & Access Control
- Error Handling
- Sample Requests
- Testing
- Contributing
- License
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

- Node.js / Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- express-validator for request validation
- Swagger (OpenAPI)
- Jest + Supertest
<br />

## ⚡ Installation (Local Dev)
```bash
# Clone the repository
git clone https://github.com/yourusername/projecthub-api.git
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
[Link to Swagger](https://your-projecthub-api.onrender.com/api-docs) 
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
- Protected routes validated via pr`otect middleware
- `adminOnly` middleware restricts admin actions

### Access rules:

- **View projects (GET)** → Public
- **Create / Update projects** → Authenticated users
- **Delete projects** → Admin only
<br />

## ⚠ Error Handling

- Global error handler middleware
- 404 Not Found for invalid paths
- Validation errors return detailed messages
<br />

## 📝 Sample Requests

### 1. Register User

`POST https://your-projecthub-api.onrender.com/api/users/register`

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}
```

### 2. Login

`POST https://your-projecthub-api.onrender.com/api/users/login`

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

`POST https://your-projecthub-api.onrender.com/api/projects`

```http
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

`GET https://your-projecthub-api.onrender.com/api/projects`
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