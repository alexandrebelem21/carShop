import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Teste para rota /motorcycles', function () {
  const honda = 'Honda Cb 600f Hornet';
  const mcInput: IMotorcycle = {
    model: honda,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };
  it('Deveria criar uma moto nova com SUCESSO', async function () {
    const mcOutput: Motorcycle = new Motorcycle({ id: '634852326b35b59438fbea2f', ...mcInput });

    sinon.stub(Model, 'create').resolves(mcOutput);

    const service = new MotorcycleService();
    const result = await service.newMotorcycle(mcInput);

    expect(result).to.be.deep.equal(mcOutput);
  });

  it('Deveria buscar uma moto por id com Sucesso', async function () {
    const mcOutput: Motorcycle = new Motorcycle(
      {
        model: honda,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'findOne').resolves(mcOutput);

    const service = new MotorcycleService();
    const result = await service.getById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(mcOutput);
  });

  it('Deveria buscar todas motos com Sucesso', async function () {
    const mcOutput = [new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }),
    new Motorcycle(
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ),
    ];
    sinon.stub(Model, 'find').resolves(mcOutput);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mcOutput);
  });

  it('Deveria atualizar uma moto pelo id com Sucesso', async function () {
    const mcOutput: Motorcycle = new Motorcycle(
      {
        id: '634852326b35b59438fbea2f',
        model: honda,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    const update = sinon.stub(Model, 'findByIdAndUpdate').resolves(mcOutput);
  
    const service = new MotorcycleService();
    await service.updateMc('634852326b35b59438fbea2f', mcInput);
  
    expect(update.calledOnce).to.be.deep.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});