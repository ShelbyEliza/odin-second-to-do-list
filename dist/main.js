/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/card.js":
/*!*****************************!*\
  !*** ./src/modules/card.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _storageHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageHelper */ "./src/modules/storageHelper.js");


class HTMLElement {
	constructor(element, className, textContent, parentDom) {
		this.dom = document.createElement(element);
		if (className.length >= 0) {
			this.dom.classList.add(className);
		}
		if (textContent) {
			this.dom.textContent = textContent;
			if (element === "button") {
				this.dom.value = textContent;
			}
		}
		if (parentDom) {
			this.appendToParent(parentDom);
		}
	}
	addToClassList(className) {
		this.dom.classList.add(className);
	}
	appendToParent(parentDom) {
		parentDom.appendChild(this.dom);
	}
}

class Card {
	constructor(proj, parentDom, modal) {
		this.id = proj.id;
		this.wrapper = new HTMLElement("div", "card-wrapper");
		this.title = new HTMLElement("h3", "title", proj.title, this.wrapper.dom);
		this.dueDate = new HTMLElement(
			"p",
			"due-date",
			proj.dueDate,
			this.wrapper.dom
		);
		this.description = new HTMLElement(
			"p",
			"description",
			proj.description,
			this.wrapper.dom
		);
		this.btnWrapper = new HTMLElement(
			"div",
			"card-btn-wrapper",
			"",
			this.wrapper.dom
		);
		this.editBtn = new HTMLElement(
			"button",
			"edit-btn",
			"Edit",
			this.btnWrapper.dom
		);
		this.deleteBtn = new HTMLElement(
			"button",
			"delete-btn",
			"X",
			this.btnWrapper.dom
		);
		parentDom.appendChild(this.wrapper.dom);

		this.deleteBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();

			(0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(this.id, "projects");
			this.wrapper.dom.remove();
		});

		this.editBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();

			modal.openModal(proj, this);
			modal.turnOnEditMode(proj);
		});
	}
	getCard() {
		return this;
	}
	editCard(newDetails) {
		this.title.dom.textContent = newDetails.title;
		this.dueDate.dom.textContent = newDetails.dueDate;
		this.description.dom.textContent = newDetails.description;
	}
}




/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _storageHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageHelper */ "./src/modules/storageHelper.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/modules/card.js");



class Modal {
	constructor() {
		this.formElement = document.getElementById("modal-form");
		this.dialog = document.getElementById("add-project-wrapper");
		const addProjBtn = document.getElementById("add-project-btn");
		const cancelProjBtn = document.getElementById("cancel-project-btn");
		const submitProjBtn = document.getElementById("submit-project-btn");
		this.titleInput = document.getElementById("title");
		this.dueDateInput = document.getElementById("dueDate");
		this.descriptionInput = document.getElementById("description");
		this.editMode = false;
		this.editData = "";

		addProjBtn.addEventListener("click", () => {
			this.dialog.showModal();
		});

		cancelProjBtn.addEventListener("click", (e) => {
			e.preventDefault();
			this.turnOffEditMode();
			this.formElement.reset();

			this.dialog.close();
		});

		submitProjBtn.addEventListener("click", (e) => {
			e.preventDefault();

			let data = {
				title: this.titleInput.value,
				dueDate: this.dueDateInput.value,
				description: this.descriptionInput.value,
			};
			/** if this is a new project: */
			if (this.editMode !== true) {
				let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
				data.id =
					data.title[0] + data.title[2] + data.title[3] + "-" + randomNumb;

				let newDataStored = (0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.addProjectData)(data, "projects");

				new _card__WEBPACK_IMPORTED_MODULE_1__.Card(
					newDataStored,
					document.querySelector(".project-list-wrapper"),
					this
				);
				//** else you are editing a project: */
			} else {
				data.id = this.editData.id;
				let newDataStored = (0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.editProjectData)(data, "projects");
				this.card.editCard(newDataStored);
				this.turnOffEditMode();
			}
			this.formElement.reset();
			this.dialog.close();
		});
	}
	turnOnEditMode(data) {
		this.editMode = true;
		this.editData = data;
	}
	turnOffEditMode() {
		this.editMode = false;
		this.editData = "";
	}
	openModal(projectData, card) {
		this.dialog.showModal();
		this.titleInput.value = projectData.title;
		this.dueDateInput.value = projectData.dueDate;
		this.descriptionInput.value = projectData.description;
		this.card = card;
	}
}


/***/ }),

/***/ "./src/modules/storageHelper.js":
/*!**************************************!*\
  !*** ./src/modules/storageHelper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Storage: () => (/* binding */ Storage),
