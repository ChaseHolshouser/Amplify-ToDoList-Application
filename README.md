# Todo List Application
Developed by Chase Holshouser

## Overview:
This is a full-stack Todo List application built for the Amplify Federal Software Developer Intern assignment. The application allows users to create, complete, filter, and delete tasks while storing data through a backend service.

## Features:
    -Add new tasks
    -Mark tasks complete/incomplete
    -Delete tasks
    -Filter tasks by:
        -All
        -Active
        -Completed
    -Display remaining task count
    -Clear all completed tasks
    -Persistent backend storage using a JSON file
    -Backend API test coverage

## Tech Stack:
    -Frontend
        -React
        -JavaScript
        -CSS
    -Backend
        -Node.js
        -Express
    -Testing
        -Jest
        -Supertest

## Project Structure:

```text
AMPLIFY-TODO-APPLICATION/
├── client/
│   └── React frontend
├── server/
│   ├── server.js
│   ├── tasks.json
│   └── tests/
│       └── tasks.test.js
└── README.md
```

## Why I Chose This Stack:
I chose React for the frontend because it provides a clean way to manage UI state and user interactions. I used Node.js and Express for the backend because they allow simple REST API development and straightforward CRUD operations. I used JSON file persistence to keep the project lightweight while still meeting the backend persistence requirement.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Toggle task completion |
| DELETE | `/api/tasks/:id` | Delete a task |
| DELETE | `/api/tasks/completed` | Clear completed tasks |


## Running the Application:
    -Start Backend
        -cd server
        -npm install
        -npm start

## Backend runs on:
http://localhost:5000

    -Start Frontend
        -Open a second terminal:
        -cd client
        -npm install
        -npm start

## Frontend runs on:
http://localhost:3000


## Running Tests
    -From the server directory:
        -npm test
## Testign Covers:
    -Retrieving tasks
    -Creating tasks
    -Rejecting empty tasks
    -Toggling completion status
    -Deleting tasks
    -Clearing completed tasks


## Error Handling:
The application prevents users from submitting empty tasks. Both frontend and backend validation are included to ensure invalid task submissions are rejected.



## Future Improvements:
    -Given additional time, I would add:
        -Edit task functionality
        -Database persistence using PostgreSQL or SQLite
        -User authentication
        -Frontend unit testing
        -Responsive mobile styling
        -Cloud deployment


## AI Tool Usage:
AI tools were used as development assistants to help troubleshoot issues, reason through implementation decisions, and improve understanding of the application architecture. All code was reviewed, tested, and modified to ensure understanding of how the frontend, backend, persistence layer, and tests work together.