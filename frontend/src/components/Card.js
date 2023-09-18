import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  const cardDeleteButtonClassName = `className="card__trash_hidden" ${
    isOwn && "card__trash"
  }`;
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          aria-label="Удаление"
        />
      )}
      <img
        src={props.link}
        className="card__image"
        alt={props.name}
        onClick={handleCardClick}
      />
      <div className="card__item">
        <h2 className="card__name">{props.name}</h2>
        <div className="card__container-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <p className="card__number-likes">{props.likes}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
