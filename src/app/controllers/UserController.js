import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import jwtConfig from '../../config/jwt';

class UserController {
  async show(req, res) {
    const { userId: _id } = req;

    let user = await User.findById({ _id });

    user = user.toJson();

    return res.json(user);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      senha: yup
        .string()
        .required()
        .min(8),
      telefones: yup.array().of(
        yup.object().shape({
          ddd: yup.string().length(2),
          numero: yup.string().min(8),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ mensagem: 'Dados inválidos para criação de um usuário' });
    }

    const { nome, email, senha, telefones } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ mensagem: 'E-mail já existe' });
    }

    let user = await User.create({
      nome,
      email,
      senha,
      telefones,
      ultimo_login: Date.now(),
    });

    const { _id: id } = user;

    const token = jwt.sign({ id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    user = user.toJson(token);

    return res.json(user);
  }
}

export default new UserController();
