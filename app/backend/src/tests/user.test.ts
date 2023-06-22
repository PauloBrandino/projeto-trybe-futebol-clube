import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para usuários', () => {
  let chaiHttpResponse: Response;
  describe('ROTA /login', () => {
    beforeEach(async () => {
      sinon
        .stub(SequelizeTeam, 'findAll')
        .resolves(mockListTeam as SequelizeTeam[]);
    });

    afterEach(() => {
      (SequelizeTeam.findAll as sinon.SinonStub).restore();
    });
  
    it('', async function() {  
      chaiHttpResponse = await chai.request(app).get('/teams');      
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockListTeam);
    });
  });
  
  describe('ERROS ROTA /teams/:id', () => {
    beforeEach(async () => {
      sinon
        .stub(SequelizeTeam, 'findByPk')
        .resolves(null);
    });

    afterEach(() => {
      (SequelizeTeam.findByPk as sinon.SinonStub).restore();
    });

    it('Deve retornar mensagem de não encontrado se o time não existe', async function () {
      chaiHttpResponse = await chai.request(app).get('/teams/1000');

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body.message).to.equal('Team 1000 not found')
    });
  })
});
