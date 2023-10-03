import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(props.card);
    }

    return (
        <PopupWithForm 
          isOpen={props.isOpen}
          onCloseClick={props.onCloseClick}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          name={"delete"}
          title={"Подтверждения удаления"}
         buttonText={"Подтверждаю"}
      />
    );
}

export default DeleteCardPopup;