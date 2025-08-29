// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

describe('GraphQL Transfer Mutation', () => {
    const graphqlUrl = 'http://localhost:4000/graphql';
    let token;

    before(async () => {
        // Garante usuário e saldo para teste
        await request(graphqlUrl)
            .post('/')
            .send({
                query: `mutation { register(username: "julio", password: "123456", favorecidos: ["priscila"]) { username } }`
            });
        await request(graphqlUrl)
            .post('/')
            .send({
                query: `mutation { register(username: "priscila", password: "123456", favorecidos: []) { username } }`
            });
        // Login para obter token
        const res = await request(graphqlUrl)
            .post('/')
            .send({
                query: `mutation { login(username: "julio", password: "123456") { token } }`
            });
        token = res.body.data.login.token;
    });

    it('Transferência com sucesso', async () => {
        const res = await request(graphqlUrl)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `mutation { createTransfer(from: "julio", to: "priscila", value: 100) { from to value date } }`
            });
        expect(res.body.data.createTransfer).to.include({ from: 'julio', to: 'priscila', value: 100 });
    });

    it('Sem saldo disponível para transferência', async () => {
        // Supondo que o saldo inicial é 0, tente transferir valor alto
        const res = await request(graphqlUrl)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `mutation { createTransfer(from: "julio", to: "priscila", value: 199999) { from to value date } }`
            });
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0].message).to.match(/saldo/i);
    });

    it('Token de autenticação não informado', async () => {
        const res = await request(graphqlUrl)
            .post('/')
            .send({
                query: `mutation { createTransfer(from: "julio", to: "priscila", value: 10) { from to value date } }`
            });
        expect(res.status).to.be.oneOf([200, 401, 403]);
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0].message).to.match(/token/i);
    });
});
