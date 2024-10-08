import { addLike, removeLike } from "./api.js";

export const cardTemplate = document.querySelector("#card-template").content;

function updateButtonState(button, text) {
  button.textContent = text;
}

export function likeCard(event, data, likeCounter) {
  const isLiked = event.target.classList.contains("card__like-button_is-active");
  const action = isLiked ? removeLike : addLike;
  const cardId = data.informationCard._id;

  action(cardId)
    .then(res => {
      likeCounter.textContent = String(res.likes.length);
      event.target.classList.toggle("card__like-button_is-active");
    })
    .catch(err => console.log(err));
}

export function makeCard(data, launchDeleteCard, likeCard, handlerOpenPopupImage) {
  const { informationCard: cardData, informationMe } = data;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".like__counter");
  const buttonRemove = cardElement.querySelector(".card__delete-button");

  likeCounter.textContent = String(cardData.likes.length);
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner._id === informationMe._id) {
    buttonRemove.addEventListener("click", (evt) => launchDeleteCard(evt, cardData));
  } else {
    buttonRemove.remove();
  }

  if (cardData.likes.some(like => like._id === informationMe._id)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", (evt) => likeCard(evt, data, likeCounter));
  cardImage.addEventListener("click", handlerOpenPopupImage);

  return cardElement;
}
