# WTWR (What to Wear?) — Back End

## 📚 Project Overview

**WTWR (What to Wear?)** is the back-end server for a weather-based clothing recommendation application.

This project focuses on:

- Building a secure and scalable **Node.js** server with **Express**.
- Managing **user authentication** and **authorization** using **JWT**.
- Implementing **CRUD operations** for clothing items.
- Connecting to a **MongoDB** database using **Mongoose**.
- Applying best practices for **validation**, **error handling**, **security headers**, and **rate limiting**.
- Deploying the API on a remote server with **Nginx** and **PM2** for process management and crash recovery.

The goal is to provide an API that allows users to **register**, **log in**, **manage their wardrobe**, and **get clothing recommendations** based on the weather.

---

## ⚙️ Technologies & Tools Used

- **Backend Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Celebrate (Joi)
- **Security Enhancements**:
  - Helmet (sets secure HTTP headers)
  - express-rate-limit (limits repeated requests)
- **Logging**: Winston and express-winston
- **Error Handling**: Centralized error middleware
- **Environment Variables**: dotenv
- **Process Management**: PM2
- **Web Server**: Nginx (for production reverse proxy)
- **Development Tools**: Nodemon, ESLint (Airbnb + Prettier)
- **Version Control**: Git and GitHub

---

## 🔥 API Endpoints

| Method | Endpoint                  | Description                       | Auth Required |
|--------|----------------------------|-----------------------------------|---------------|
| GET    | `/items`                   | Retrieve all clothing items       | No            |
| POST   | `/items`                   | Create a new clothing item        | Yes           |
| DELETE | `/items/:itemId`            | Delete a clothing item            | Yes           |
| PUT    | `/items/:itemId/likes`      | Like a clothing item              | Yes           |
| DELETE | `/items/:itemId/likes`      | Dislike a clothing item           | Yes           |
| GET    | `/users/me`                 | Get current user profile          | Yes           |
| PATCH  | `/users/me`                 | Update current user profile       | Yes           |
| POST   | `/signup`                   | Register a new user               | No            |
| POST   | `/signin`                   | Authenticate an existing user     | No            |
| GET    | `/crash-test`               | Crash test endpoint (for PM2 test) | No            |

---

## 🚀 Deployment Information

- **Frontend Domain**: [https://mywears.crabdance.com](https://mywears.crabdance.com)
- **Backend API Domain**: [https://api.mywears.crabdance.com](https://api.mywears.crabdance.com)

### ⚡ Crash Test

To simulate a crash and verify PM2 automatically restarts the backend server:

```bash
GET https://api.mywears.crabdance.com/crash-test

    ```
  - The server will intentionally crash.
  - PM2 will automatically restart the server after a crash.

---

## Useful Links

- [GitHub Repository](https://github.com/Dmc4u/se_project_express)
- [LinkedIn Profile](https://www.linkedin.com/in/moses-ademola-aina-a42652151/)

---

## Author

Developed by **Moses Ademola Aina**.  
For questions or collaboration, feel free to reach out! 🚀

April 26th, 2025  
TripleTen Full-Stack Web Development Program