/* harmony export */   addProjectData: () => (/* binding */ addProjectData),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   editProjectData: () => (/* binding */ editProjectData),
/* harmony export */   isStorageAvailable: () => (/* binding */ isStorageAvailable)
/* harmony export */ });
function isStorageAvailable() {
	let storage;
	try {
		storage = window["localStorage"];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === "QuotaExceededError" ||
				// Firefox
				e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage &&
			storage.length !== 0
		);
	}
}

class Storage {
	constructor(location) {
		if (isStorageAvailable() === true) {
			this.projects = JSON.parse(localStorage.getItem(location));

			if (this.projects) {
				console.log("User has existing Storage:");
			} else {
				console.log("User has no previous data.");
				let newStorage = {
					active: [],
					archived: [],
				};
				localStorage.setItem(location, JSON.stringify(newStorage));
				console.log(localStorage.getItem(location));
				this.projects = newStorage;
			}
		}
	}
}

function deleteProject(projectId, location) {
	let storage = JSON.parse(localStorage.getItem(location));

	let toKeep = storage.active.filter((project) => project.id !== projectId);
	storage.active = toKeep;
	localStorage.setItem("projects", JSON.stringify(storage));
}

function addProjectData(data, location) {
	let storage = JSON.parse(localStorage.getItem(location));

	storage.active.push(data);
	localStorage.setItem("projects", JSON.stringify(storage));

	let newProjectData = storage.active[storage.active.length - 1];
	return newProjectData;
}
function editProjectData(data, location) {
	let storage = JSON.parse(localStorage.getItem(location));
	let editedStorage = storage.active.filter(
		(project) => project.id !== data.id
	);
	editedStorage.push(data);
	storage.active = editedStorage;
	localStorage.setItem("projects", JSON.stringify(storage));
	let newProjectData = storage.active[storage.active.length - 1];
	return newProjectData;
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_storageHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/storageHelper */ "./src/modules/storageHelper.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/card */ "./src/modules/card.js");




class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		let projectStorage = new _modules_storageHelper__WEBPACK_IMPORTED_MODULE_0__.Storage("projects");

		let modal = new _modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"]();
		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new _modules_card__WEBPACK_IMPORTED_MODULE_2__.Card(project, projListWrapper, modal);
			});
		}
	}
}
const app = new App();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRyw2REFBYTtBQUNoQjtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RmtEO0FBQ3BDOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsOERBQWM7O0FBRXRDLFFBQVEsdUNBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esd0JBQXdCLCtEQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRRTs7Ozs7OztVQ25GRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDZDtBQUNFOztBQUV0QztBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMkRBQU87O0FBRWxDLGtCQUFrQixzREFBSztBQUN2QjtBQUNBO0FBQ0EsUUFBUSwrQ0FBSTtBQUNaLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvY2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL21vZGFsLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvc3RvcmFnZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlbGV0ZVByb2plY3QgfSBmcm9tIFwiLi9zdG9yYWdlSGVscGVyXCI7XG5cbmNsYXNzIEhUTUxFbGVtZW50IHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgY2xhc3NOYW1lLCB0ZXh0Q29udGVudCwgcGFyZW50RG9tKSB7XG5cdFx0dGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGlmIChjbGFzc05hbWUubGVuZ3RoID49IDApIHtcblx0XHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHRleHRDb250ZW50KSB7XG5cdFx0XHR0aGlzLmRvbS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuXHRcdFx0aWYgKGVsZW1lbnQgPT09IFwiYnV0dG9uXCIpIHtcblx0XHRcdFx0dGhpcy5kb20udmFsdWUgPSB0ZXh0Q29udGVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBhcmVudERvbSkge1xuXHRcdFx0dGhpcy5hcHBlbmRUb1BhcmVudChwYXJlbnREb20pO1xuXHRcdH1cblx0fVxuXHRhZGRUb0NsYXNzTGlzdChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdH1cblx0YXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKSB7XG5cdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKHRoaXMuZG9tKTtcblx0fVxufVxuXG5jbGFzcyBDYXJkIHtcblx0Y29uc3RydWN0b3IocHJvaiwgcGFyZW50RG9tLCBtb2RhbCkge1xuXHRcdHRoaXMuaWQgPSBwcm9qLmlkO1xuXHRcdHRoaXMud3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcImNhcmQtd3JhcHBlclwiKTtcblx0XHR0aGlzLnRpdGxlID0gbmV3IEhUTUxFbGVtZW50KFwiaDNcIiwgXCJ0aXRsZVwiLCBwcm9qLnRpdGxlLCB0aGlzLndyYXBwZXIuZG9tKTtcblx0XHR0aGlzLmR1ZURhdGUgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZHVlLWRhdGVcIixcblx0XHRcdHByb2ouZHVlRGF0ZSxcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIixcblx0XHRcdHByb2ouZGVzY3JpcHRpb24sXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmJ0bldyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImRpdlwiLFxuXHRcdFx0XCJjYXJkLWJ0bi13cmFwcGVyXCIsXG5cdFx0XHRcIlwiLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5lZGl0QnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZWRpdC1idG5cIixcblx0XHRcdFwiRWRpdFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZWxldGVCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJkZWxldGUtYnRuXCIsXG5cdFx0XHRcIlhcIixcblx0XHRcdHRoaXMuYnRuV3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIuZG9tKTtcblxuXHRcdHRoaXMuZGVsZXRlQnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0ZGVsZXRlUHJvamVjdCh0aGlzLmlkLCBcInByb2plY3RzXCIpO1xuXHRcdFx0dGhpcy53cmFwcGVyLmRvbS5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZWRpdEJ0bi5kb20uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdG1vZGFsLm9wZW5Nb2RhbChwcm9qLCB0aGlzKTtcblx0XHRcdG1vZGFsLnR1cm5PbkVkaXRNb2RlKHByb2opO1xuXHRcdH0pO1xuXHR9XG5cdGdldENhcmQoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0ZWRpdENhcmQobmV3RGV0YWlscykge1xuXHRcdHRoaXMudGl0bGUuZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy50aXRsZTtcblx0XHR0aGlzLmR1ZURhdGUuZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy5kdWVEYXRlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24uZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy5kZXNjcmlwdGlvbjtcblx0fVxufVxuXG5leHBvcnQgeyBDYXJkIH07XG4iLCJpbXBvcnQgeyBhZGRQcm9qZWN0RGF0YSwgZWRpdFByb2plY3REYXRhIH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL2NhcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1mb3JtXCIpO1xuXHRcdHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC13cmFwcGVyXCIpO1xuXHRcdGNvbnN0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcblx0XHRjb25zdCBjYW5jZWxQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtcHJvamVjdC1idG5cIik7XG5cdFx0Y29uc3Qgc3VibWl0UHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LXByb2plY3QtYnRuXCIpO1xuXHRcdHRoaXMudGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG5cdFx0dGhpcy5kdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIik7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcblx0XHR0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cdFx0dGhpcy5lZGl0RGF0YSA9IFwiXCI7XG5cblx0XHRhZGRQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcblx0XHR9KTtcblxuXHRcdGNhbmNlbFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnR1cm5PZmZFZGl0TW9kZSgpO1xuXHRcdFx0dGhpcy5mb3JtRWxlbWVudC5yZXNldCgpO1xuXG5cdFx0XHR0aGlzLmRpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXG5cdFx0c3VibWl0UHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuXHRcdFx0fTtcblx0XHRcdC8qKiBpZiB0aGlzIGlzIGEgbmV3IHByb2plY3Q6ICovXG5cdFx0XHRpZiAodGhpcy5lZGl0TW9kZSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRsZXQgcmFuZG9tTnVtYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg1MDAgLSAxICsgMSkpICsgMTtcblx0XHRcdFx0ZGF0YS5pZCA9XG5cdFx0XHRcdFx0ZGF0YS50aXRsZVswXSArIGRhdGEudGl0bGVbMl0gKyBkYXRhLnRpdGxlWzNdICsgXCItXCIgKyByYW5kb21OdW1iO1xuXG5cdFx0XHRcdGxldCBuZXdEYXRhU3RvcmVkID0gYWRkUHJvamVjdERhdGEoZGF0YSwgXCJwcm9qZWN0c1wiKTtcblxuXHRcdFx0XHRuZXcgQ2FyZChcblx0XHRcdFx0XHRuZXdEYXRhU3RvcmVkLFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0LXdyYXBwZXJcIiksXG5cdFx0XHRcdFx0dGhpc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHQvLyoqIGVsc2UgeW91IGFyZSBlZGl0aW5nIGEgcHJvamVjdDogKi9cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGEuaWQgPSB0aGlzLmVkaXREYXRhLmlkO1xuXHRcdFx0XHRsZXQgbmV3RGF0YVN0b3JlZCA9IGVkaXRQcm9qZWN0RGF0YShkYXRhLCBcInByb2plY3RzXCIpO1xuXHRcdFx0XHR0aGlzLmNhcmQuZWRpdENhcmQobmV3RGF0YVN0b3JlZCk7XG5cdFx0XHRcdHRoaXMudHVybk9mZkVkaXRNb2RlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZvcm1FbGVtZW50LnJlc2V0KCk7XG5cdFx0XHR0aGlzLmRpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXHR9XG5cdHR1cm5PbkVkaXRNb2RlKGRhdGEpIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcblx0XHR0aGlzLmVkaXREYXRhID0gZGF0YTtcblx0fVxuXHR0dXJuT2ZmRWRpdE1vZGUoKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuXHRcdHRoaXMuZWRpdERhdGEgPSBcIlwiO1xuXHR9XG5cdG9wZW5Nb2RhbChwcm9qZWN0RGF0YSwgY2FyZCkge1xuXHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdHRoaXMudGl0bGVJbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLnRpdGxlO1xuXHRcdHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlID0gcHJvamVjdERhdGEuZHVlRGF0ZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS5kZXNjcmlwdGlvbjtcblx0XHR0aGlzLmNhcmQgPSBjYXJkO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBpc1N0b3JhZ2VBdmFpbGFibGUoKSB7XG5cdGxldCBzdG9yYWdlO1xuXHR0cnkge1xuXHRcdHN0b3JhZ2UgPSB3aW5kb3dbXCJsb2NhbFN0b3JhZ2VcIl07XG5cdFx0Y29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuXHRcdHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcblx0XHRzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuXHRcdFx0Ly8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuXHRcdFx0KGUuY29kZSA9PT0gMjIgfHxcblx0XHRcdFx0Ly8gRmlyZWZveFxuXHRcdFx0XHRlLmNvZGUgPT09IDEwMTQgfHxcblx0XHRcdFx0Ly8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG5cdFx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG5cdFx0XHQvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuXHRcdFx0c3RvcmFnZSAmJlxuXHRcdFx0c3RvcmFnZS5sZW5ndGggIT09IDBcblx0XHQpO1xuXHR9XG59XG5cbmNsYXNzIFN0b3JhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuXHRcdGlmIChpc1N0b3JhZ2VBdmFpbGFibGUoKSA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRcdFx0aWYgKHRoaXMucHJvamVjdHMpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVc2VyIGhhcyBleGlzdGluZyBTdG9yYWdlOlwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgbm8gcHJldmlvdXMgZGF0YS5cIik7XG5cdFx0XHRcdGxldCBuZXdTdG9yYWdlID0ge1xuXHRcdFx0XHRcdGFjdGl2ZTogW10sXG5cdFx0XHRcdFx0YXJjaGl2ZWQ6IFtdLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkobmV3U3RvcmFnZSkpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRcdFx0XHR0aGlzLnByb2plY3RzID0gbmV3U3RvcmFnZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0SWQsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXG5cdGxldCB0b0tlZXAgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IHByb2plY3RJZCk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gdG9LZWVwO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdERhdGEoZGF0YSwgbG9jYXRpb24pIHtcblx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0c3RvcmFnZS5hY3RpdmUucHVzaChkYXRhKTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cblx0bGV0IG5ld1Byb2plY3REYXRhID0gc3RvcmFnZS5hY3RpdmVbc3RvcmFnZS5hY3RpdmUubGVuZ3RoIC0gMV07XG5cdHJldHVybiBuZXdQcm9qZWN0RGF0YTtcbn1cbmZ1bmN0aW9uIGVkaXRQcm9qZWN0RGF0YShkYXRhLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0bGV0IGVkaXRlZFN0b3JhZ2UgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoXG5cdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IGRhdGEuaWRcblx0KTtcblx0ZWRpdGVkU3RvcmFnZS5wdXNoKGRhdGEpO1xuXHRzdG9yYWdlLmFjdGl2ZSA9IGVkaXRlZFN0b3JhZ2U7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSkpO1xuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuXG5leHBvcnQge1xuXHRpc1N0b3JhZ2VBdmFpbGFibGUsXG5cdFN0b3JhZ2UsXG5cdGFkZFByb2plY3REYXRhLFxuXHRkZWxldGVQcm9qZWN0LFxuXHRlZGl0UHJvamVjdERhdGEsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgTW9kYWwgZnJvbSBcIi4vbW9kdWxlcy9tb2RhbFwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL21vZHVsZXMvY2FyZFwiO1xuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRjb25zdCBwcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdGxldCBwcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cblx0XHRsZXQgbW9kYWwgPSBuZXcgTW9kYWwoKTtcblx0XHRpZiAocHJvamVjdFN0b3JhZ2UucHJvamVjdHMuYWN0aXZlLmxlbmd0aCA+IDApIHtcblx0XHRcdHByb2plY3RTdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdG5ldyBDYXJkKHByb2plY3QsIHByb2pMaXN0V3JhcHBlciwgbW9kYWwpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=