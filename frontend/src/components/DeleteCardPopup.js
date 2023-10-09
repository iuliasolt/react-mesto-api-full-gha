import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    function handleSubmit() {
        props.onRemove();
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