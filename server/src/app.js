import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth/auth.routes.js';

import claimRouter from './routes/claim/claim.routes.js';
import dealRouter from './routes/deals/deal.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/deal',dealRouter)
app.use("/api/claims",claimRouter)
export default app;
