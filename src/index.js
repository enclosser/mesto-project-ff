import "./pages/index.css";
import { initialCards } from "./components/initialCards.js";
import { createCard, handleLikeButtonClick, handleDeleteButtonClick  } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const modals = {
  edit: document.querySelector(".popup_type_edit"),
  newCard: document.querySelector(".popup_type_new-card"),
  image: document.querySelector(".popup_type_image"),
  close: document.querySelectorAll(".popup__close"),
};

const modalImageData = modals.image.querySelector(".popup__image");

const editModalButton = document.querySelector(".profile__edit-button");
const newItemModalButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".profile__title");
const nameJob = document.querySelector(".profile__description");
const editProfileForm = document.forms.edit__profile;
const newCardForm = document.forms.new__place;
const placesList = document.querySelector(".places__list");

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameInput.textContent = editProfileForm.name.value;
  nameJob.textContent = editProfileForm.description.value;
  closeModal(modals.edit);
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: evt.target.place__name.value,
    link: evt.target.link.value,
  };
  closeModal(modals.newCard);
  evt.target.reset();
  addCardToList(cardObject);
};

const handleModalTypeImage = (evt) => {
  const cardImage = evt.target;
  if (cardImage) {
    modalImageData.src = cardImage.src;
    modalImageData.alt = cardImage.alt;
    modalImageData.textContent = cardImage.alt;
    openModal(modals.image);
  }
};

editProfileForm.addEventListener("submit", handleEditFormSubmit);

editModalButton.addEventListener("click", () => {
  editProfileForm.name.value = nameInput.textContent;
  editProfileForm.description.value = nameJob.textContent;
  openModal(modals.edit);
});

newItemModalButton.addEventListener("click", () => {
  openModal(modals.newCard);
});

newCardForm.addEventListener("submit", handleAddCardSubmit);

modals.close.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

const renderCards = (cards, method = "append") => {
  cards.forEach((cardData) => {
    addCardToList(cardData, method);
  });
};

const addCardToList = (
  cardData,
  method = "prepend"
) => {
  const cardElement = createCard(
    cardData,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    handleModalTypeImage
  );
  placesList[method](cardElement);
};

renderCards(initialCards);