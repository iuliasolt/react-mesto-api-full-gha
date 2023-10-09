import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    function handleSubmit(evt) {
        props.onRemove();
        evt.preventDefault();
    }

    return (
        <PopupWithForm 
          isOpen={props.isOpen}
          onCloseClick={props.onCloseClick}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          name={"delete"}
          title={"Вы уверены?"}
          buttonText={props.isLoading ? "Удаление" : "Да"}
      />
    );
}

export default DeleteCardPopup;