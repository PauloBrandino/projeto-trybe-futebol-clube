import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { mockListTeam, mockTeam } from './mocks/mockTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para times', () => {
  let chaiHttpResponse: Response;
  describe('ROTA /teams', () => {
    beforeEach(async () => {
      sinon
        .stub(SequelizeTeam, 'findAll')
        .resolves(mockListTeam as SequelizeTeam[]);
    });

    afterEach(() => {
      (SequelizeTeam.findAll as sinon.SinonStub).restore();
    });
  
    it('Deve retornar um array com todos os times cadastrados', async function() {  
      chaiHttpResponse = await chai.request(app).get('/teams');      
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockListTeam);
    });
  });

  describe('ROTA /teams/:id', () => {
    beforeEach(async () => {
      sinon
        .stub(SequelizeTeam, 'findByPk')
        .resolves(mockTeam as SequelizeTeam);
    });

    afterEach(() => {
      (SequelizeTeam.findByPk as sinon.SinonStub).restore();
    });

    it('Deve retornar um objeto com o time corretamente localizado', async function() {  
      chaiHttpResponse = await chai.request(app).get('/teams/2');
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockTeam);
    });
  })
});
