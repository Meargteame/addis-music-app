# 🎵 Addis Music App - Full Stack

<div align="center">
  <img src="./images/hero_screen.jpg" alt="Addis Music App Hero" width="100%" />
  
  <p align="center">
    <em>A modern, full-stack music library management application showcasing Ethiopian music culture.</em>
  </p>

  <p align="center">
    <a href="#-about">About</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-technologies">Technologies</a> •
    <a href="#-setup-and-installation">Setup</a> •
    <a href="#-api-endpoints">API</a> •
    <a href="#-ai-usage">AI Usage</a>
  </p>

  <br />

  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4+-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Webpack-5+-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" />
</div>

---

## 📖 About

This project is a full-stack music library application built as part of the **Addis Software Test Project**. It features a React frontend and a Node.js/Express backend, demonstrating a complete modern web application architecture. The application is designed to manage a collection of Ethiopian music, offering a clean, responsive interface and a robust backend API.

**Key Highlights:**
- ✨ **Full-Stack Architecture**: Decoupled React frontend and Node.js backend.
- 🎶 **Complete CRUD Operations**: Manage songs with a persistent MongoDB database.
- 🎨 **Beautiful UI**: A modern, responsive interface with an Ethiopian-themed design.
- 📊 **Real-time Statistics**: Analytics dashboard powered by backend aggregations.
- 🚀 **Custom Build Process**: Webpack configuration tailored for this project without Create React App.

---

## 🏗️ Architecture

The application is structured as a monorepo with two main components:

1.  **Frontend (`/`)**: A React single-page application (SPA) that provides the user interface. It is built with Webpack and uses Redux for state management. During development, it uses a proxy to communicate with the backend API.

2.  **Backend (`/backend`)**: A Node.js and Express.js server that provides a RESTful API for the frontend. It connects to a MongoDB Atlas database for data persistence and handles all business logic.

<div align="center">
  <img src="https://i.imgur.com/Vciq2uJ.png" alt="Application Architecture Diagram" width="700px" />
</div>

---

## 🛠 Technologies

### Frontend Stack
| Technology | Purpose |
|------------|---------|
| **React** | Component-based UI framework |
| **Redux Toolkit** | Global state management |
| **Redux-Saga** | Side effects and asynchronous operations |
| **Emotion** | CSS-in-JS styling and theming |
| **Webpack 5** | Module bundling and development server |
| **Babel** | JavaScript transpilation |

### Backend Stack
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime for the server |
| **Express.js** | Web framework for building the REST API |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | Object Data Modeling (ODM) for MongoDB |
| **Dotenv** | Environment variable management |

---

## ⚡ Setup and Installation

### Prerequisites
- Node.js 16+ and npm 8+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Meargteame/addis-music-app.git
    cd addis-music-app
    ```

2.  **Set up the Backend:**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install backend dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `backend` directory.
    - Add your MongoDB connection string to the `.env` file. **Ensure your IP address is whitelisted in MongoDB Atlas.**
      ```env
      # backend/.env
      MONGO_URI=your_mongodb_connection_string_here
      ```

3.  **Set up the Frontend:**
    - Navigate back to the root directory:
      ```bash
      cd ..
      ```
    - Install frontend dependencies:
      ```bash
      npm install
      ```

### Running the Application

You need to run two processes in separate terminals: the backend server and the frontend development server.

1.  **Start the Backend Server:**
    - In a terminal, from the `addis-music-app/backend` directory, run:
      ```bash
      npm run dev
      ```
    - The backend API will be running at `http://localhost:5050`.

2.  **Start the Frontend Server:**
    - In a second terminal, from the root `addis-music-app` directory, run:
      ```bash
      npm start
      ```
    - The frontend application will be available at `http://localhost:3000`. The app is configured to proxy API requests to the backend.

---

## 🌐 API Endpoints

The backend provides a RESTful API. The base URL is `/api`.

### Songs API
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/songs` | List all songs. Supports `genre` and `search` queries. |
| `GET` | `/api/songs/:id` | Get a single song by its ID. |
| `POST` | `/api/songs` | Create a new song. |
| `PUT` | `/api/songs/:id` | Update an existing song. |
| `DELETE` | `/api/songs/:id` | Delete a song. |

### User & Stats API
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user` | Get the main user's profile. |
| `GET` | `/api/stats` | Get application-wide statistics. |
| `GET` | `/api/genres` | Get a list of all available genres. |
| `GET` | `/ping-db` | A test route to check database connectivity. |

---

## 🤖 AI Usage & Code Verification

This project utilized AI assistance (GitHub Copilot) for bootstrapping, boilerplate generation, and debugging.

- **AI-Generated Code (≈40%):**
  - Initial Express.js backend structure (routes, controllers, models).
  - Redux Saga boilerplate for API calls.
  - Mongoose schema definitions and connection logic.
  - Debugging assistance for Webpack and database connection issues.

- **Human-Written Code (≈60%):**
  - Core React components and application UI/UX.
  - Business logic and state management integration.
  - Custom Webpack configuration and build process setup.
  - Refactoring and customization of all AI-generated code to fit project requirements.
  - Final architecture and integration of frontend and backend.

Every piece of AI-generated code was reviewed, customized, and tested to ensure it met the project's standards for quality, performance, and maintainability.

---

## 📁 Project Structure

```
addis-music-app/
├── 📁 backend/                # Node.js & Express Backend
│   ├── 📁 controllers/       # API logic
│   ├── 📁 db/                # Database connection & mock data
│   ├── 📁 models/           # Mongoose schemas
│   ├── 📁 routes/           # API routes
│   ├── .env                  # Environment variables (MUST BE CREATED)
│   ├── index.js              # Backend entry point
│   └── package.json          # Backend dependencies
│
├── 📁 public/                 # Static assets for frontend
├── 📁 src/                    # React frontend source
│   ├── 📁 api/                # API utilities
│   ├── 📁 app/                # Redux store setup
│   ├── 📁 components/         # React components
│   ├── 📁 features/           # Redux slices & sagas
│   ├── 📁 styles/             # Global styles & theme
│   ├── App.jsx               # Main application component
│   └── index.js              # Frontend entry point
│
├── 📄 webpack.config.js      # Custom Webpack configuration
├── 📄 package.json           # Frontend dependencies and scripts
└── 📄 README.md               # This file
```

---

## 🤝 Contributing

This project is for evaluation purposes, but contributions are welcome as a demonstration of collaboration.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git commit -m "feat: add your feature description"

# Push and create a pull request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is part of the Addis Software Test Project and is intended for evaluation purposes.

---

## 👨‍💻 Author

**Mearg Teame**
- GitHub: [@Meargteame](https://github.com/Meargteame)
- Project: [Addis Music App](https://github.com/Meargteame/addis-music-app)

---

<div align="center">
  <p>
    <strong>Built with ❤️ for Ethiopian Music Culture</strong>
  </p>
  <p>
    <em>Showcasing modern frontend development skills through cultural appreciation</em>
  </p>
</div>
