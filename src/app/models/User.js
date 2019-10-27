import { Schema, model } from 'mongoose';

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

export default model('User', UserSchema);
