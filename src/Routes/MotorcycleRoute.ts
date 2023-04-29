import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const mcRoutes = Router();

mcRoutes.post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).newMc());
// routes.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
// routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
// routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

export default mcRoutes;