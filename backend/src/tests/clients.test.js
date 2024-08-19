const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { clientService } = require('../service/client.service');
const { clientController } = require('../controller/clients.controller')
const { app } = require('../app');
const { clientMock } = require('./mocks/client.mock');

const { expect } = chai;

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
