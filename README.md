# 🍲 Recipe Book Server

Backend server for the Recipe Book application, built with Express.js and MongoDB.  
Handles CRUD operations for recipes and serves as the API for the frontend client.

---

[🌐 View Live client Site](https://recipe-book-bff32.web.app/)
[🌐 View Live server Site](https://recipe-book-server-six.vercel.app)

---

## 🚀 Features

- Connects to MongoDB Atlas using environment variables for secure credentials
- RESTful API endpoints for:
  - Creating new recipes
  - Fetching all recipes or by ID
  - Fetching top recipes sorted by likes
  - Fetching recipes added by a specific user (by email)
  - Updating recipe details
  - Deleting recipes
- CORS enabled for frontend-backend communication
- JSON request body parsing

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- dotenv (for environment variables)

---

## 📋 API Endpoints

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------  |
| GET    | `/`                  | Test route, returns a welcome message  |
| POST   | `/recipes`           | Add a new recipe                       |
| GET    | `/recipes`           | Get all recipes                        |
| GET    | `/recipes/:id`       | Get a single recipe by ID              |
| GET    | `/TopRecipes`        | Get top 6 recipes sorted by likes      |
| GET    | `/user/:email`       | Get all recipes added by a user        |
| GET    | `/Ascending`         | Get all recipes by less likes          |
| GET    | `/Descending `       | Get all recipes most likes             |
| PATCH  | `/recipes`           | Update recipe like count               |
| PUT    | `/recipes/:id`       | Update recipe details                  |
| DELETE | `/recipes/:id`       | Delete a recipe by ID                  |

---

## 👤 Author

**Ibtisum Raian**  
Email: ibtisumraian@gmail.com  
GitHub: [Ibtisumraian](https://github.com/Ibtisumraian)

---