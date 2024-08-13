import { openModal, closeModal } from "./modal.js";
import { deleteCard, addLike, removeLike } from "./api.js";

export const cardTemplate = document.querySelector("#card-template").content;
const popupDelete = document.querySelector(".delete__popup");
const buttonPopupDelete = popupDelete.querySelector(".popup__button");

export function launchDeleteCard(event, cardId) {
  const selectedCard = event.target.closest(".card");
  openModal(popupDelete);
  
  const handleDelete = () => {
    buttonPopupDelete.textContent = "Удаление...";
    deleteCard(cardId)
      .then(() => {
        selectedCard.remove();
        closeModal(popupDelete);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        buttonPopupDelete.textContent = "Да";
        buttonPopupDelete.removeEventListener("click", handleDelete); // Удаляем слушатель события после завершения
      });
  };
  
  buttonPopupDelete.addEventListener("click", handleDelete, { once: true });
}

export function likeCard(event, cardId, likeCounter) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  
  const toggleLike = isLiked ? removeLike : addLike;

  toggleLike(cardId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.error(err));
}

export function makeCard(data, handlerOpenPopupImage) {
  const { informationCard: cardData, informationMe: userInfo } = data;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".like__counter");
  const buttonRemove = cardElement.querySelector(".card__delete-button");

  // Заполнение карточки данными
  likeCounter.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Обработка удаления карточки
  if (cardData.owner._id === userInfo._id) {
    buttonRemove.addEventListener("click", (evt) => launchDeleteCard(evt, cardData._id));
  } else {
    buttonRemove.remove();
  }

  // Обработка лайков
  if (cardData.likes.some((like) => like._id === userInfo._id)) {
    buttonLike.classList.add("card__like-button_is-active");
  }
  
  buttonLike.addEventListener("click", (evt) => likeCard(evt, cardData._id, likeCounter));

  // Обработка открытия попапа с изображением
  cardImage.addEventListener("click", handlerOpenPopupImage);

  return cardElement;
}
