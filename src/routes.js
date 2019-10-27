import Router from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/sing-up', (req, res) => {
  return res.json({ ok: true });
});

routes.get('*', (req, res) => {
  res.status(404).json({ mensagem: 'Rota nao encontrada' });
});

export default routes;
