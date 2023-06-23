import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';

import { Response } from 'superagent';
import { mockListTeam, mockTeam } from './mocks/mockTeam';
import { listMatches } from './mocks/mockMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para Partidas', function() {
    let chaiHttpResponse: Response;
    describe('ROTA /matches', async function() {
        beforeEach(async () => {
           sinon
            .stub(SequelizeMatches, 'findAll')
            .resolves(listMatches as unknown as SequelizeMatches[]);
         });
      
        afterEach(() => {
          (SequelizeMatches.findAll as sinon.SinonStub).restore();
        });
        
        it('Deve retornar uma lista com as informações da partida', async function(){
            chaiHttpResponse = await chai.request(app).get('/matches');      
  
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(listMatches);
        })
    })
})