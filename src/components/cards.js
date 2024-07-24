const template = document.querySelector("#card-template").content;

export const createCard = (
  { link, name },
  onDelete,
  onLike,
  onImageClick
) => {
  const cardElement = template.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", onLike);
  cardImage.addEventListener("click", onImageClick);

  return cardElement;
};

export const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

export const handleDeleteButtonClick = (evt) => {
  evt.target.closest(".card").remove();
};


