(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),e.addEventListener("click",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),e.removeEventListener("click",n)}function n(e){e.target.closest(".popup__content")||(e.preventDefault(),t(document.querySelector(".popup_is-opened")))}function o(e){"Escape"===e.key&&(e.preventDefault(),t(document.querySelector(".popup_is-opened")))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-21",headers:{authorization:"ba726ca4-babe-4c60-b803-4ec06cee7921","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var i=fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then((function(e){return c(e)})),a=fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then((function(e){return c(e)})),u=function(e){return fetch("".concat(r.baseUrl,"/cards/")+e,{method:"DELETE",headers:r.headers}).then((function(e){return c(e)}))},l=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/")+e,{method:"PUT",headers:r.headers}).then((function(e){return c(e)}))},s=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/")+e,{method:"DELETE",headers:r.headers}).then((function(e){return c(e)}))},p=document.querySelector("#card-template").content,d=document.querySelector(".delete__popup"),f=d.querySelector(".popup__button");function _(n,o){var r=n.target.closest(".card");e(d),f.addEventListener("click",(function(e){f.textContent="Удаление...",u(o._id).then((function(e){r.remove(),t(d)})).catch((function(e){console.log(e)})).finally((function(e){f.textContent="Да"}))}))}function m(e,t,n){e.target.classList.contains("card__like-button_is-active")?s(t.informationCard._id).then((function(t){n.textContent=""+t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):l(t.informationCard._id).then((function(t){n.textContent=""+t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}var y=function(e,t,n,o){var r=e.querySelector(".input_".concat(t.name,"-error"));t.classList.add(o),r.textContent=n},v=function(e,t,n){e.querySelector(".input_".concat(t.name,"-error")).textContent="",t.classList.remove(n)};function h(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?v(e,t,n):y(e,t,t.validationMessage,n)}function b(e,t,n){S(t,n),t.forEach((function(o){v(e,o),o.removeEventListener("input",(function(r){h(e,o),S(t,n)}))}))}var S=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__button_disabled";!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(""+n),t.removeAttribute("disabled","")):(t.setAttribute("disabled",""),t.classList.add(""+n))},q=/http.*(jpeg|jpg|gif|png)/gi,g=document.querySelector(".places__list"),C=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),x=document.querySelector(".profile__image"),A=document.querySelector(".popup_type_edit"),U=document.querySelector(".popup_type_new-card"),P=document.querySelector(".popup_type_image"),T=document.querySelector(".popup_type_edit_avatar"),w=document.querySelectorAll(".popup__close"),j=P.querySelector(".popup__image"),D=P.querySelector(".popup__caption"),M=A.querySelector(".popup__form[name='edit-profile']"),F=U.querySelector(".popup__form[name='new-place']"),I=T.querySelector(".popup__form[name='edit-avatar']"),N=Array.from(document.querySelectorAll(".popup__form")),O=Array.from(M.querySelectorAll(".popup__input")),B=Array.from(F.querySelectorAll(".popup__input")),J=Array.from(I.querySelectorAll(".popup__input")),G=M.querySelector(".popup__input_type_name"),H=M.querySelector(".popup__input_type_description"),V=F.querySelector(".popup__input_type_card-name"),z=F.querySelector(".popup__input_type_url"),K=M.querySelector(".popup__button"),Q=F.querySelector(".popup__button"),R=I.querySelector(".popup__button"),W=[i,a];function X(e){return function(e,t,n,o){var r=e.informationCard,c=p.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__like-button"),a=c.querySelector(".card__image"),u=c.querySelector(".like__counter"),l=""+r.likes.length;u.textContent=l,a.src=r.link,a.alt=r.name,c.querySelector(".card__title").textContent=r.name;var s=c.querySelector(".card__delete-button");return r.owner._id===e.informationMe._id?s.addEventListener("click",(function(e){t(e,r)})):s.remove(),r.likes.forEach((function(t){t._id===e.informationMe._id&&i.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(t){n(t,e,u)})),a.addEventListener("click",(function(e){o(e)})),c}(e,_,m,Y)}function Y(t){j.src=t.target.src,j.alt=t.target.alt,D.textContent=t.target.alt,e(P)}E.addEventListener("click",(function(t){G.value=C.textContent,H.value=k.textContent,e(A),b(M,O,K)})),L.addEventListener("click",(function(t){F.reset(),b(F,B,Q),e(U)})),x.addEventListener("click",(function(t){b(I,J,R),e(T)})),w.forEach((function(e){e.addEventListener("click",(function(e){t(e.target.closest(".popup"))}))})),M.addEventListener("submit",(function(e){!function(e,n){var o;e.preventDefault(),K.textContent="Сохранение...",(o={name:G.value,job:H.value},fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:o.name,about:o.job})}).then((function(e){return c(e)}))).then((function(e){C.textContent=e.name,k.textContent=e.about,t(A)})).catch((function(e){console.log(e)})).finally((function(e){K.textContent="Сохранить"}))}(e)})),F.addEventListener("submit",(function(e){!function(e,t,n){var o;Q.textContent="Сохранение...",e.preventDefault(),(o={dataCard:{name:V.value,link:z.value,likes:[]}},fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({link:o.dataCard.link,name:o.dataCard.name})}).then((function(e){return c(e)}))).then((function(e){var n;n=X({informationCard:e,informationMe:dataUserInfo}),g.prepend(n),t(U)})).catch((function(e){console.log(e)})).finally((function(e){Q.textContent="Создать"}))}(e,t)})),I.addEventListener("submit",(function(e){!function(e,n){e.preventDefault(),R.textContent="Сохранение...";var o=n.querySelector(".popup__input_type_url");(function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then((function(e){return c(e)}))})(o.value).then((function(e){x.setAttribute("style","background-image: url(".concat(e.avatar,")")),o.value="",t(T)})).catch((function(e){console.log(e)})).finally((function(e){R.textContent="Сохранить"}))}(e,I)})),N.forEach((function(e){var t;t={formSelector:e,inputListFormProfile:Array.from(e.querySelectorAll(".popup__input")),buttonSubmit:e.querySelector(".popup__button"),inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},S(t.inputListFormProfile,t.buttonSubmit,t.inactiveButtonClass),t.inputListFormProfile.forEach((function(e){e.addEventListener("input",(function(n){h(t.formSelector,e,t.inputErrorClass),S(t.inputListFormProfile,t.buttonSubmit,t.inactiveButtonClass)}))}))})),Promise.all(W).then((function(e){window.dataUserInfo=e[0],function(e){C.textContent=e.name,k.textContent=e.about,x.setAttribute("style","background-image: url(".concat(e.avatar,")"))}(dataUserInfo),function(e){e.forEach((function(e){if(q.test(e.link)){var t=X({informationCard:e,informationMe:dataUserInfo});g.append(t)}}))}(e[1])})).catch((function(e){console.log(e)}))})();
//# sourceMappingURL=main.js.map