import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import auhtRoutes from './routes/auth.route.js';

// Configuring dotenv to use the .env file
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log(error);
    });

const app = express();
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', auhtRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})