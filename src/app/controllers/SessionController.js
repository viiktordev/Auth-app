import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import jwtConfig from '../../config/jwt';

class SessionController {
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
        password: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ message: 'invalid data' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'invalid user or password' });
      }

      const { _id: id, name, phones } = user;

      const token = jwt.sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      await User.updateOne({ _id: id }, { $set: { last_access: Date.now() } });

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

export default new SessionController();
