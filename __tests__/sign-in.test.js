import request from 'supertest';
import app from '../src/app';

const user = {
  nome: 'victor',
  email: 'v2@gmail.com',
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
      .send({ email: 'v2gmail.com', senha: user.senha })
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });

  test('Deve retornar não autorizado', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({ email: 'v99@mail.com', senha: 'senhainvalida' })
      .expect(401);

    expect(response.body).toHaveProperty('mensagem');
  });
});
