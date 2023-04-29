import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(mc: IMotorcycle | null): Motorcycle | null {
    if (mc) {
      return new Motorcycle(mc);
    }
    return null;
  }

  public async newMotorcycle(mc: IMotorcycle) {
    const mcODM = new MotorcycleODM();
    const newMc = await mcODM.create(mc);

    return this.createMotorcycleDomain(newMc);
  }

  public async getAll() {
    const mcODM = new MotorcycleODM();
    const getMc = await mcODM.getAll();
    const allMc = getMc.map((mc) => this.createMotorcycleDomain(mc)); 
    return allMc;
  }

  public async getById(id: string) {
    const mcODM = new MotorcycleODM();
    const mc = await mcODM.getById(id);
    return this.createMotorcycleDomain(mc);
  }

  public async updateMc(id: string, obj: IMotorcycle) {
    const mcODM = new MotorcycleODM();
    const mc = await mcODM.update(id, obj);
    return this.createMotorcycleDomain(mc);
  }
}

export default MotorcycleService;