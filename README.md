# ProjectHub API

**ProjectHub API** is a simple RESTful API for managing team projects.
It provides user authentication and full CRUD operations for projects.
<br />

## Table of Contents

- Features
- Tech Stack
- Installation
- File Structure
- Environment Variables
- API Endpoints
- Error Handling
- Usage Examples
- Contributing
- License
<br />

## 💡 Features

- User registration, login, and logout
- JWT-based authentication for protected routes
- Create, read, update, and delete projects
- Middleware for logging, validation, and error handling
<br />

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- express-validator for request validation
<br />

## ⚡ Installation
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

### Users
| Method |	Path | Description |
|:---|:---|:---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login |
| POST | `/api/users/logout` | Logout |

### Projects
| Method | Path | Description | Auth Required
|:---|:---|:---|:---|
| GET | `/api/projects` | Get all projects |  |
| GET | `/api/projects/:id` | Get project by ID |  |
| POST | `/api/projects` | Create a new project | ✅ |
| PUT | `/api/projects/:id` | Update a project | ✅ |
| DELETE | `/api/projects/:id` | Delete a project | ✅ |

Note: Protected routes require JWT token in the `Authorization` header.
<br />

## ⚠ Error Handling

- Global error handler middleware
- 404 Not Found for invalid paths
- Validation errors return detailed messages
<br />

## 📝 Usage Examples

### 1. Register a User

- Method: POST
- URL: `http://localhost:5000/api/users/register`
- Body: JSON
```
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}
```
<br />

### 2. Login

- Method: POST
- URL: `http://localhost:5000/api/users/login`
- Body: JSON
```
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response contains a JWT token.
<br />

### 3. Create a Project (Protected)

- Method: POST
- URL: `http://localhost:5000/api/projects/create`
- Headers: Authorization: Bearer YOUR_JWT_TOKEN
- Body: JSON
```
{
  "title": "Project 1",
  "description": "First project",
  "team": "Team A"
}
```
<br />

### 4. Get All Projects

- Method: GET
- URL: `http://localhost:5000/api/projects/`
<br />

### 5. Update a Project

- Method: PATCH
- URL: `http://localhost:5000/api/projects/:id`
- Headers: Authorization: Bearer YOUR_JWT_TOKEN
- Body: JSON
```
{
  "title": "Project 1",
  "description": "First project updated",
  "team": "Team A"
}
```
<br />

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Open a Pull Request
<br />

## 📄 License

MIT License