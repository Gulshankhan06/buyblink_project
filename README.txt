BuyBlink - Quick Setup

Folders created:
- frontend: React app (run with npm install, npm start)
- backend: Node + Express + MongoDB (run with npm install, npm start)
- admin: simple React admin UI (optional)

Steps:
1) Open three terminals in VS Code.
2) Frontend:
   cd frontend
   npm install
   npm start
3) Backend:
   cd backend
   npm install
   create .env from .env.example and set MONGO_URI
   npm start
   (optional) visit http://localhost:5000/api/products/seed to create demo products
4) Admin:
   cd admin
   npm install
   npm start

Note: This is a starter template. Replace placeholder images and extend features as needed.
