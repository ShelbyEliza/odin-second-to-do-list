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
/* harmony export */   Card: () => (/* binding */ Card),
/* harmony export */   HTMLElement: () => (/* binding */ HTMLElement)
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
	removeFromClassList(className) {
		this.dom.classList.remove(className);
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
		this.priority = proj.priority;
		if (this.priority === true) {
			this.wrapper.addToClassList("priority");
		}
		this.toDoList = new HTMLElement(
			"ul",
			"to-do-list",
			"To Do:",
			this.wrapper.dom
		);
		// this.toDoListInfo = proj.toDoList
		if (proj.toDos) {
			proj.toDos.forEach((toDo) => {
				new HTMLElement("li", "to-do-item", toDo, this.toDoList.dom);
			});
		}
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
		while (this.toDoList.dom.firstChild) {
			this.toDoList.dom.removeChild(this.toDoList.dom.lastChild);
		}
		newDetails.toDos.forEach((toDo) => {
			new HTMLElement("li", "to-to-item", toDo, this.toDoList.dom);
		});

		if (this.priority !== newDetails.priority) {
			this.priority = newDetails.priority;
			if (this.priority === true) {
				this.wrapper.addToClassList("priority");
			} else {
				this.wrapper.removeFromClassList("priority");
			}
		}
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
		const addToDoBtn = document.getElementById("add-to-do-btn");
		const addProjBtn = document.getElementById("add-project-btn");
		const cancelProjBtn = document.getElementById("cancel-project-btn");
		const submitProjBtn = document.getElementById("submit-project-btn");
		this.titleInput = document.getElementById("title");
		this.dueDateInput = document.getElementById("dueDate");
		this.descriptionInput = document.getElementById("description");
		this.priorityInput = document.getElementById("priority");
		this.toDoInput = document.getElementById("to-do");
		this.toDoDiv = document.getElementById("to-do-list-div");
		this.editMode = false;
		this.editData = "";
		this.toDoData = [];

		addProjBtn.addEventListener("click", () => {
			this.dialog.showModal();
		});

		addToDoBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (!this.toDoData) {
				this.toDoData = [];
			}
			if (this.toDoInput.value !== "") {
				if (this.toDoData.includes(this.toDoInput.value)) {
					console.log("To do already exists.");
				} else {
					let newToDo = this.toDoInput.value;

					this.toDoData.push(newToDo);
					this.createToDoDom(newToDo);
				}
			}

			this.toDoInput.value = "";
			this.toDoInput.focus();
		});

		cancelProjBtn.addEventListener("click", (e) => {
			e.preventDefault();
			this.turnOffEditMode();
			while (this.toDoDiv.firstChild) {
				this.toDoDiv.removeChild(this.toDoDiv.lastChild);
			}
			this.toDoData = [];

			this.formElement.reset();

			this.dialog.close();
		});

		submitProjBtn.addEventListener("click", (e) => {
			e.preventDefault();

			let data = {
				title: this.titleInput.value,
				dueDate: this.dueDateInput.value,
				description: this.descriptionInput.value,
				priority: this.priorityInput.checked,
				toDos: this.toDoData,
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
			/** Reset to do list: */
			while (this.toDoDiv.firstChild) {
				this.toDoDiv.removeChild(this.toDoDiv.lastChild);
			}
			this.toDoData = [];
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
		this.priorityInput.checked = projectData.priority;
		this.toDoData = projectData.toDos;
		if (this.toDoData && this.toDoData.length > 0) {
			this.toDoData.forEach((toDo) => {
				this.createToDoDom(toDo);
			});
		}
		this.card = card;
	}
	createToDoDom(newToDo) {
		let tempDiv = new _card__WEBPACK_IMPORTED_MODULE_1__.HTMLElement("div", "temp-to-do-div", "", this.toDoDiv);
		new _card__WEBPACK_IMPORTED_MODULE_1__.HTMLElement("p", "temp-to-to-item", newToDo, tempDiv.dom);
		let deleteToDoBtn = new _card__WEBPACK_IMPORTED_MODULE_1__.HTMLElement(
			"button",
			"delete-to-do-btn",
			"X",
			tempDiv.dom
		);

		deleteToDoBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("I am deleting a to do");

			let indexToDelete = this.toDoData.findIndex((toDo) => toDo === newToDo);
			this.toDoData.splice(indexToDelete, 1);
			tempDiv.dom.remove();
		});
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
	console.log(data);
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




/***/ }),

