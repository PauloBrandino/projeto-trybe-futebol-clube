import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { Response } from 'superagent';
import { createdMatch, dataToCreate, inProgress, listMatches } from './mocks/mockMatches';
import { validToken } from './mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para Partidas', function() {
    let chaiHttpResponse: Response;
    describe('ROTA /matches', async function() {
        beforeEach(async () => {
           sinon
            .stub(SequelizeMatch, 'findAll')
            .resolves(listMatches as unknown as SequelizeMatch[]);
         });
      
        afterEach(() => {
          (SequelizeMatch.findAll as sinon.SinonStub).restore();
        });
        
        it('Deve retornar uma lista com as informações da partida', async function(){
            chaiHttpResponse = await chai.request(app).get('/matches');      
  
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(listMatches);
        });
    });

    describe('ROTA /matches com query string', function() {
        beforeEach(async () => {
            sinon
             .stub(SequelizeMatch, 'findAll')
             .resolves(inProgress as unknown as SequelizeMatch[]);
          });
       
         afterEach(() => {
           (SequelizeMatch.findAll as sinon.SinonStub).restore();
         });

        it('Deve retornar uma lista com as informações de partidas já finalizadas', async function () {
            chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
            
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(inProgress);
        });
    });

    describe('ROTA /matches/:id/finish', function() {       
        beforeEach(async () => {
            sinon
             .stub(SequelizeMatch, 'update')
             .resolves([1]);
          });
       
         afterEach(() => {
           (SequelizeMatch.update as sinon.SinonStub).restore();
         });

        it('Deve retornar um erro 401 ao não enviar um token', async function () {
            const response = await chai.request(app).patch('/matches/1/finish').set({ "Authorization": ''});
      
            expect(response.status).to.be.equal(401);
          }); 
      
        it('Deve retornar um erro 401 ao não enviar um token inválido', async function () {
          const response = await chai.request(app).patch('/matches/1/finish').set({ "Authorization": 'dasdadsadas'});

          expect(response.status).to.be.equal(401);
        });

        it('Deve setar uma partida como finalizada', async function () {
            chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set({ "Authorization": validToken });

            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished'});
        });
    });

    describe('ROTA /matches/:id', function() {       
      beforeEach(async () => {
        sinon
          .stub(SequelizeMatch, 'update')
          .resolves([2]);
      });
     
      afterEach(() => {
        (SequelizeMatch.update as sinon.SinonStub).restore();
      });

      it('Deve retornar um erro 401 ao não enviar um token válido', async function () {
        const response = await chai.request(app).patch('/matches/1').set({ "Authorization": 'dasdadsadas'});

        expect(response.status).to.be.equal(401);
      });

      it('Deve retornar um erro 401 ao não enviar um token', async function () {
        const response = await chai.request(app).patch('/matches/1/finish').set({ "Authorization": ''});
      
        expect(response.status).to.be.equal(401);
      });

      it('Deve ser possível atualizar uma partida em andamento', async function () {
          chaiHttpResponse = await chai.request(app).patch('/matches/1').set({ "Authorization": validToken }).send({
            homeTeamGoals: 3,
            awayTeamGoals: 1
          });

          expect(chaiHttpResponse.status).to.equal(200);
      });
  });

  describe('ROTA post /matches', async function() {
    beforeEach(async () => {
      sinon
        .stub(SequelizeMatch, 'create')
        .resolves(createdMatch as any);
    });
   
    afterEach(() => {
      (SequelizeMatch.create as sinon.SinonStub).restore();
    });

    it('Deve retornar um erro 401 ao não enviar um token válido', async function () {
      const response = await chai.request(app).post('/matches').set({ "Authorization": 'dasdadsadas'});

      expect(response.status).to.be.equal(401);
    });

    it('Deve retornar um erro 401 ao não enviar um token', async function () {
      const response = await chai.request(app).post('/matches').set({ "Authorization": ''});
    
      expect(response.status).to.be.equal(401);
    });

    it('Deve retornar um erro 404 com a mensagem "There is no team with such id!" ao enviar um id que não existe', async function() {
      chaiHttpResponse = await chai.request(app).post('/matches').set({ "Authorization": validToken }).send({
        homeTeamId: 1000,
        awayTeamId: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    });

    it('Deve retornar um erro 422 com a mensagem "It is not possible to create a match with two equal teams" ao enviar times iguais', async function() {
      chaiHttpResponse = await chai.request(app).post('/matches').set({ "Authorization": validToken }).send({
        homeTeamId: 1,
        awayTeamId: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

      expect(chaiHttpResponse.status).to.equal(422);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('Deve ser possível criar uma partida', async function () {
      chaiHttpResponse = await chai.request(app).post('/matches').set({ "Authorization": validToken }).send(dataToCreate);

      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(createdMatch);
  });
  })
})