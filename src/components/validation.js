const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.input_${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.input_${inputElement.name}-error`);
  
  // Очищаем кастомное сообщение об ошибке
  inputElement.setCustomValidity("");

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

export function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || "");
  } else {
    inputElement.setCustomValidity("");
  }

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  }
}

const hasInvalidInput = (inputList) => inputList.some(input => !input.validity.valid);

export function enableValidation({ inputListFormProfile, buttonSubmit, formSelector, inputErrorClass, inactiveButtonClass }) {
  // Добавляем обработчики на каждое поле ввода
  inputListFormProfile.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formSelector, inputElement, inputErrorClass);
      // Обновляем состояние кнопки после проверки валидности каждого поля ввода
      toggleButtonState(inputListFormProfile, buttonSubmit, inactiveButtonClass);
    });
  });

  // Проверяем состояние кнопки только после добавления всех обработчиков
  toggleButtonState(inputListFormProfile, buttonSubmit, inactiveButtonClass);
}

export function clearValidation(formElement, inputListFormProfile, buttonSubmit) {
  inputListFormProfile.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.removeEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputListFormProfile, buttonSubmit);
    });
  });

  // Обновляем состояние кнопки после очистки всех полей и удаления обработчиков
  toggleButtonState(inputListFormProfile, buttonSubmit);
}


export const toggleButtonState = (inputList, buttonSubmit, inactiveButtonClass = "popup__button_disabled") => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
};

