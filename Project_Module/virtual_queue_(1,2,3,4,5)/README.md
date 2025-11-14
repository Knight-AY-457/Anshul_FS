[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CE8vDSLA)


# 🚀 Full Stack Project (React + Spring Boot + MySQL)

This project is a complete full stack web application built using React (JavaScript) for the frontend, Spring Boot (Java) for the backend, and MySQL as the database. Follow the below steps carefully to set up and run the entire project on your system.

---

## 🧩 Prerequisites

Make sure the following software is installed on your computer before you begin:

- Node.js (version 18 or above)
- npm (comes with Node.js)
- Java JDK (version 17 or 21)
- Apache Maven (latest)
- MySQL Server (version 8 or above)
- Git

---

## ⚙️ Step-by-Step Setup Instructions

### 1️⃣ Clone the Repository

Open your terminal and run the following command to clone the project:
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git


Then navigate into the project folder:

cd <your-repo-name>

2️⃣ Create the MySQL Database

Open MySQL Command Line Client or MySQL Workbench.

Create a new database using this command:

CREATE DATABASE projectdb;


Keep MySQL running while you set up the backend.

3️⃣ Configure the Backend (Spring Boot)

Open the file backend/src/main/resources/application.properties.

Replace the contents with the following configuration:

spring.datasource.url=jdbc:mysql://localhost:3306/projectdb
spring.datasource.username=root
spring.datasource.password=0123987
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080


Save the file.

4️⃣ Run the Backend Server

In your terminal, navigate to the backend folder:

cd backend


Build and run the backend using Maven:

mvn clean install
mvn spring-boot:run


After a few moments, the backend will start and run at:

http://localhost:8080


Keep this terminal running.

5️⃣ Set Up and Run the Frontend (React)

Open a new terminal window and navigate to the frontend directory:

cd frontend


Install all required dependencies:

npm install


Once installation is complete, start the React app:

npm start


This will open your frontend in the browser at:

http://localhost:3000

6️⃣ Connect Frontend and Backend

Check inside your frontend project for a configuration file such as src/api.js, src/config.js, or a .env file.

If it exists, make sure the API base URL is pointing to your backend:

export const API_BASE_URL = "http://localhost:8080";


or in .env:

REACT_APP_API_BASE_URL=http://localhost:8080


Save the file and restart the frontend if necessary.

7️⃣ Verify the Connection

Make sure your backend terminal shows logs when you perform frontend actions that call APIs.

You can also test the backend directly in your browser by visiting:

http://localhost:8080/api/health


(if you have created a test endpoint).

8️⃣ Folder Structure Overview

Your project structure should look like this:

project/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/ (controllers, services, models)
│   │   │   └── resources/ (application.properties)
│   ├── pom.xml
│   └── README.md
│
└── README.md