function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      } `}
      onClick={props.onCloseClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close popup__close_type_profile"
          onClick={props.onClose}
        />
        <h2 className="popup__info">{props.title}</h2>
        <form
          name={props.form}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__save">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
