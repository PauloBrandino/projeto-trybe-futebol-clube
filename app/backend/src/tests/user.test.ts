import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');;

import { app } from '../app';
import SequelizeUser from '../../src/database/models/SequelizeUser';
import { invalidEmailLogin, loginUserNotRegistered, userRegistered, validLoginBody, validToken } from './mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para usuários', () => {
  describe('ROTA /login', () => {    
    it('Deve retornar um token ao logar com sucesso', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);
      const response = await chai.request(app).post('/login').send(validLoginBody);

      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.undefined;
    });

    it('Deve retornar um erro 400 ao não enviar uma senha', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const { password, ...sendData } = userRegistered;
      const response = await chai.request(app).post('/login').send(sendData);

      expect(response.status).to.be.equal(400);
    });

    it('Deve retornar um erro 400 ao não enviar um email', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const { email, ...sendData } = userRegistered;
      const response = await chai.request(app).post('/login').send(sendData);

      expect(response.status).to.be.equal(400);
    });

    it('Deve retornar um erro 401 ao enviar um email no formato incorreto', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const response = await chai.request(app).post('/login').send(invalidEmailLogin);

      expect(response.status).to.be.equal(401);
    });

    it('Deve retornar um erro 401 ao enviar uma senha no formato incorreto', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const response = await chai.request(app).post('/login').send(invalidEmailLogin);

      expect(response.status).to.be.equal(401);
    });

    it('Deve retornar um erro 401 ao enviar um logar com email não cadastrado', async function () {
      const userMock = SequelizeUser.build(userRegistered as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

      const response = await chai.request(app).post('/login').send(loginUserNotRegistered);

      expect(response.status).to.be.equal(401);
    }); 
    
    afterEach(sinon.restore);
  });

  describe('ROTA /login/role', function() {
    it('Deve retornar um erro 401 ao não enviar um token', async function () {
      const response = await chai.request(app).get('/login/role').set({ "Authorization": validToken});

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ role: "admin" })
    }); 

    it('Deve retornar um erro 401 ao não enviar um token', async function () {
      const response = await chai.request(app).get('/login/role').set({ "Authorization": ''});

      expect(response.status).to.be.equal(401);
    }); 

    it('Deve retornar um erro 401 ao não enviar um token', async function () {
      const response = await chai.request(app).get('/login/role').set({ "Authorization": 'dasdadsadas'});

      expect(response.status).to.be.equal(401);
    });
    
    afterEach(sinon.restore);
  })
});
