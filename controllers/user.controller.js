import {response} from 'express';
import {User} from '../models/user.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res = response) => {
  try {
    const body = req.body;
    const { email } = body;
    const user = new User(body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( req.body.password, salt);

    await user.save();
    res.status(201).json({user});

  } catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message})
  }
};

export const getAllUsers = async (req, res = response) => {
  try {
    const query = {
      state : true,
    };

    const { limit = 5, from = 0, to } = req.query;
    const [ total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      count: users.length,
      total,
      users,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({message: e.message});
  }
};

export const updateUser = async (req, res = response) => {
  try {
    const { id } = req.params;

    const { _id, password, google, email, ...rest } = req.body;

    if(password) {
      const salt = bcrypt.genSaltSync();
      rest.password = bcrypt.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    res.json({
      msg: 'put API - updateUser',
      user,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({message: e.message});
  }
};

export const deleteUser = async (req, res =response) => {
  const {id} = req.params;

  //Borrado fisicamente
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, {state: false});
  res.json(user);
};
