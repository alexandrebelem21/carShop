import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async newCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.newCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAll();
    return this.res.status(200).json(cars); 
  }

  public async getById() {
    const { id } = this.req.params;
    if (isValidObjectId(id)) {
      const car = await this.service.getById(id);
      return car ? this.res.status(200).json(car) 
        : this.res.status(404).json({ message: 'Car not found' }); 
    } return this.res.status(422).json({ message: 'Invalid mongo id' });
  }
}

export default CarController;