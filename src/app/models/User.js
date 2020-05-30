/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_access: {
      type: Date,
      required: true,
    },
    phones: [{ ddd: String, number: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function(next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// UserSchema.methods.toJson = function(token) {
//   const user = this.toObject();

//   user.id = user._id;
//   delete user._id;

//   user.data_criacao = user.createdAt;
//   delete user.createdAt;

//   user.data_atualizacao = user.updatedAt;
//   delete user.updatedAt;

//   user.telefones.map(telefone => {
//     delete telefone._id;
//     return telefone;
//   });

//   delete user.senha;

//   user.token = token;

//   return user;
// };

export default model('User', UserSchema);
