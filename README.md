# WTWR (What to Wear?): Back End

## Project Overview

WTWR (What to Wear?) is a back-end server for a weather-based clothing recommendation app. This project focuses on:

- Setting up a Node.js Express server.

- Managing user authentication & authorization.

- Implementing CRUD operations for clothing items.

- Connecting to a MongoDB database.

- Enforcing security measures.

- Deploying the API on a remote server.

The goal is to provide an API that allows users to register, log in, and manage their wardrobe based on the weather conditions.


## Technologies & Tools Used

- **Backend Framework**: Express.js.

- **Database**: MongoDB & Mongoose ODM.

- **Authentication**: Temporary _id via Postman.

- **Validation**: Fully validated.

- **Error Handling**: Centralized middleware.

- **Environment Variables**: dotenv.

- **Development Tools**: Nodemon, ESLint.

- **Version Control**: Git & GitHub.

## API Endpoints

| Method | Endpoint         | Description            | Auth Required |
|--------|-----------------|------------------------|--------------|
| GET    | `/items`        | Get all clothing items | No          |
| POST   | `/items`        | Add a new clothing item| Yes         |
| DELETE | `/items/:itemId`| Remove a clothing item | Yes         |
| GET    | `/users`        | Get all users          | Yes         |
| GET    | `/users/:userId`| Get user by ID         | Yes         |
| PATCH  | `/users/me`     | Update user profile    | Yes         |
| POST   | `/signin`       | Login                  | No          |
| POST   | `/signup`       | Register               | No          |


## Links

- [GitHub Repository](https://github.com/Dmc4u/se_project_express)  
- [LinkedIn Profile](https://www.linkedin.com/in/moses-ademola-aina-a42652151/)

# Author 

Developed by Moses Ademola Aina. For questions, feel free to reach out! 🚀

April 2nd, 2025.

## TripleTen
