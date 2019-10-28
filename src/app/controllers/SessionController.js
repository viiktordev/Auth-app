import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import jwtConfig from '../../config/jwt';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      senha: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ mensagem: 'Dados de autenticação inválidos' });
    }

    const { email, senha } = req.body;

    let user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    await User.updateOne({ _id: id }, { $set: { ultimo_login: Date.now() } });

    user = user.toJson(token);

    return res.json(user);
  }
}

export default new SessionController();
