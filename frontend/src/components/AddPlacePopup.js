import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {
 /* const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");*/
  const {values, handleChange, setValues} = useForm({});


  /*function handleChangePlace(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }*/

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    setValues({
      name: "",
      link: ""
    })
  }, [props.isOpen]);
  
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"card-add"}
      title={"Новое место"}
      form={"profileAdd"}
      buttonText={"Создать"}
    >
      <input
        id="title"
        type="text"
        name="name"
        className="popup__text  popup__text_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name || ''}
      />
      <span id="error-title" className="popup__error-message"></span>
      <input
        id="link"
        type="url"
        name="link"
        className="popup__text  popup__text_type_link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ''}
      />
      <span id="error-link" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
