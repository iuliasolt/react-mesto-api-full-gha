import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refInput = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"avatar"}
      title={"Обновить аватар"}
      form={"profileAvatar"}
      buttonText={"Сохранить"}
    >
      <input
        ref={refInput}
        id="linkAvatar"
        type="url"
        name="avatar"
        className="popup__text  popup__text_type_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="error-linkAvatar" className="popup__error-message"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
