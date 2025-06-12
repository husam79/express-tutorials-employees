# Express.js Demo API

A simple REST API demonstration using Express.js for managing employee records (currently we have three properties only: id, name, and age).

## Permissions & Roles
admin: can do everything except adding in-out operations for another employee.
normal: can only attend: in or out, and get a report of in-out logs.

## Features

- CRUD operations for employee management
- Input validation (need to provide more accurate error message especially when eliminating name and age properties in the same time).
- UUID generation for unique employee IDs

## Prerequisites

- Node.js (at least version 19, latest LTS version is recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm run prod
```

The server will start on port 3006.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update entire employee record |
| PATCH | `/employees/:id` | Partially update employee record |
| DELETE | `/employees/:id` | Delete employee |

## Request Body Format

```json
{
    "name": "Ahmad Saeed",
    "age": 30
}
```

Both `name` (string) and `age` (number) are required for POST and PUT requests.
For PATCH requests, at least one field is required.

## Error Handling

The API includes validation for:
- Missing required fields
- Invalid age format
- Non-existent employee IDs

## Dependencies

- express: Web framework
- uuid: For generating unique IDs
- nodemon: Development dependency for auto-reloading
