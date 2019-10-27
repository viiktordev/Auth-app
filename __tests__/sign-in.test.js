import request from 'supertest';
import app from '../src/app';

import User from '../src/app/models/User';

const body = {
  nome: 'victor',
  email: 'v2@gmail.com',
  senha: '12345678',
  telefones: [{ ddd: '11', numero: '972820922' }],
};
