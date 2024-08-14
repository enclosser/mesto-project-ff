import "./pages/index.css";
import { makeCard, likeCard, launchDeleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserServerInfo,
  createNewPost,
  changeAvatar,
} from "./components/api.js";

// Объявление переменных:
const validationLink = /http.*(jpeg|jpg|gif|png)/gi;

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupNewAvatar = document.querySelector(".popup_type_edit_avatar");
const selectedPopupImage = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const formElementEditProfile = popupEdit.querySelector(".popup__form[name='edit-profile']");
const formElementNewPlace = popupNewCard.querySelector(".popup__form[name='new-place']");
const formElementEditAvatar = popupNewAvatar.querySelector(".popup__form[name='edit-avatar']");

const inputListFormProfile = Array.from(formElementEditProfile.querySelectorAll(".popup__input"));
const inputListFormAddCard = Array.from(formElementNewPlace.querySelectorAll(".popup__input"));
const inputListFormEditAvatar = Array.from(formElementEditAvatar.querySelectorAll(".popup__input"));

const nameProfileInput = formElementEditProfile.querySelector(".popup__input_type_name");
const jobInput = formElementEditProfile.querySelector(".popup__input_type_description");
const nameNewCardInput = formElementNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formElementNewPlace.querySelector(".popup__input_type_url");

const buttonPopupEditProfileSubmit = formElementEditProfile.querySelector(".popup__button");
const buttonPopupAddCardSubmit = formElementNewPlace.querySelector(".popup__button");
const buttonPopupNewAvatarSubmit = formElementEditAvatar.querySelector(".popup__button");

// Здесь добавлено определение formList
const formList = Array.from(document.querySelectorAll(".popup__form"));

// Основные функции:
function addCard(data) {
  return makeCard(data, launchDeleteCard, likeCard, handlerOpenPopupImage);
}

function updateUserInfo(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

function renderInitialCards(cards, userInfo) {
  cards.forEach((card) => {
    if (validationLink.test(card.link)) {
      const readyCard = addCard({ informationCard: card, informationMe: userInfo });
      placesList.append(readyCard);
    }
  });
}

function loadInitialInfo() {
  Promise.all([getUserInfo(), getCards()])
    .then(([userInfo, cards]) => {
      window.dataUserInfo = userInfo;
      updateUserInfo(userInfo);
      renderInitialCards(cards, userInfo);
    })
    .catch(console.log);
}

function renderNewCard(cardData) {
  const readyCard = addCard({ informationCard: cardData, informationMe: window.dataUserInfo });
  placesList.prepend(readyCard);
}

function handlerOpenPopupImage(evt) {
  selectedPopupImage.src = evt.target.src;
  selectedPopupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupImage);
}

function handleFormSubmit(button, apiFunction, onSuccess, onError) {
  return (evt) => {
    evt.preventDefault();
    button.textContent = "Сохранение...";
    apiFunction()
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        button.textContent = "Сохранить";
      });
  };
}

buttonEdit.addEventListener("click", () => {
  nameProfileInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(formElementEditProfile, inputListFormProfile, buttonPopupEditProfileSubmit);
});

buttonAdd.addEventListener("click", () => {
  formElementNewPlace.reset();
  clearValidation(formElementNewPlace, inputListFormAddCard, buttonPopupAddCardSubmit);
  openModal(popupNewCard);
});

profileImage.addEventListener("click", () => {
  clearValidation(formElementEditAvatar, inputListFormEditAvatar, buttonPopupNewAvatarSubmit);
  openModal(popupNewAvatar);
});

document.querySelectorAll(".popup__close").forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => closeModal(evt.target.closest(".popup")));
});

formElementEditProfile.addEventListener("submit", handleFormSubmit(
  buttonPopupEditProfileSubmit,
  () => updateUserServerInfo({ name: nameProfileInput.value, job: jobInput.value }),
  (res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(popupEdit);
  },
  console.log
));

formElementNewPlace.addEventListener("submit", handleFormSubmit(
  buttonPopupAddCardSubmit,
  () => createNewPost({ dataCard: { name: nameNewCardInput.value, link: urlInput.value, likes: [] } }),
  (res) => {
    renderNewCard(res);
    closeModal(popupNewCard);
  },
  console.log
));

formElementEditAvatar.addEventListener("submit", handleFormSubmit(
  buttonPopupNewAvatarSubmit,
  () => changeAvatar(formElementEditAvatar.querySelector(".popup__input_type_url").value),
  (link) => {
    profileImage.style.backgroundImage = `url(${link.avatar})`;
    closeModal(popupNewAvatar);
  },
  console.log
));

formList.forEach((formElement) => {
  enableValidation({
    formSelector: formElement,
    inputListFormProfile: Array.from(formElement.querySelectorAll(".popup__input")),
    buttonSubmit: formElement.querySelector(".popup__button"),
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
});

loadInitialInfo();
