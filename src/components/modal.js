const animated_duration = 1000;

export const openModal = (popupElement) => {
  updateModalState(popupElement, true);
};

export const closeModal = (popupElement) => {
  updateModalState(popupElement, false);
};

const updateModalState = (popupElement, isOpen) => {
  if (isOpen) {
    popupElement.classList.add("popup_is-animated");
    setTimeout(() => {
      popupElement.classList.add("popup_is-opened");
    }, 0);
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClick);
  } else {
    popupElement.classList.remove("popup_is-opened");
    setTimeout(() => {
      popupElement.classList.remove("popup_is-animated");
    }, animated_duration);
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("click", handleOverlayClick);
  }
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};
