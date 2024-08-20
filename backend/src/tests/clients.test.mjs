import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clientController } from '../controller/clients.controller';
import { app } from '../app';
import { clientMock } from './mocks/client.mock';

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Test controllers of clients', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('retorna cliente com status de sucesso', async function() {
    sinon.stub(clientController, 'getAllClient').resolves(clientMock);
    const response = await chai.request(app).get('/clients');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(clientMock);
  });
});
