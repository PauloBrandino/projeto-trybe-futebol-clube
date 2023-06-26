import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');;

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para Leaderboard', function() {
    describe('ROTA /leaderboard', function() {
        it('Deve retornar a tabela de classificação com sucesso', async function() {
            const response = await chai.request(app).get('/leaderboard')

            expect(response.status).to.equal(200);
        });
    });
    describe('ROTA /leaderboard/home', function() {
        it('Deve retornar a tabela de classificação dos mandantes com sucesso', async function() {
            const response = await chai.request(app).get('/leaderboard/home')

            expect(response.status).to.equal(200);
        });
    });
    describe('ROTA /leaderboard/away', function() {
        it('Deve retornar a tabela de classificação dos visitantes com sucesso', async function() {
            const response = await chai.request(app).get('/leaderboard/away')

            expect(response.status).to.equal(200);
        });
    })
});