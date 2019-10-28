import Router from 'express';

import UserController from './app/controllers/UserController';

const routes = Router();

routes.post('/sign-up', UserController.store);

routes.post('/sign-in', (req, res) => {
  return res.json({ ok: true });
});

routes.get('*', (req, res) => {
  res.status(404).json({ mensagem: 'Rota nao encontrada' });
});

export default routes;
