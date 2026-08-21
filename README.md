# 🤖 AI Task Manager

An AI-powered task management system that allows administrators to manage users, assign tasks, upload knowledge documents, and monitor platform activity.

Users can register, log in, view assigned tasks, search information from uploaded documents using AI-powered semantic search, and update their task status.

---

## ✨ Features

### 👨‍💼 Admin

- Admin authentication using JWT
- View registered users
- Assign tasks to users
- View assigned task details
- Upload PDF and TXT documents
- Automatic text extraction
- Document chunking
- Vector embeddings using Sentence Transformers
- Semantic search using ChromaDB
- View analytics and dashboard statistics
- Monitor completed and pending tasks

### 👤 User

- User signup and login
- Secure JWT authentication
- View assigned tasks
- Search information using AI-powered semantic search
- View task status
- Mark tasks as completed
- View personal dashboard statistics

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS

### Backend

- FastAPI
- Python
- SQLAlchemy
- JWT Authentication
- Passlib / Bcrypt

### Database

- MySQL

### AI / Vector Search

- Sentence Transformers
- all-MiniLM-L6-v2
- ChromaDB

---

## 📂 Project Structure

```text
ai-task-manager/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── api/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project folder:

```bash
cd ai-task-manager
```

---

## 2️⃣ Backend Setup

Move to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your MySQL database connection.

Example:

```text
DATABASE_URL=mysql+pymysql://username:password@localhost/database_name
```

Start the FastAPI server:

```bash
fastapi dev app/main.py
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 3️⃣ Frontend Setup

Open another terminal and move to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Open the URL shown in the terminal.

Usually:

```text
http://localhost:5173
```

---

# 🔐 Authentication

The application uses JWT authentication.

After successful login:

1. Backend validates user credentials.
2. Backend generates a JWT token.
3. The frontend stores the token.
4. The token is sent with protected API requests.
5. Access is controlled based on the user's role.

Roles:

- **Admin**
- **User**

---

# 🧠 AI Search Workflow

```text
Admin uploads PDF/TXT
        ↓
Text Extraction
        ↓
Text Chunking
        ↓
Sentence Transformer Embeddings
        ↓
ChromaDB Vector Storage
        ↓
User enters a question
        ↓
Semantic Similarity Search
        ↓
Relevant Document Results
```

---

# 📸 Output Screenshots

## 🏠 Home Page

![Home Page](screenshots/ai_task_manager/homepagepart1.png)
![Home Page](screenshots/ai_task_manager/homepagepart2.png)
![Home Page](screenshots/ai_task_manager/homepagepart3.png)


---

## 🔐 Login Page

![Login Page](screenshots/ai_task_manager/loginpage.png)

---

## 📝 User Signup

![Signup Page](screenshots/ai_task_manager/signuppage.png)

---

## 📊 Admin Dashboard

![Admin Dashboard](screenshots/admin_dashboard_page.png)

---

## 👤 User Dashboard

![User Dashboard](screenshots/user_dashboard.png)

---

## 👥 User Management

![Users](screenshots/task_assign_user.png)


---

## 📋 Task Assignment

![Assign Task](screenshots/assign_task.png)

---

## ✅ Tasks

![Tasks](screenshots/tasks.png)

---

## 📄 Documents

![Documents](screenshots/documents_upload.png)

---

## 🔍 AI-Powered Search

![AI Search](screenshots/ai_search_results.png)

---

## 📈 Analytics

![Analytics](screenshots/analytics.png)

---
## Backend endpoints 
![Backend Endpoints](screenshots/backend_endpoints.png)



# 🚀 Future Improvements

- Email notifications for assigned tasks
- Password reset functionality
- Task deadlines and priority levels
- Improved document access control
- Better AI answer generation using an LLM
- Cloud deployment
- Docker support

---

# 👩‍💻 Author

Lavanya Karra

Python Backend Developer | Full Stack Developer
