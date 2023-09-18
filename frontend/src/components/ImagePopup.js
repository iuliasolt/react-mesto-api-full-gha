function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${props.card ? `popup_opened` : ""} `}
      onClick={props.onCloseClick}
    >
      <div className="popup__card-container">
        <button
          className="popup__close popup__close_image"
          type="button"
          onClick={props.onClose}
          aria-label="Кнопка закрыть"
        ></button>
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__paragraph">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
