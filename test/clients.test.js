const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/index'); // Supondo que seu servidor esteja exportado de 'index.js'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Testar API de Clientes', () => {
  it('Deve retornar status 200 e lista de clientes', (done) => {
    chai.request(app)
      .get('/clients')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
