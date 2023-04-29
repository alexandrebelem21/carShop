import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async newCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const getCars = await carODM.getAll();
    const allCars = getCars.map((car) => this.createCarDomain(car)); 
    return allCars;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    return this.createCarDomain(car);
  }
}

export default CarService;