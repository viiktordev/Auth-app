import request from 'supertest';
import app from '../src/app';

const user = {
  nome: 'victor',
  email: 'v3@gmail.com',
  senha: '12345678',
  telefones: [{ ddd: '11', numero: '972820922' }],
};

describe('Sign-in sucesso', () => {
  beforeEach(async () => {
    await request(app)
      .post('/sign-up')
      .send(user);
  });

  test('Deve ser possivel autenticar o usuario e receber um token jwt', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({ email: user.email, senha: user.senha })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});

describe('Sign-in falha', () => {
  test('Deve retornar uma falha na validacao dos dados', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({ email: 'v3gmail.com', senha: user.senha })
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });
});
