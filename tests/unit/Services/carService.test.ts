import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Teste para rota /cars', function () {
  const carInput: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };
  it('Deveria criar um novo Carro com SUCESSO', async function () {
    const carOutput: Car = new Car({ id: '644cbf6d793fefd3bb95d9d8', ...carInput });

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.newCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria buscar um carro por id com Sucesso', async function () {
    const carOutput: Car = new Car(
      {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const service = new CarService();
    const result = await service.getById('644cbf6d793fefd3bb95d9d8');

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria buscar todos carros com Sucesso', async function () {
    const carOutput = [new Car({
      model: 'Vectra',
      year: 1999,
      color: 'Green',
      buyValue: 12.300,
      doorsQty: 4,
      seatsQty: 5,
    }),
    new Car({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    })];
    sinon.stub(Model, 'find').resolves(carOutput);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria atualizar um carro pelo id com Sucesso', async function () {
    const carOutput: Car = new Car(
      {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    const update = sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
  
    const service = new CarService();
    await service.updateCar('644cbf6d793fefd3bb95d9d8', carInput);
  
    expect(update.calledOnce).to.be.deep.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});
