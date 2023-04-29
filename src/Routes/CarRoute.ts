import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post('/cars', (req, res, next) => new CarController(req, res, next).newCar());
carRoutes.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
carRoutes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
carRoutes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

export default carRoutes;