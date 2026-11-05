import express from 'express';
import { countVisit, getPublicStats } from '../controller/statsController.js';

const statsRouter = express.Router();

// public: only totals are returned, no personal data
statsRouter.post('/visit', countVisit);
statsRouter.get('/', getPublicStats);

export default statsRouter;