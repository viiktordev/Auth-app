import request from 'supertest';
import app from '../src/app';

describe('user', () => {
  it('deve ser possivel cadastrar um usuario e obter um token', async () => {
    const response = await request(app)
      .post('/sing-up')
      .send({
        nome: 'victor',
        email: 'v2@gmail.com',
        senha: '12345678',
        telefones: [
          {
            ddd: '11',
            numero: '972820922',
          },
        ],
      });

    expect(response.body).toHaveProperty('id');
  });
});
