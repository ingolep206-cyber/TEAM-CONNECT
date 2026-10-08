# TeamConnect – Distributed Team Collaboration Platform

TeamConnect is a beginner-friendly full-stack collaboration app designed for student projects and small distributed teams. It includes authentication, dashboard stats, team members, chat, file sharing, tasks, announcements, and user profile management.

## Features
- User registration and login using Supabase Auth
- Protected dashboard pages
- Team member listing with search
- Team chat with message history
- File uploads and downloads using Supabase Storage
- Task management with create, edit, delete, and filters
- Announcements board
- User profile update
- Responsive sidebar layout

## Tech stack
- Frontend: React, Vite, JavaScript, CSS, React Router, Lucide React
- Backend: Node.js, Express.js
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- File storage: Supabase Storage

## Folder structure
```text
teamconnect/
├── client/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── server.js
│   ├── .env
│   └── package.json
├── README.md
├── .gitignore
└── package.json
```

## Install frontend
```bash
cd teamconnect/client
npm install
```

## Install backend
```bash
cd teamconnect/server
npm install
```

## Configure Supabase
1. Create a Supabase project.
2. Copy your project URL and anon key.
3. Add them to the .env files in the client and server folders.
4. Run the SQL in `supabase/schema.sql` from the Supabase Dashboard SQL Editor. The file includes comments explaining each table and its purpose.

## Run the frontend
```bash
cd teamconnect/client
npm run dev -- --host 0.0.0.0
```

## Run the backend
```bash
cd teamconnect/server
node server.js
```

## How authentication works
- The frontend uses Supabase Auth for login and registration.
- After login, the app checks whether a session exists.
- If the session is valid, the user is allowed to access protected pages.
- If not, the app redirects the user to the login page.

## Security notes
- Never store passwords manually.
- Use Supabase Auth instead of a custom user table.
- Store secrets only in environment variables.
- Use Supabase Row Level Security rules for real production use.

## Beginner explanation
- Supabase is a managed backend platform built on PostgreSQL.
- PostgreSQL is a relational database that stores data in tables.
- A table is a collection of rows.
- A row is one record in a table.
- A primary key identifies each row uniquely.
- A foreign key links one table to another.
- Supabase Auth handles login and user sessions.
- Supabase Storage stores uploaded files.
