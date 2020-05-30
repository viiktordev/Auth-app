import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sign-up', UserController.store);

routes.post('/sign-in', SessionController.store);

routes.get('/user', authMiddleware, UserController.show);

routes.get('*', (req, res) => {
  res.status(404).json({ message: 'route not found' });
});

routes.post('*', (req, res) => {
  res.status(404).json({ message: 'route not found' });
});

export default routes;
