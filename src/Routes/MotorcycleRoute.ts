import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const mcRoutes = Router();

mcRoutes.post('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).newMc());

mcRoutes.get('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).getAll());

mcRoutes.get('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).getById());
  
mcRoutes.put('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).update());

export default mcRoutes;