# Phishing Management and Simulation Project

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Build the Shared Module](#2-build-the-shared-module)
- [Running the Project with Docker Compose](#running-the-project-with-docker-compose)
  - [1. Configure Environment Variables](#1-configure-environment-variables)
  - [2. Start Docker Compose](#2-start-docker-compose)
- [Accessing the Application](#accessing-the-application)
- [Stopping the Services](#stopping-the-services)
- [Troubleshooting](#troubleshooting)
- [Additional Information](#additional-information)
- [Contact](#contact)

## Overview

This project consists of two backend APIs built with NestJS and a frontend application developed using Vite and React. The backend services manage phishing attempts and simulations, while the frontend provides a user interface for interacting with these services. 

## Folder Structure

```txt
project-root/
│
├── backend/
│   ├── phishing-attempt-management/  # NestJS API for managing phishing attempts
│   └── phishing-simulation/          # NestJS API for phishing simulations
│
├── frontend/                          # Vite React frontend application
│
├── docker-compose.yml                 # Docker Compose configuration
│
└── README.md                          # Project documentation
```

## Prerequisites

Before running the project using Docker Compose, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Project with Docker Compose

Docker Compose simplifies the process of running multiple Docker containers for your application. Follow the steps below to start the project using Docker Compose.

### 1. Configure Environment Variables

Create a `.env` file in directory of the projects with the following environment variables:

```env
# Frontend - /frontend/.env
VITE_BASE_URL=http://localhost:3000

# Phishing Attempt Management Service - /backend/phishing-attempt-management/.env
JWT_SECRET=security_key
SEND_EMAIL_URI=http://localhost:3001/phishing/send
MONGO_URI=mongodb://localhost:27017/local
NODE_ENV=DEVELOPMENT
PHISHING_LINK=http://localhost:3000/phishing-attempts/

# Phishing Simulation Service - /backend/phishing-simulation/.env
NODE_ENV=DEVELOPMENT
JWT_SECRET=security_key
MONGO_URI=mongodb://localhost:27017/local
EMAIL_HOST=smtp.example.email
EMAIL_PORT=587
EMAIL_USER=user@example.email
EMAIL_USER_PASSWORD=SOME_PASSWORD

# Database
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=adminpassword
```

> **Note:** Ensure that sensitive information like `JWT_SECRET` and `EMAIL_USER_PASSWORD` are secured and not exposed in public repositories. Consider using Docker secrets or environment variable management tools for enhanced security in production environments.

### 2. Start Docker Compose

From the root directory of the project, run:

```bash
docker-compose up --build
```

This command will build the Docker images and start all the services defined in the `docker-compose.yml` file.

## Accessing the Application

Once all services are up and running, you can access the application as follows:

- **Frontend Application:** [http://localhost](http://localhost)
- **Phishing Attempt Management API:** [http://localhost:3000](http://localhost:3000)
- **Phishing Simulation API:** [http://localhost:3001](http://localhost:3001)

> *Adjust the ports as defined in your `docker-compose.yml` if they differ.*

## Stopping the Services

To stop all running services, press `Ctrl + C` in the terminal where Docker Compose is running. To remove the containers, networks, and volumes created by Docker Compose, run:

```bash
docker-compose down
```

## Troubleshooting

### Ports Already in Use:

If you encounter errors about ports being already in use, ensure that no other applications are running on the same ports. You can modify the ports in the `docker-compose.yml` file if necessary.

### Database Connection Issues:

Ensure that MongoDB is running correctly and that the `MONGO_URI` is correctly configured. Check the logs for the MongoDB container using:

```bash
docker-compose logs mongo
```

### Email Service Issues:

- Verify that the SMTP credentials are correct.
- Ensure that the credentials provided in the `.env` file are valid.

### Build Failures:

- Ensure that all dependencies are correctly installed.
- Rebuild the Docker images with:

```bash
docker-compose build --no-cache
```

## Additional Information

- Set up CI/CD pipelines to automate testing and deployment processes.
- Utilize platforms like GitHub Actions, GitLab CI, or Jenkins.

## Contact

For any issues or inquiries, please contact [senan200125@gmail.com](mailto:senan200125@gmail.com).

*This README was generated to assist in setting up and running the Phishing Management and Simulation Project using Docker Compose.*

