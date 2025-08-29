// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes REST já existentes
describe('Transfer', () => {
    describe('POST /transfers', () => {
        it.only('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            // 1) capturar o token 
            const respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: "julio",
                    password: "123456"
                });
            const token = respostaLogin.body.token;
            // 2) realizar a transferência 
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('authorization', `Bearer ${token}`)
                .send({
                    from: "juliox",
                    to: "patricia", //nao existe este usuário cadastrado
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });
    });
});
