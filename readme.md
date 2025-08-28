# Todo App Backend

A robust Node.js backend API for the Todo application built with Express, TypeScript, and Prisma ORM.

## 🚀 Features

- **RESTful API** for task management
- **TypeScript** for type safety and better development experience
- **Prisma ORM** for database operations
- **Input validation** with comprehensive error handling
- **Jest testing** suite for reliable code
- **ESLint** configuration for code quality
- **Nodemon** for development with auto-reload

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (with Prisma ORM)
- **Testing**: Jest
- **Linting**: ESLint
- **Development**: Nodemon

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** database server
- **Git**

## 🗄️ MySQL Setup

### Windows
1. **Download MySQL Installer**:
   - Go to [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
   - Download "MySQL Installer for Windows"
   - Choose the larger download (about 450MB) for the complete installer

2. **Install MySQL**:
   - Run the installer as Administrator
   - Choose "Developer Default" or "Server only" installation type
   - Follow the setup wizard
   - Set a root password (remember this for the `.env` file)
   - Complete the installation

3. **Verify Installation**:
   ```bash
   mysql --version
   ```

### macOS
1. **Using Homebrew** (recommended):
   ```bash
   brew install mysql
   brew services start mysql
   ```

2. **Or download from MySQL website**:
   - Go to [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - Download the DMG file for macOS
   - Install and follow the setup wizard

3. **Verify Installation**:
   ```bash
   mysql --version
   ```

### Linux (Ubuntu/Debian)
1. **Install MySQL**:
   ```bash
   sudo apt update
   sudo apt install mysql-server
   sudo systemctl start mysql
   sudo systemctl enable mysql
   ```

2. **Secure Installation**:
   ```bash
   sudo mysql_secure_installation
   ```

3. **Verify Installation**:
   ```bash
   mysql --version
   ```


## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create MySQL Database

```bash
mysql -u root -p
CREATE DATABASE todo_app;
exit
```
### 4. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` file with your configuration:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=5000
NODE_ENV=development

```

### 5. Database Setup

#### Initialize Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View database in Prisma Studio
npx prisma studio
```

#### Database Schema

The database includes the following models:

- **Task**: id, title, color, completed, createdAt, updatedAt
- **User**: id, email, name, createdAt (for future authentication)

### 5. Start Development Server

```bash
# Development mode with auto-reload
npm run dev

# Production build
npm run build
npm start
```

## 🗄️ Database Operations

### Prisma Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ WARNING: This will delete all data)
npx prisma migrate reset

# Push schema changes without migrations
npx prisma db push

# View database in browser
npx prisma studio
```


## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: `tests/` directory
- **Mock Data**: `tests/mocks/` directory
- **Test Configuration**: `jest.config.js`

## 📡 API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |


### Request/Response Examples

#### Create Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "color": "blue"
}
```

#### Update Task
```bash
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated task title",
  "color": "green"
}
```

#### Task Response
```json
{
  "id": "clx1234567890",
  "title": "Buy groceries",
  "color": "blue",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `404` - Not Found (task not found)
- `500` - Internal Server Error

## Testing

The application includes comprehensive test coverage:

- **Unit tests** for services and utilities
- **Integration tests** for API endpoints
- **Test coverage** reporting
- **Mock database** for isolated testing

## 🔧 Development

### Project Structure

```
todo-backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── validators/      # Input validation schemas
├── prisma/
│   ├── migrations/      # Database migrations
│   └── schema.prisma    # Database schema
├── tests/               # Test files
├── package.json
└── tsconfig.json
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🔌 Connecting to Frontend

### CORS Configuration

The backend is configured to accept requests from the frontend. Ensure your frontend is running on the expected port (usually 3000).

### Environment Variables for Frontend

In your frontend `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### API Client Configuration

The frontend should be configured to make requests to:

- **Development**: `http://localhost:5000/api`



## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure Prisma client is generated: `npx prisma generate`
   - Check DATABASE_URL in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing process: `lsof -ti:5000 | xargs kill -9`

3. **Prisma Migration Issues**
   - Reset database: `npx prisma migrate reset`
   - Check schema syntax in `prisma/schema.prisma`

### Logs

Check console output for detailed error messages and debugging information.

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Testing Framework](https://jestjs.io/)


## 🔗 Related Repositories

- **Backend**: [Todo App Backend](https://github.com/m-adityavardhan/todo-backend) - API and database
- **Frontend**: [Todo App Frontend](https://github.com/m-adityavardhan/todo-frontend) - User interface




