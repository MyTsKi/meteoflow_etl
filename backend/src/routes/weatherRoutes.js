import express from 'express';

import { GetWeather } from '../controllers/weatherController.js';

const router = express.Router();

// Set up route for getting weather history
router.get('/', GetWeather);

export default router;