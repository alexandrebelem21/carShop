import { Request, Response, NextFunction } from 'express';
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

  //   public async getAll() {
  //     const cars = await this.service.getAll();
  //     return this.res.status(200).json(cars); 
  //   }

  //   public async getById() {
  //     const { id } = this.req.params;
  //     if (isValidObjectId(id)) {
  //       const car = await this.service.getById(id);
  //       return car ? this.res.status(200).json(car) 
  //         : this.res.status(404).json({ message: 'Car not found' }); 
  //     } return this.res.status(422).json({ message: 'Invalid mongo id' });
  //   }

  //   public async update() {
  //     const { id } = this.req.params;
  //     const obj = this.req.body;
    
//     if (isValidObjectId(id)) {
//       const car = await this.service.updateCar(id, obj);
//       if (car !== null) {
//         return this.res.status(200).json(car);
//       } 
//       return this.res.status(404).json({ message: 'Car not found' });
//     } 
//     return this.res.status(422).json({ message: 'Invalid mongo id' });
//   }
}

export default MotorcycleController;