# Express.js Demo API

A comprehensive REST API sample application for employee management system with authentication, role-based access control, and attendance tracking using Express.js and MongoDB.

## Features

- **Authentication System**: Token-based authentication with login/logout
- **Employee Management**: CRUD operations for employee records
- **Attendance Tracking**: Attendance in/out functionality with timestamp logging
- **Role-based Access Control**: Admin and normal user permissions
- **Input Validation**: Comprehensive validation for all endpoints
- **MongoDB Integration**: Persistent data storage with Mongoose

## Permissions & Roles

- **admin**: Can manage all employees, view all attendance records, but cannot log in/out the attendance for other employees
- **normal**: Can only log in/out attendance for themselves and view their own attendance logs

## Prerequisites

- Node.js (at least version 16, latest LTS version is recommended)
- npm (comes with Node.js)
- MongoDB (running on default port 27017)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Ensure MongoDB is running on `mongodb://127.0.0.1:27017/employees_db`

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm run prod
```

Create admin user:
```bash
npm run admin_seed
```

The server will start on port 3006.

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/login` | User login | Public |
| POST | `/auth/logout` | User logout | Authenticated |

### Employee Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/employees` | Get all employees | Admin only |
| GET | `/employees/:id` | Get employee by ID | Admin only |
| POST | `/employees` | Create new employee | Admin only |
| PUT | `/employees/:id` | Update entire employee record | Admin only |
| PATCH | `/employees/:id` | Partially update employee record | Admin only |
| DELETE | `/employees/:id` | Delete employee | Admin only |

### Attendance
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/attendance` | Clock in/out | Self only |
| GET | `/attendance` | Get all attendance records | Admin only |
| GET | `/attendance/:employeeId` | Get attendance for specific employee | Self or Admin |

## Request Body Formats

### Employee Creation/Update
```json
{
    "username": "john_doe",
    "password": "securePassword123",
    "name": "John Doe",
    "age": 30
}
```

### Login
```json
{
    "username": "john_doe",
    "password": "securePassword123"
}
```

### Attendance
```json
{
    "operation": "in",
    "employeeId": "employee_id_here"
}
```

## Response Formats

### Login Success
```json
{
    "token": "generated_token_here"
}
```

### Employee Data
```json
{
    "id": "employee_id",
    "username": "john_doe",
    "name": "John Doe",
    "age": 30
}
```

### Attendance Record
```json
{
    "employeeId": "employee_id",
    "operation": "in",
    "dateTime": "2024-01-15T09:00:00.000Z"
}
```

## Authentication

All endpoints except `/auth/login` require authentication. Include the token in the request headers:

```
Authorization: Bearer your_token_here
```

## Validation Rules

### Employee Validation
- **username**: Required, must be unique
- **password**: Required for creation
- **name**: Required for full employee creation
- **age**: Required for full employee creation, must be a number

### Attendance Validation
- **operation**: Required, must be either 'in' or 'out'
- **employeeId**: Required

### Partial Updates (PATCH)
- At least one field (name or age) must be provided

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid data types
- Authentication failures
- Authorization violations
- Non-existent records
- Database connection issues

## Database Schema

### Employee
- username (String, unique, required)
- name (String)
- age (Number)
- password (String, hashed)
- token (String)
- role (String, enum: ['admin', 'normal'], default: 'normal')

### Attendance
- employeeId (String)
- operation (String: 'in' or 'out')
- dateTime (Date, auto-generated)

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **bcrypt**: Password hashing
- **crypto**: Token generation
- **nodemon**: Development dependency for auto-reloading
- **boxen**: Nice terminal output

## Development Notes

- Database: MongoDB running on localhost:27017
- Database name: employees_db
- Default admin user can be created using the admin_seed script
- All passwords are hashed using bcrypt
- Tokens are generated using crypto.randomBytes for security
