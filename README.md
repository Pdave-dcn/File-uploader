# File Uploader

File Uploader is a web application that allows users to securely upload, organize, and manage their files and folders. It is built using Node.js, Express, Prisma, and EJS for templating.

## Features

- User authentication (Sign Up, Login, Logout) using Passport.js.
- Create, update, and delete folders.
- Upload, view, download, and delete files.
- Nested folder structure for better organization.

## Project Structure

The project is organized as follows:

```
file-uploader/
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── config/                # Configuration files (e.g., database, passport)
│   ├── controllers/           # Application logic for routes
│   ├── middlewares/           # Middleware functions (e.g., authentication, file upload)
│   ├── routes/                # Route definitions
│   ├── views/                 # EJS templates for rendering UI
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .gitignore                 # Ignored files and folders
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js
- **Templating**: EJS
- **File Upload**: Multer

## Scripts

- `npm run dev`: Start the development server with file watching.

## Folder Structure

### Prisma

- `schema.prisma`: Defines the database schema.
- `migrations/`: Contains migration files for database changes.

### Source Code (`src`)

- `config/`: Configuration files for database and Passport.js.
- `controllers/`: Handles application logic for routes.
- `middlewares/`: Middleware for authentication and file uploads.
- `routes/`: Defines application routes.
- `views/`: EJS templates for rendering the UI.

## License

This project is licensed under the ISC License.

---
