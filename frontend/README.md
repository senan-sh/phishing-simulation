# Frontend Project: Phishing Attempt Management

## Overview

This frontend project is designed to interact with the **Phishing Attempt Management API**. It allows users to manage phishing attempts with secure authentication and intuitive navigation.

## Features

- **Authentication:** Login and registration functionalities.
- **Phishing Attempts Management:**
  - View previously created phishing attempts in a table.
  - Create new phishing attempts.
  - **Access Control:** The "phishing-attempts" route is protected and cannot be accessed without proper authentication.

## Technologies Used

- **Code:** Typescript
- **Bundler:** Vite
- **UI Framework:** React
- **Components:** Ant Design
- **Routing:** React Router
- **Styling:** SCSS
- **Notifications:** react-hot-toast
- **HTTP Requests:** Axios
- **Date Handling:** dayjs

## Local Development

- Default local development port: **5173**
- To run the project locally:
  1. Clone the repository.
  2. Run `npm install` to install dependencies.
  3. Start the development server with `npm run dev`.

## Docker Configuration

This project includes a Dockerfile for containerized deployment. Below is the configuration:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## How to Use

### Routes

- **Auth Route:**
  - Handles user login and registration.
- **Phishing-Attempts Route:**
  - Displays a table of previously created phishing attempts.
  - Allows users to create new phishing attempts.
  - Requires authentication to access.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

### Steps to Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t phishing-frontend .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 80:80 phishing-frontend
   ```
3. Open your browser and navigate to `http://localhost`.

## Additional Notes

- Ensure the **Phishing Attempt Management API** is running and accessible during development.
- Modify the API base URL in the code if needed to match the backend service location.
- Notifications will display for key events like login, registration, or error handling.
