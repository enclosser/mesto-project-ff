// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const content = document.querySelector('.content');
const placesContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}


// @todo: Функция удаления карточки
function removeCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}


// @todo: Вывести карточки на страницу
function renderCards() {
    initialCards.forEach((element) => {
      placesContainer.append(createCard(element, removeCard));
    });
}

renderCards();