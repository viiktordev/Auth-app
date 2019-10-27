/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    ultimo_login: {
      type: Date,
      required: true,
    },
    telefones: [{ ddd: String, numero: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function(next) {
  if (this.senha) {
    this.senha = await bcrypt.hash(this.senha, 8);
  }
  next();
});

export default model('User', UserSchema);
