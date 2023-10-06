const mongoose = require('mongoose');
const cardModel = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFoundError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(e);
      }
    });
};

const getCard = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('В доступе отказано');
      }
      cardModel.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        })
        .catch((e) => {
          if (e instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFound('Карточки с переданным _id не существует'));
          } else {
            next(e);
          }
        });
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточки с переданным _id не существует'));
      } else {
        next(e);
      }
    });
};

const likeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточки с переданным _id не существует'));
      } else if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Некорректный формат _id'));
      } else {
        next(e);
      }
    });
};

const dislikeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточки с переданным _id не существует'));
      } else if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Некорректный формат _id'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createCard,
  deleteCard,
  getCard,
  likeCard,
  dislikeCard,
};
