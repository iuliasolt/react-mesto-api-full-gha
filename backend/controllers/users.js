const { JWT_SECRET, NODE_ENV } = process.env;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const NotFound = require('../errors/NotFoundError');

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  userModel.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFound('Пользователь по указанному id не найден'));
      }
      if (e instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(e);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFound('Пользователь по указанному id не найден'));
      }
      if (e instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (e instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(e);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(e);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
    }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (e.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(e);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  userModel.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
  getCurrentUser,
  login,
};
