import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import jwtConfig from '../../config/jwt';

class UserController {
  async show(req, res) {
    const { userId: _id } = req;

    const { name, email, phones } = await User.findById({ _id });

    return res.json({
      user: {
        name,
        email,
        phones,
      },
    });
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup
          .string()
          .email()
          .required(),
        password: yup
          .string()
          .required()
          .min(8),
        phones: yup.array().of(
          yup.object().shape({
            ddd: yup
              .string()
              .length(2)
              .required(),
            number: yup.string().min(8),
          })
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ message: 'invalid data' });
      }

      const { name, email, password, phones } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'email already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
        phones,
        last_access: Date.now(),
      });

      const { _id: id } = user;

      const token = jwt.sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      return res.json({
        user: {
          name,
          email,
          phones,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'unexpected error' });
    }
  }
}

export default new UserController();
