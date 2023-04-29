import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async newMc() {
    const mc: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMc = await this.service.newMotorcycle(mc);
      return this.res.status(201).json(newMc);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const mcs = await this.service.getAll();
    return this.res.status(200).json(mcs); 
  }

  public async getById() {
    const { id } = this.req.params;
    if (isValidObjectId(id)) {
      const mc = await this.service.getById(id);
      return mc ? this.res.status(200).json(mc) 
        : this.res.status(404).json({ message: 'Motorcycle not found' }); 
    } return this.res.status(422).json({ message: 'Invalid mongo id' });
  }

  public async update() {
    const { id } = this.req.params;
    const obj = this.req.body;
    
    if (isValidObjectId(id)) {
      const mc = await this.service.updateMc(id, obj);
      if (mc !== null) {
        return this.res.status(200).json(mc);
      } 
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    } 
    return this.res.status(422).json({ message: 'Invalid mongo id' });
  }
}

export default MotorcycleController;