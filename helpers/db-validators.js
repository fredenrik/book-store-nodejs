import {Role} from '../models/role.js';
import {User} from '../models/user.js';

export const isValidateRol = async (rol = '') => {
  const hasRol = await Role.findOne({rol});
  if(!hasRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
};

export const isValidateEmail = async (email = '') => {
  const hasEmail = await User.findOne({email});
  if(hasEmail) {
    throw new Error(`El email ${email} ya esta registrado en la DB`);
  }
};

export const isValidateId = async (id) => {
  const hasUser = await User.findById(id);
  if(!hasUser) {
    throw new Error(`El Id ${id} no existe en la DB`);
  }
};