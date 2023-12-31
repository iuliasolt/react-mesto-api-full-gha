import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("jwt")));
  const [emailName, setEmailName] = useState(null);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const navigate = useNavigate();

  /*Рендер и отображение карточек на странице*/
  useEffect(() => {
    setIsLoading(true);
    isLoggedIn && Promise.all([api.getDataUser(), api.getInitialCards()])
      .then(([profileInfo, card]) => {
        setCurrentUser(profileInfo);
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [isLoggedIn]);

  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setCardDelete(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
    setIsDeletePopupOpen(false);
  }

  useEffect(() => {
    
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  
}, [
  isProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  selectedCard,
  infoTooltip,
]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmailName("");
    navigate("/signin");
  },[navigate])

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          if (data) {
            setEmailName(data.email);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          handleSignOut();
          console.log(`Не удалось получить токен: ${err}`);
        });
      }
}, [handleSignOut]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  
  function onRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        if(data) {
        setPopupImage(success);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/signin")
      }
      })
      .catch((err) => {
        setPopupImage(fail);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setEmailName("email");
        navigate("/");
      })
      .catch(() => {
        setPopupImage(fail);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
      api
        .changeLike(card._id, isLiked)
        .then((newCard) => {
          setCards(cards => 
            cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const handleCardDelete = () => {
    setIsLoading(true)
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c.id !== cardDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleUpdateUser(data) {
    api
      .setUserData(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({
        avatar: avatar,
      })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err} - 'Ошибка отправки данных'`))
      .finally(() => setIsLoading(false));
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/signin"
              element={
                <>
                  <Header title="Регистрация" route="/signup" />
                  <Login onLogin={onLogin} />
                </>
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  <Header title="Вoйти" route="/signin" />
                  <Register onRegister={onRegister} />
                </>
              }
            />

            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    mail={emailName}
                    onClick={handleSignOut}
                    route=""
                  />
                  <ProtectedRoute
                    component={Main}
                    isLogged={isLoggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                    cards={cards}
                    isLoading={isLoading}
                  />
                  <Footer />
                </>
              }
            />

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/signin"} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseClick={handlePopupCloseClick}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
            isLoading={isLoading}

          />


          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
