import {model, Schema} from 'mongoose';

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio']
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatorio'],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean,
      default: false
    },
  });

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
export const User = model('User', UserSchema);