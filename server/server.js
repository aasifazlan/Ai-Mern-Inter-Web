import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import userRoutes from './routes/userRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
dotenv.config();
const app=express();

app.use(cors());

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);

const PORT=process.env.PORT || 5000

const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    }
  };
  
  startServer();
  