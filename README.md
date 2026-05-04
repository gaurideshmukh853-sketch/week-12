# week-12
# 🌐 Full Stack Social Media Platform

A production-ready social media platform with real-time features, file uploads, authentication, security, and testing.

---

## 🚀 Tech Stack

**Frontend:** React, Context API, Axios, Socket.io-client
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Real-time:** Socket.io
**File Uploads:** Cloudinary
**Auth:** JWT (Access + Refresh Tokens)
**Testing:** Jest, Supertest
**Security:** Helmet, Rate Limiting, Input Validation
**Deployment:** Docker + CI/CD (GitHub Actions)

---

## 📁 Project Structure

```
project-root/
│
├── client/               # React Frontend
├── server/               # Node Backend
├── .github/workflows/    # CI/CD pipelines
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```
git clone <your-repo-url>
cd project-root
```

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

Run server:

```
npm run dev
```

### 3️⃣ Frontend Setup

```
cd client
npm install
npm start
```

---

## 🔥 Features

### ✅ Authentication

* Register/Login
* JWT with refresh tokens
* Protected routes

### 💬 Real-time

* Chat system
* Live notifications

### 📸 File Upload

* Image & video upload (Cloudinary)

### 🧪 Testing

* Unit tests (Jest)
* API testing (Supertest)

### ⚡ Performance

* Lazy loading
* Code splitting
* Caching

### 🔐 Security

* Rate limiting
* Helmet headers
* Input validation

---

## 📡 Backend Code (Starter)

### `server/index.js`

```js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('API Running');
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
```

---

## 🔐 Auth Middleware

```js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
```

---

## ☁️ Cloudinary Upload

```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (file) => {
  return await cloudinary.uploader.upload(file, {
    folder: 'social_media'
  });
};
```

---

## 💻 Frontend Socket Example

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('receiveMessage', (data) => {
  console.log(data);
});

const sendMessage = () => {
  socket.emit('sendMessage', { text: 'Hello' });
};
```

---

## 🧪 Testing Example

```js
const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('should return API running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
```

---

## ⚡ Performance Tips

* Use React.lazy()
* Enable gzip compression
* Cache API responses (Redis optional)

---

## 🔐 Security Tips

* Use Helmet middleware
* Sanitize inputs (validator.js)
* Enable rate limiting

---

## 🚀 Deployment

### Docker

```
docker build -t social-app .
docker run -p 5000:5000 social-app
```

### CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`

```yaml
name: Deploy App
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
```

---

## 📌 Future Improvements

* Follow system
* Stories feature
* Video streaming
* Push notifications

---

## 👨‍💻 Author

Your Name

---

## ⭐ Contribute

Pull requests are welcome!
