(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),e.addEventListener("click",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),e.removeEventListener("click",n)}function n(e){e.target.closest(".popup__content")||(e.preventDefault(),t(document.querySelector(".popup_is-opened")))}function r(e){"Escape"===e.key&&(e.preventDefault(),t(document.querySelector(".popup_is-opened")))}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-21",headers:{authorization:"ba726ca4-babe-4c60-b803-4ec06cee7921","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var i=fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then((function(e){return a(e)})),c=fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then((function(e){return a(e)})),u=function(e){return fetch("".concat(o.baseUrl,"/cards/")+e,{method:"DELETE",headers:o.headers}).then((function(e){return a(e)}))},l=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/")+e,{method:"PUT",headers:o.headers}).then((function(e){return a(e)}))},d=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/")+e,{method:"DELETE",headers:o.headers}).then((function(e){return a(e)}))},s=document.querySelector("#card-template").content,p=document.querySelector(".delete__popup"),f=p.querySelector(".popup__button");function m(n,r){var o=n.target.closest(".card");e(p),f.addEventListener("click",(function(e){f.textContent="Удаление...",u(r._id).then((function(e){o.remove(),t(p)})).catch((function(e){console.log(e)})).finally((function(e){f.textContent="Да"}))}))}function _(e,t,n){e.target.classList.contains("card__like-button_is-active")?d(t.informationCard._id).then((function(t){n.textContent=""+t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):l(t.informationCard._id).then((function(t){n.textContent=""+t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}var v=function(e,t,n,r){var o=e.querySelector(".input_".concat(t.name,"-error"));t.classList.add(r),o.textContent=n},y=function(e,t,n){e.querySelector(".input_".concat(t.name,"-error")).textContent="",t.classList.remove(n)};function h(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?y(e,t,n):v(e,t,t.validationMessage,n)}function b(e,t,n){S(t,n),t.forEach((function(r){y(e,r),r.removeEventListener("input",(function(o){h(e,r),S(t,n)}))}))}var S=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__button_disabled";!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(""+n),t.removeAttribute("disabled","")):(t.setAttribute("disabled",""),t.classList.add(""+n))};function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var C=document.querySelector(".places__list"),q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),k=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),P=document.querySelector(".profile__image"),w={edit:document.querySelector(".popup_type_edit"),newCard:document.querySelector(".popup_type_new-card"),image:document.querySelector(".popup_type_image"),editAvatar:document.querySelector(".popup_type_edit_avatar")},A={image:w.image.querySelector(".popup__image"),caption:w.image.querySelector(".popup__caption")},x={editProfile:w.edit.querySelector(".popup__form[name='edit-profile']"),newPlace:w.newCard.querySelector(".popup__form[name='new-place']"),editAvatar:w.editAvatar.querySelector(".popup__form[name='edit-avatar']")},j={nameProfile:x.editProfile.querySelector(".popup__input_type_name"),jobProfile:x.editProfile.querySelector(".popup__input_type_description"),nameNewCard:x.newPlace.querySelector(".popup__input_type_card-name"),urlNewCard:x.newPlace.querySelector(".popup__input_type_url")},U={editProfileSubmit:x.editProfile.querySelector(".popup__button"),addCardSubmit:x.newPlace.querySelector(".popup__button"),editAvatarSubmit:x.editAvatar.querySelector(".popup__button")},T=[i,c];function N(t){A.image.src=t.target.src,A.image.alt=t.target.alt,A.caption.textContent=t.target.alt,e(w.image)}function I(e,n,r){e.preventDefault(),r.textContent="Сохранение...",n().then((function(){return t(e.target.closest(".popup"))})).finally((function(){r.textContent="Сохранить"}))}k.addEventListener("click",(function(){j.nameProfile.value=q.textContent,j.jobProfile.value=E.textContent,e(w.edit),b(x.editProfile)})),L.addEventListener("click",(function(){x.newPlace.reset(),b(x.newPlace),e(w.newCard)})),P.addEventListener("click",(function(){b(x.editAvatar),e(w.editAvatar)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(e){return t(e.target.closest(".popup"))}))})),x.editProfile.addEventListener("submit",(function(e){I(e,(function(){return e={name:j.nameProfile.value,job:j.jobProfile.value},fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:e.name,about:e.job})}).then((function(e){return a(e)}));var e}),U.editProfileSubmit)})),x.newPlace.addEventListener("submit",(function(e){I(e,(function(){return e={name:j.nameNewCard.value,link:j.urlNewCard.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({link:e.dataCard.link,name:e.dataCard.name})}).then((function(e){return a(e)}));var e}),U.addCardSubmit)})),x.editAvatar.addEventListener("submit",(function(e){I(e,(function(){var e;return(e=x.editAvatar.querySelector(".popup__input_type_url").value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e})}).then((function(e){return a(e)}))).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")")}))}),U.editAvatarSubmit)})),formList.forEach((function(e){S(e.inputListFormProfile,e.buttonSubmit,e.inactiveButtonClass),e.inputListFormProfile.forEach((function(t){t.addEventListener("input",(function(n){h(e.formSelector,t,e.inputErrorClass),S(e.inputListFormProfile,e.buttonSubmit,e.inactiveButtonClass)}))}))})),Promise.all(T).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(n,r)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],i=o[1];window.dataUserInfo=a,t=a,q.textContent=t.name,E.textContent=t.about,P.style.backgroundImage="url(".concat(t.avatar,")"),function(e){e.forEach((function(e){/http.*(jpeg|jpg|gif|png)/gi.test(e.link)&&C.append(function(e){return function(e,t,n,r){var o=e.informationCard,a=s.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__like-button"),c=a.querySelector(".card__image"),u=a.querySelector(".like__counter"),l=""+o.likes.length;u.textContent=l,c.src=o.link,c.alt=o.name,a.querySelector(".card__title").textContent=o.name;var d=a.querySelector(".card__delete-button");return o.owner._id===e.informationMe._id?d.addEventListener("click",(function(e){t(e,o)})):d.remove(),o.likes.forEach((function(t){t._id===e.informationMe._id&&i.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(t){n(t,e,u)})),c.addEventListener("click",(function(e){r(e)})),a}(e,m,_,N)}({informationCard:e,informationMe:dataUserInfo}))}))}(i)})).catch(console.error)})();
//# sourceMappingURL=main.js.map