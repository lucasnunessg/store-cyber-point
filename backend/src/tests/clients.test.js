import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { clientService } from '../service';
import app from '../app';
import { clientMock } from './mocks/client.mock';

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Test controllers of clients', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('return client with success status', async function() {
    sinon.stub(clientService, 'getAllClient').resolves(clientMock);
    const response = await chai.request(app).get('/clients');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(clientMock);
  });
});
