import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.post('/sign-up', UserController.store);

routes.post('/sign-in', SessionController.store);

routes.get('*', (req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

export default routes;
