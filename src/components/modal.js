export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEscapeClose);
  popup.addEventListener("mousedown", clickOutsideClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEscapeClose);
  popup.removeEventListener("mousedown", clickOutsideClose);
}

function clickOutsideClose(evt) {
  if (evt.target === evt.currentTarget || !evt.target.closest(".popup__content")) {
    closeModal(evt.currentTarget);
  }
}

function pressEscapeClose(evt) {
  if (evt.key === "Escape") {
    const selectedPopup = document.querySelector(".popup_is-opened");
    if (selectedPopup) {
      closeModal(selectedPopup);
    }
  }
}

