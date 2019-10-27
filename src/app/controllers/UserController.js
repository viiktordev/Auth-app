import * as yup from 'yup';

import User from '../models/User';

class UserController {
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

    user = user.toJson();

    return res.json(user);
  }
}

export default new UserController();
