import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createCarDomain(mc: IMotorcycle | null): Motorcycle | null {
    if (mc) {
      return new Motorcycle(mc);
    }
    return null;
  }

  public async newMotorcycle(mc: IMotorcycle) {
    const mcODM = new MotorcycleODM();
    const newMc = await mcODM.create(mc);

    return this.createCarDomain(newMc);
  }

  //   public async getAll() {
  //     const carODM = new CarODM();
  //     const getCars = await carODM.getAll();
  //     const allCars = getCars.map((car) => this.createCarDomain(car)); 
  //     return allCars;
  //   }

  //   public async getById(id: string) {
  //     const carODM = new CarODM();
  //     const car = await carODM.getById(id);
  //     return this.createCarDomain(car);
  //   }

//   public async updateCar(id: string, obj: ICar) {
//     const carODM = new CarODM();
//     const car = await carODM.update(id, obj);
//     return this.createCarDomain(car);
//   }
}

export default MotorcycleService;