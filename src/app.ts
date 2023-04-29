import express from 'express';
import carRoute from './Routes/CarRoute';
import mcRoutes from './Routes/MotorcycleRoute';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(mcRoutes);
export default app;
