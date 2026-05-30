import express from 'express';
import cors from 'cors';
import weatherRoutes from '../routes/weatherRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/weather', weatherRoutes);

// Health check route
app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "MeteoFlow ETL API is running"
    });
});

export default app;