/***/ "./src/modules/views.js":
/*!******************************!*\
  !*** ./src/modules/views.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View),
/* harmony export */   Views: () => (/* binding */ Views)
/* harmony export */ });
class Views {
	constructor() {
		this.allViews = [];
	}
	switchView(newView, prevView) {
		if (newView.id !== prevView.id) {
		}
	}
}
class View extends Views {
	constructor() {
		super();
	}
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
/* harmony import */ var _modules_views__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/views */ "./src/modules/views.js");





class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		const allProjectsWrapper = new _modules_card__WEBPACK_IMPORTED_MODULE_2__.HTMLElement("div", "all-projects-wrapper");
		const priorityProjectsWrapper = new _modules_card__WEBPACK_IMPORTED_MODULE_2__.HTMLElement(
			"div",
			"priority-projects-wrapper"
		);
		const upComingProjectsWrapper = new _modules_card__WEBPACK_IMPORTED_MODULE_2__.HTMLElement(
			"div",
			"up-coming-projects-wrapper"
		);

		const priorityBtn = document.getElementById("priority-btn");
		priorityBtn.addEventListener("click", (e) => {
			e.preventDefault();
		});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVFFOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXVCOzs7Ozs7O1VDZnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDZDtBQUNlO0FBQ1o7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzREFBVztBQUM1QyxzQ0FBc0Msc0RBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHNEQUFXO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMkJBQTJCLDJEQUFPOztBQUVsQyxrQkFBa0Isc0RBQUs7QUFDdkI7QUFDQTtBQUNBLFFBQVEsK0NBQUk7QUFDWixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy92aWV3cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlbGV0ZVByb2plY3QgfSBmcm9tIFwiLi9zdG9yYWdlSGVscGVyXCI7XG5cbmNsYXNzIEhUTUxFbGVtZW50IHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgY2xhc3NOYW1lLCB0ZXh0Q29udGVudCwgcGFyZW50RG9tKSB7XG5cdFx0dGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGlmIChjbGFzc05hbWUubGVuZ3RoID49IDApIHtcblx0XHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHRleHRDb250ZW50KSB7XG5cdFx0XHR0aGlzLmRvbS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuXHRcdFx0aWYgKGVsZW1lbnQgPT09IFwiYnV0dG9uXCIpIHtcblx0XHRcdFx0dGhpcy5kb20udmFsdWUgPSB0ZXh0Q29udGVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBhcmVudERvbSkge1xuXHRcdFx0dGhpcy5hcHBlbmRUb1BhcmVudChwYXJlbnREb20pO1xuXHRcdH1cblx0fVxuXHRhZGRUb0NsYXNzTGlzdChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdH1cblx0cmVtb3ZlRnJvbUNsYXNzTGlzdChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmRvbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG5cdH1cblx0YXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKSB7XG5cdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKHRoaXMuZG9tKTtcblx0fVxufVxuXG5jbGFzcyBDYXJkIHtcblx0Y29uc3RydWN0b3IocHJvaiwgcGFyZW50RG9tLCBtb2RhbCkge1xuXHRcdHRoaXMuaWQgPSBwcm9qLmlkO1xuXHRcdHRoaXMud3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcImNhcmQtd3JhcHBlclwiKTtcblx0XHR0aGlzLnRpdGxlID0gbmV3IEhUTUxFbGVtZW50KFwiaDNcIiwgXCJ0aXRsZVwiLCBwcm9qLnRpdGxlLCB0aGlzLndyYXBwZXIuZG9tKTtcblx0XHR0aGlzLmR1ZURhdGUgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZHVlLWRhdGVcIixcblx0XHRcdHByb2ouZHVlRGF0ZSxcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIixcblx0XHRcdHByb2ouZGVzY3JpcHRpb24sXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLnByaW9yaXR5ID0gcHJvai5wcmlvcml0eTtcblx0XHRpZiAodGhpcy5wcmlvcml0eSA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmFkZFRvQ2xhc3NMaXN0KFwicHJpb3JpdHlcIik7XG5cdFx0fVxuXHRcdHRoaXMudG9Eb0xpc3QgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInVsXCIsXG5cdFx0XHRcInRvLWRvLWxpc3RcIixcblx0XHRcdFwiVG8gRG86XCIsXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHQvLyB0aGlzLnRvRG9MaXN0SW5mbyA9IHByb2oudG9Eb0xpc3Rcblx0XHRpZiAocHJvai50b0Rvcykge1xuXHRcdFx0cHJvai50b0Rvcy5mb3JFYWNoKCh0b0RvKSA9PiB7XG5cdFx0XHRcdG5ldyBIVE1MRWxlbWVudChcImxpXCIsIFwidG8tZG8taXRlbVwiLCB0b0RvLCB0aGlzLnRvRG9MaXN0LmRvbSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy5idG5XcmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJkaXZcIixcblx0XHRcdFwiY2FyZC1idG4td3JhcHBlclwiLFxuXHRcdFx0XCJcIixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZWRpdEJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImVkaXQtYnRuXCIsXG5cdFx0XHRcIkVkaXRcIixcblx0XHRcdHRoaXMuYnRuV3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZGVsZXRlQnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZGVsZXRlLWJ0blwiLFxuXHRcdFx0XCJYXCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLmRvbSk7XG5cblx0XHR0aGlzLmRlbGV0ZUJ0bi5kb20uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGRlbGV0ZVByb2plY3QodGhpcy5pZCwgXCJwcm9qZWN0c1wiKTtcblx0XHRcdHRoaXMud3JhcHBlci5kb20ucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmVkaXRCdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRtb2RhbC5vcGVuTW9kYWwocHJvaiwgdGhpcyk7XG5cdFx0XHRtb2RhbC50dXJuT25FZGl0TW9kZShwcm9qKTtcblx0XHR9KTtcblx0fVxuXHRnZXRDYXJkKCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdGVkaXRDYXJkKG5ld0RldGFpbHMpIHtcblx0XHR0aGlzLnRpdGxlLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMudGl0bGU7XG5cdFx0dGhpcy5kdWVEYXRlLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMuZHVlRGF0ZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMuZGVzY3JpcHRpb247XG5cdFx0d2hpbGUgKHRoaXMudG9Eb0xpc3QuZG9tLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHRoaXMudG9Eb0xpc3QuZG9tLnJlbW92ZUNoaWxkKHRoaXMudG9Eb0xpc3QuZG9tLmxhc3RDaGlsZCk7XG5cdFx0fVxuXHRcdG5ld0RldGFpbHMudG9Eb3MuZm9yRWFjaCgodG9EbykgPT4ge1xuXHRcdFx0bmV3IEhUTUxFbGVtZW50KFwibGlcIiwgXCJ0by10by1pdGVtXCIsIHRvRG8sIHRoaXMudG9Eb0xpc3QuZG9tKTtcblx0XHR9KTtcblxuXHRcdGlmICh0aGlzLnByaW9yaXR5ICE9PSBuZXdEZXRhaWxzLnByaW9yaXR5KSB7XG5cdFx0XHR0aGlzLnByaW9yaXR5ID0gbmV3RGV0YWlscy5wcmlvcml0eTtcblx0XHRcdGlmICh0aGlzLnByaW9yaXR5ID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRUb0NsYXNzTGlzdChcInByaW9yaXR5XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUZyb21DbGFzc0xpc3QoXCJwcmlvcml0eVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IHsgQ2FyZCwgSFRNTEVsZW1lbnQgfTtcbiIsImltcG9ydCB7IGFkZFByb2plY3REYXRhLCBlZGl0UHJvamVjdERhdGEgfSBmcm9tIFwiLi9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgeyBDYXJkLCBIVE1MRWxlbWVudCB9IGZyb20gXCIuL2NhcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1mb3JtXCIpO1xuXHRcdHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC13cmFwcGVyXCIpO1xuXHRcdGNvbnN0IGFkZFRvRG9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10by1kby1idG5cIik7XG5cdFx0Y29uc3QgYWRkUHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3QtYnRuXCIpO1xuXHRcdGNvbnN0IGNhbmNlbFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbC1wcm9qZWN0LWJ0blwiKTtcblx0XHRjb25zdCBzdWJtaXRQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtcHJvamVjdC1idG5cIik7XG5cdFx0dGhpcy50aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKTtcblx0XHR0aGlzLmR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuXHRcdHRoaXMucHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG5cdFx0dGhpcy50b0RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvLWRvXCIpO1xuXHRcdHRoaXMudG9Eb0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG8tZG8tbGlzdC1kaXZcIik7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuXHRcdHRoaXMuZWRpdERhdGEgPSBcIlwiO1xuXHRcdHRoaXMudG9Eb0RhdGEgPSBbXTtcblxuXHRcdGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0YWRkVG9Eb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmICghdGhpcy50b0RvRGF0YSkge1xuXHRcdFx0XHR0aGlzLnRvRG9EYXRhID0gW107XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy50b0RvSW5wdXQudmFsdWUgIT09IFwiXCIpIHtcblx0XHRcdFx0aWYgKHRoaXMudG9Eb0RhdGEuaW5jbHVkZXModGhpcy50b0RvSW5wdXQudmFsdWUpKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJUbyBkbyBhbHJlYWR5IGV4aXN0cy5cIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGV0IG5ld1RvRG8gPSB0aGlzLnRvRG9JbnB1dC52YWx1ZTtcblxuXHRcdFx0XHRcdHRoaXMudG9Eb0RhdGEucHVzaChuZXdUb0RvKTtcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZVRvRG9Eb20obmV3VG9Ebyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy50b0RvSW5wdXQudmFsdWUgPSBcIlwiO1xuXHRcdFx0dGhpcy50b0RvSW5wdXQuZm9jdXMoKTtcblx0XHR9KTtcblxuXHRcdGNhbmNlbFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnR1cm5PZmZFZGl0TW9kZSgpO1xuXHRcdFx0d2hpbGUgKHRoaXMudG9Eb0Rpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdHRoaXMudG9Eb0Rpdi5yZW1vdmVDaGlsZCh0aGlzLnRvRG9EaXYubGFzdENoaWxkKTtcblx0XHRcdH1cblx0XHRcdHRoaXMudG9Eb0RhdGEgPSBbXTtcblxuXHRcdFx0dGhpcy5mb3JtRWxlbWVudC5yZXNldCgpO1xuXG5cdFx0XHR0aGlzLmRpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXG5cdFx0c3VibWl0UHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuXHRcdFx0XHRwcmlvcml0eTogdGhpcy5wcmlvcml0eUlucHV0LmNoZWNrZWQsXG5cdFx0XHRcdHRvRG9zOiB0aGlzLnRvRG9EYXRhLFxuXHRcdFx0fTtcblx0XHRcdC8qKiBpZiB0aGlzIGlzIGEgbmV3IHByb2plY3Q6ICovXG5cdFx0XHRpZiAodGhpcy5lZGl0TW9kZSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRsZXQgcmFuZG9tTnVtYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg1MDAgLSAxICsgMSkpICsgMTtcblx0XHRcdFx0ZGF0YS5pZCA9XG5cdFx0XHRcdFx0ZGF0YS50aXRsZVswXSArIGRhdGEudGl0bGVbMl0gKyBkYXRhLnRpdGxlWzNdICsgXCItXCIgKyByYW5kb21OdW1iO1xuXG5cdFx0XHRcdGxldCBuZXdEYXRhU3RvcmVkID0gYWRkUHJvamVjdERhdGEoZGF0YSwgXCJwcm9qZWN0c1wiKTtcblxuXHRcdFx0XHRuZXcgQ2FyZChcblx0XHRcdFx0XHRuZXdEYXRhU3RvcmVkLFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0LXdyYXBwZXJcIiksXG5cdFx0XHRcdFx0dGhpc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHQvLyoqIGVsc2UgeW91IGFyZSBlZGl0aW5nIGEgcHJvamVjdDogKi9cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGEuaWQgPSB0aGlzLmVkaXREYXRhLmlkO1xuXHRcdFx0XHRsZXQgbmV3RGF0YVN0b3JlZCA9IGVkaXRQcm9qZWN0RGF0YShkYXRhLCBcInByb2plY3RzXCIpO1xuXHRcdFx0XHR0aGlzLmNhcmQuZWRpdENhcmQobmV3RGF0YVN0b3JlZCk7XG5cdFx0XHRcdHRoaXMudHVybk9mZkVkaXRNb2RlKCk7XG5cdFx0XHR9XG5cdFx0XHQvKiogUmVzZXQgdG8gZG8gbGlzdDogKi9cblx0XHRcdHdoaWxlICh0aGlzLnRvRG9EaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHR0aGlzLnRvRG9EaXYucmVtb3ZlQ2hpbGQodGhpcy50b0RvRGl2Lmxhc3RDaGlsZCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvRG9EYXRhID0gW107XG5cdFx0XHR0aGlzLmZvcm1FbGVtZW50LnJlc2V0KCk7XG5cdFx0XHR0aGlzLmRpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXHR9XG5cdHR1cm5PbkVkaXRNb2RlKGRhdGEpIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcblx0XHR0aGlzLmVkaXREYXRhID0gZGF0YTtcblx0fVxuXHR0dXJuT2ZmRWRpdE1vZGUoKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuXHRcdHRoaXMuZWRpdERhdGEgPSBcIlwiO1xuXHR9XG5cdG9wZW5Nb2RhbChwcm9qZWN0RGF0YSwgY2FyZCkge1xuXHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdHRoaXMudGl0bGVJbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLnRpdGxlO1xuXHRcdHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlID0gcHJvamVjdERhdGEuZHVlRGF0ZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS5kZXNjcmlwdGlvbjtcblx0XHR0aGlzLnByaW9yaXR5SW5wdXQuY2hlY2tlZCA9IHByb2plY3REYXRhLnByaW9yaXR5O1xuXHRcdHRoaXMudG9Eb0RhdGEgPSBwcm9qZWN0RGF0YS50b0Rvcztcblx0XHRpZiAodGhpcy50b0RvRGF0YSAmJiB0aGlzLnRvRG9EYXRhLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMudG9Eb0RhdGEuZm9yRWFjaCgodG9EbykgPT4ge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVRvRG9Eb20odG9Ebyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy5jYXJkID0gY2FyZDtcblx0fVxuXHRjcmVhdGVUb0RvRG9tKG5ld1RvRG8pIHtcblx0XHRsZXQgdGVtcERpdiA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcInRlbXAtdG8tZG8tZGl2XCIsIFwiXCIsIHRoaXMudG9Eb0Rpdik7XG5cdFx0bmV3IEhUTUxFbGVtZW50KFwicFwiLCBcInRlbXAtdG8tdG8taXRlbVwiLCBuZXdUb0RvLCB0ZW1wRGl2LmRvbSk7XG5cdFx0bGV0IGRlbGV0ZVRvRG9CdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJkZWxldGUtdG8tZG8tYnRuXCIsXG5cdFx0XHRcIlhcIixcblx0XHRcdHRlbXBEaXYuZG9tXG5cdFx0KTtcblxuXHRcdGRlbGV0ZVRvRG9CdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJJIGFtIGRlbGV0aW5nIGEgdG8gZG9cIik7XG5cblx0XHRcdGxldCBpbmRleFRvRGVsZXRlID0gdGhpcy50b0RvRGF0YS5maW5kSW5kZXgoKHRvRG8pID0+IHRvRG8gPT09IG5ld1RvRG8pO1xuXHRcdFx0dGhpcy50b0RvRGF0YS5zcGxpY2UoaW5kZXhUb0RlbGV0ZSwgMSk7XG5cdFx0XHR0ZW1wRGl2LmRvbS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufVxuIiwiZnVuY3Rpb24gaXNTdG9yYWdlQXZhaWxhYmxlKCkge1xuXHRsZXQgc3RvcmFnZTtcblx0dHJ5IHtcblx0XHRzdG9yYWdlID0gd2luZG93W1wibG9jYWxTdG9yYWdlXCJdO1xuXHRcdGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcblx0XHRzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG5cdFx0c3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcblx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdChlLmNvZGUgPT09IDIyIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5jb2RlID09PSAxMDE0IHx8XG5cdFx0XHRcdC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuXHRcdFx0XHQvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuXHRcdFx0XHQvLyBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuXHRcdFx0Ly8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcblx0XHRcdHN0b3JhZ2UgJiZcblx0XHRcdHN0b3JhZ2UubGVuZ3RoICE9PSAwXG5cdFx0KTtcblx0fVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcblx0Y29uc3RydWN0b3IobG9jYXRpb24pIHtcblx0XHRpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKCkgPT09IHRydWUpIHtcblx0XHRcdHRoaXMucHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0XHRcdGlmICh0aGlzLnByb2plY3RzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgZXhpc3RpbmcgU3RvcmFnZTpcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVzZXIgaGFzIG5vIHByZXZpb3VzIGRhdGEuXCIpO1xuXHRcdFx0XHRsZXQgbmV3U3RvcmFnZSA9IHtcblx0XHRcdFx0XHRhY3RpdmU6IFtdLFxuXHRcdFx0XHRcdGFyY2hpdmVkOiBbXSxcblx0XHRcdFx0fTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2UpKTtcblx0XHRcdFx0Y29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0XHRcdFx0dGhpcy5wcm9qZWN0cyA9IG5ld1N0b3JhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdElkLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRsZXQgdG9LZWVwID0gc3RvcmFnZS5hY3RpdmUuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQpO1xuXHRzdG9yYWdlLmFjdGl2ZSA9IHRvS2VlcDtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRzdG9yYWdlLmFjdGl2ZS5wdXNoKGRhdGEpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcblxuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuZnVuY3Rpb24gZWRpdFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRsZXQgZWRpdGVkU3RvcmFnZSA9IHN0b3JhZ2UuYWN0aXZlLmZpbHRlcihcblx0XHQocHJvamVjdCkgPT4gcHJvamVjdC5pZCAhPT0gZGF0YS5pZFxuXHQpO1xuXHRlZGl0ZWRTdG9yYWdlLnB1c2goZGF0YSk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gZWRpdGVkU3RvcmFnZTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cdGxldCBuZXdQcm9qZWN0RGF0YSA9IHN0b3JhZ2UuYWN0aXZlW3N0b3JhZ2UuYWN0aXZlLmxlbmd0aCAtIDFdO1xuXHRyZXR1cm4gbmV3UHJvamVjdERhdGE7XG59XG5cbmV4cG9ydCB7XG5cdGlzU3RvcmFnZUF2YWlsYWJsZSxcblx0U3RvcmFnZSxcblx0YWRkUHJvamVjdERhdGEsXG5cdGRlbGV0ZVByb2plY3QsXG5cdGVkaXRQcm9qZWN0RGF0YSxcbn07XG4iLCJjbGFzcyBWaWV3cyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuYWxsVmlld3MgPSBbXTtcblx0fVxuXHRzd2l0Y2hWaWV3KG5ld1ZpZXcsIHByZXZWaWV3KSB7XG5cdFx0aWYgKG5ld1ZpZXcuaWQgIT09IHByZXZWaWV3LmlkKSB7XG5cdFx0fVxuXHR9XG59XG5jbGFzcyBWaWV3IGV4dGVuZHMgVmlld3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG59XG5cbmV4cG9ydCB7IFZpZXcsIFZpZXdzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9tb2R1bGVzL3N0b3JhZ2VIZWxwZXJcIjtcbmltcG9ydCBNb2RhbCBmcm9tIFwiLi9tb2R1bGVzL21vZGFsXCI7XG5pbXBvcnQgeyBDYXJkLCBIVE1MRWxlbWVudCB9IGZyb20gXCIuL21vZHVsZXMvY2FyZFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL21vZHVsZXMvdmlld3NcIjtcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Y29uc3QgcHJvakxpc3RXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3Qtd3JhcHBlclwiKTtcblx0XHRjb25zdCBhbGxQcm9qZWN0c1dyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnQoXCJkaXZcIiwgXCJhbGwtcHJvamVjdHMtd3JhcHBlclwiKTtcblx0XHRjb25zdCBwcmlvcml0eVByb2plY3RzV3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiZGl2XCIsXG5cdFx0XHRcInByaW9yaXR5LXByb2plY3RzLXdyYXBwZXJcIlxuXHRcdCk7XG5cdFx0Y29uc3QgdXBDb21pbmdQcm9qZWN0c1dyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImRpdlwiLFxuXHRcdFx0XCJ1cC1jb21pbmctcHJvamVjdHMtd3JhcHBlclwiXG5cdFx0KTtcblxuXHRcdGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eS1idG5cIik7XG5cdFx0cHJpb3JpdHlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cdFx0bGV0IHByb2plY3RTdG9yYWdlID0gbmV3IFN0b3JhZ2UoXCJwcm9qZWN0c1wiKTtcblxuXHRcdGxldCBtb2RhbCA9IG5ldyBNb2RhbCgpO1xuXHRcdGlmIChwcm9qZWN0U3RvcmFnZS5wcm9qZWN0cy5hY3RpdmUubGVuZ3RoID4gMCkge1xuXHRcdFx0cHJvamVjdFN0b3JhZ2UucHJvamVjdHMuYWN0aXZlLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0bmV3IENhcmQocHJvamVjdCwgcHJvakxpc3RXcmFwcGVyLCBtb2RhbCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==