import express from 'express';
import carRoute from './Routes/CarRoute';

const app = express();
app.use(express.json());
app.use(carRoute);
export default app;
