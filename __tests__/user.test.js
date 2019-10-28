import request from 'supertest';
import app from '../src/app';

const user = {
  nome: 'victor',
  email: 'v3@gmail.com',
  senha: '12345678',
  telefones: [{ ddd: '11', numero: '972820922' }],
};

describe('User sucesso', () => {
  test('Deve retornar os dados do usuario', async () => {
    const response = await request(app)
      .post('/sign-up')
      .send(user);

    const { token } = response.body;

    const respose2 = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(respose2.body).toHaveProperty('id');
  });
});

describe('User falha', () => {
  test('Deve retornar nao autorizado sessao invalida', async () => {
    const respose = await request(app)
      .get('/user')
      .set('Authorization', `Bearer `)
      .expect(401);

    expect(respose.body).toHaveProperty('mensagem');
  });
});
