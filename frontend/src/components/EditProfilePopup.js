import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      onSubmit={handleSubmit}
      name={"more-info"}
      title={"Редактировать профиль"}
      form={"profileEdit"}
      buttonText={"Сохранить"}
    >
      <input
        id="username"
        type="text"
        name="name"
        className="popup__text popup__text_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span id="error-username" className="popup__error-message"></span>
      <input
        id="job"
        type="text"
        name="about"
        className="popup__text  popup__text_type_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={about}
        onChange={handleChangeAbout}
      />
      <span id="error-job" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
