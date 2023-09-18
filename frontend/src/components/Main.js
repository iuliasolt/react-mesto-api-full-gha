import React from "react";
import Card from "./Card.js";
import { Spinner } from "./Spinner";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  // const cards = props.cards;
  const isLoading = props.isLoading;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="profile">
          <button
            type="button"
            className="profile__edit-avatar"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt={currentUser.name}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Кнопка: Редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Кнопка: Добавить"
            onClick={props.onAddPlace}
          ></button>
        </section>
      )}

      <section className="cards" aria-label="Секция с фотографиями">
        {props.cards.map((card, _id) => (
          <Card
            key={card._id}
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
