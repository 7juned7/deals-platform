// src/server.js
import dotenv from "dotenv";
dotenv.config();
import app from './app.js';
import connectDB from './config/connectDB.js';

const PORT = process.env.PORT || 5000;
connectDB
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
