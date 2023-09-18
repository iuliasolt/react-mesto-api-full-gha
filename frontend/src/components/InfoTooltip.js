function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} `}
      onClick={props.onCloseClick}
    >
      <div className="popup__container">
        <img className="popup__status" src={props.image} alt={props.title} />
        <h2 className="popup__message">{props.title}</h2>
        <button
          type="button"
          className="popup__close"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
