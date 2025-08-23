// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

// Testes
describe('Transfer', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {

            // 1) capturar o token 
            const respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: "julio",
                    password: "123456"
                });

                const token = respostaLogin.body.token; // nao é necessário, pode ser usado diretamente na linha 24
                console.log(token); //imprime o token para verificar se está correto

            // 2) realizar a transferência
            const resposta = await request('http://localhost:3000')
                .post('/transfers')
                .set('authorization', `Bearer ${token}`)
                .send({
                    from: "julio",
                    to: "patricia", //nao existe este usuário cadastrado
                    value: 100
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        });
    });
});