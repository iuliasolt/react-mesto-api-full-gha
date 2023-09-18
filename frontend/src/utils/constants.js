export const enableValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__text_type_invalid",
  errorClass: "popup__error-message",
};

export const initialCards = [
  {
      name: "Токио",
      link: "https://images.unsplash.com/photo-1679458118229-6ac5b35757d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
      name: "Бали",
      link: "https://images.unsplash.com/photo-1676995278388-6e899b1d5fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
      name: "Пулга",
      link: "https://images.unsplash.com/photo-1677241817906-a84211b4f627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
      name: "Татры",
      link: "https://images.unsplash.com/photo-1677098077185-5438068c2ae6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
      name: "Этна",
      link: "https://images.unsplash.com/photo-1675860782897-3039871bd39c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
      name: "Пуант Де Шато",
      link: "https://images.unsplash.com/photo-1673957216012-120e1397db41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
];

const popupProfile = document.querySelector(".popup_type_more-info");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const nameEdit = document.querySelector(".popup__text_type_name");
const jobEdit = document.querySelector(".popup__text_type_job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const cardGallery = document.querySelector(".cards");
const formAddCard = document.querySelector(".popup__form_type_add");
const formProfile = document.querySelector(".popup__form_type_profile");
const nameInput = formAddCard.querySelector(".popup__text_type_title");
const linkInput = formAddCard.querySelector(".popup__text_type_link");
const profileEditAvatar = document.querySelector(".profile__edit-avatar");
//const profileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");

//const popupDeleteCard = document.querySelector(".popup_type_delete-card");

export { profileEditAvatar, popupProfile, popupCardAdd, formAddCard, nameEdit, jobEdit, buttonEditProfile, buttonAdd, cardGallery, formProfile, nameInput, linkInput, popupAvatar };
