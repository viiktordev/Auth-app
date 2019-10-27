import request from 'supertest';
import app from '../src/app';

import User from '../src/app/models/User';

const body = {
  nome: 'victor',
  email: 'v2@gmail.com',
  senha: '12345678',
  telefones: [{ ddd: '11', numero: '972820922' }],
};

describe('User sucesso', () => {
  beforeEach(() => {
    User.collection.drop();
  });

  it('deve ser possivel cadastrar um usuario e obter um token', async () => {
    const response = await request(app)
      .post('/sing-up')
      .send(body);

    expect(response.body).toHaveProperty('id');
  });
});

describe('User falha', () => {
  it('Deve retornar que o email ja existe', async () => {
    const response = await request(app)
      .post('/sing-up')
      .send(body)
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });

  it('Deve retornar uma falha na validacao dos dados', async () => {
    const response = await request(app)
      .post('/sing-up')
      .send({
        nome: 'victor',
        email: 'v2gmail.com',
        senha: '12345678',
      })
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });
});
