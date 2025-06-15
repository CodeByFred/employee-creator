[Backend README](../README.md)

# Employee Creator – Full Stack Application

- The **frontend** is a React/TypeScript interface that allows users to interact with the system in a user-friendly way.

---

## Frontend Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [To Run Locally](#to-run-locally)
- [Notes](#notes)

## Features

- View all employees in a responsive grid layout
- Create new employees with validated input
- Edit existing employee details
- Delete employees with toast notifications
- View and create contracts associated with employees
- Toggle employee active/inactive status _(planned)_
- API error handling with user-friendly toast notifications
- Dynamic modals for in-place creation of employees/contracts
- Real-time form validation using Zod + React Hook Form
- State management for employees and contracts
- Automatic form reset and navigation on success
- Route-based navigation using React Router
- Reusable components and SCSS module-based styling

---

## Tech Stack

#### Frontend

- React 19 (Vite)
- TypeScript
- SCSS Modules
- Axios (HTTP requests)
- React Router
- React Hook Form + Zod/v4
- React Toastify
- FontAwesome
- Modern Normalize

---

## Folder Structure

```
frontend/
├── public/
├── src/
│ ├── assets/ -> Database diagram
│ ├── components/ -> Reusable UI components
│ ├── pages/ -> Route-level page components
│ ├── schemas/ -> Zod schemas for validation
│ ├── services/ -> API interaction via Axios
│ ├── styles/ -> Global SCSS variables/mixins
│ ├── types/ -> Global TypeScript Types
│ ├── utils/ -> Utility functions
│ ├── App.tsx -> Root component
│ └── main.tsx -> App entry point
├── index.html
├── package.json
└── vite.config.ts
```

---

## To Run Locally

### Prerequisites

- Node.js 20+

#### 1. Change directories

```
cd employee-creator/frontend
```

#### 2. Install dependencies

```
npm install
```

#### 3. Run the dev server

```
npm run dev
```

#### 4. Visit

```
http://localhost:5173
```

## Notes

- Requires backend to be running
- All data persists to MySQL via the backend API
- Authentication and testing _(planned)_

---
