# 🌳 Tag Tree Full Stack Application

A full stack web application that allows users to create, edit, and manage a **nested tree structure of tags** with dynamic UI rendering and backend persistence.

---

## 🚀 Features

* Recursive tree rendering using React
* Add child nodes dynamically
* Edit node data and tag names
* Collapse / expand nodes
* Export tree structure as JSON
* Save new trees to backend (POST)
* Update existing trees (PUT)
* Fetch and display all saved trees (GET)
* Clean JSON structure (only `name`, `data`, `children`)

---

## 🧠 Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* Basic CSS / Inline styling

**Backend**

* FastAPI (Python)

**Database**

* In-memory storage (can be extended to PostgreSQL / MySQL)

---

## 📂 Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── TagView.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── main.py
│   └── requirements.txt
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd project-root
```

---

### 2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

### 3️⃣ Backend Setup

```
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

---

## 🔌 API Endpoints

### GET /trees

Fetch all saved tree structures

### POST /trees

Save a new tree

### PUT /trees/{id}

Update an existing tree

---

## 🌲 Tree Data Structure

Each node follows this format:

```json
{
  "name": "root",
  "children": [
    {
      "name": "child1",
      "data": "Hello"
    }
  ]
}
```

Rules:

* A node can have either:

  * `data` (string)
  * OR `children` (array)
* Not both at the same time

---

## 🧩 Key Concepts

### Recursive Rendering

The UI is built using a recursive component (`TagView`) that renders nested child nodes dynamically.

### State Management

The entire tree is maintained as a single state object and updated via controlled inputs.

### Data Cleaning

Before sending data to backend, the tree is recursively cleaned to include only:

* `name`
* `data`
* `children`

### Backend Persistence

FastAPI handles:

* Saving trees
* Updating trees
* Fetching all trees

---

## ✨ Bonus Features

* Editable tag names (click to edit + press Enter)
* Collapsible tree nodes
* Dynamic UI updates on every change

---

## 📸 Demo (Optional)

*Add screenshots or screen recordings here*

---

## 📌 Future Improvements

* Use PostgreSQL / MongoDB for persistent storage
* Add authentication (user-specific trees)
* Improve UI with Tailwind CSS
* Drag-and-drop tree editing
* Add delete node functionality

---

## 📄 License

This project is for educational and assignment purposes.

---

## 💡 Author

Shubham Singh

---


