import request from 'supertest';
import app from '../src/app';

describe('Sign-in sucesso', () => {
  it('Deve ser possivel autenticar o usuario e receber um token jwt', async () => {
    const response = await request(app)
      .post('/sign-in')
      .send({ email: 'v2@gmail.com', senha: '12345678' })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});
