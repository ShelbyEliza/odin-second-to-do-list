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
	constructor(proj, parentDom, modal, expanded) {
		this.id = proj.id;
		this.wrapper = new HTMLElement("div", "card-wrapper");
		this.wrapper.dom.id = proj.id;
		this.wrapper.dom.dataset.priority = proj.priority;
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
		this.expandBtn = new HTMLElement(
			"button",
			"expand-btn",
			"Expand",
			this.btnWrapper.dom
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

		this.expandBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();
			let projectDialog = document.getElementById("project-expanded-wrapper");

			projectDialog.showModal();
			expanded.expandProject(this.id, this);
		});

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
			this.wrapper.dom.dataset.priority = newDetails.priority;
			if (this.priority === true) {
				this.wrapper.addToClassList("priority");
			} else {
				this.wrapper.removeFromClassList("priority");
			}
		}
		// let location = document.location
		document.location.reload();
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
				let parentDom;

				if (newDataStored.priority === true) {
					parentDom = document.getElementById("priority-list-wrapper");
				} else {
					parentDom = document.getElementById("project-list-wrapper");
				}

				new _card__WEBPACK_IMPORTED_MODULE_1__.Card(newDataStored, parentDom, this);

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

/***/ "./src/modules/projectExpanded.js":
/*!****************************************!*\
  !*** ./src/modules/projectExpanded.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectExpanded)
/* harmony export */ });
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./src/modules/card.js");
/* harmony import */ var _storageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storageHelper */ "./src/modules/storageHelper.js");



class ProjectExpanded {
	constructor(editModal) {
		this.projectDialog = document.getElementById("project-expanded-wrapper");
		this.editDialog = document.getElementById("add-project-wrapper");
		this.editModal = editModal;

		const closeBtn = document.getElementById("close-proj-btn");
		const editBtn = document.getElementById("edit-proj-btn");
		const deleteBtn = document.getElementById("delete-proj-btn");

		this.title = document.querySelector(".title-ex");
		this.dueDate = document.querySelector(".due-date-ex");
		this.description = document.querySelector(".description-ex");
		this.toDoWrapper = document.querySelector(".to-do-list-ex");

		closeBtn.addEventListener("click", (e) => {
			e.preventDefault();

			this.projectDialog.close();
		});

		deleteBtn.addEventListener("click", (e) => {
			e.preventDefault();

			(0,_storageHelper__WEBPACK_IMPORTED_MODULE_1__.deleteProject)(this.id, "projects");

			this.clearDom();
			this.projectDialog.close();
			document.location.reload();
		});

		editBtn.addEventListener("click", (e) => {
			e.preventDefault();

			this.projectDialog.close();

			let project = this.getProject(this.id);
			this.editModal.openModal(project, this.card);
			this.editModal.turnOnEditMode(project);

			this.clearDom();
		});
	}
	clearDom() {
		this.title.textContent = "";
		this.dueDate.textContent = "";
		this.description.textContent = "";
		this.projectDialog.dataset.projectId = "";
		this.id = "";
		this.card = "";
	}
	getProject(projId) {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;
		let project = activeProjects.find((proj) => proj.id === projId);
		return project;
	}
	expandProject(projId, card) {
		let project = this.getProject(projId);
		this.title.textContent = project.title;
		this.dueDate.textContent = project.dueDate;
		this.description.textContent = project.description;
		this.id = project.id;
		this.card = card;

		let classes = Array.from(this.projectDialog.classList);

		if (project.priority === true) {
			if (!classes.includes("priority")) {
				this.projectDialog.classList.add("priority");
			}
		} else {
			if (classes.includes("priority")) {
				this.projectDialog.classList.remove("priority");
			}
		}
		if (project.toDos.length > 0) {
			this.createToDoDom(project.toDos);
		}
	}

	createToDoDom(toDos) {
		toDos.forEach((toDo) => {
			new _card__WEBPACK_IMPORTED_MODULE_0__.HTMLElement("li", "to-to-item", toDo, this.toDoWrapper);
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

/***/ "./src/modules/switchView.js":
/*!***********************************!*\
  !*** ./src/modules/switchView.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/modules/card.js");
/* harmony import */ var _projectExpanded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectExpanded */ "./src/modules/projectExpanded.js");




class View {
	constructor() {
		this.projListWrapper = document.getElementById("project-list-wrapper");
		this.priorityListWrapper = document.getElementById("priority-list-wrapper");

		this.list = [];
		this.cardIds = [];
		this.active = "all";
		this.modal = new _modal__WEBPACK_IMPORTED_MODULE_0__["default"]();
		this.expanded = new _projectExpanded__WEBPACK_IMPORTED_MODULE_2__["default"](this.modal);

		this.setAllView();
	}
	switchView(view) {
		if (view === "all") {
			this.setAllView();
		}
		if (view === "priority") {
			this.setPriorityView();
		}
	}
	setAllView() {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;
		if (activeProjects.length > 0) {
			activeProjects.forEach((project) => {
				if (project.priority === false) {
					new _card__WEBPACK_IMPORTED_MODULE_1__.Card(project, this.projListWrapper, this.modal, this.expanded);
				} else if (project.priority === true) {
					new _card__WEBPACK_IMPORTED_MODULE_1__.Card(
						project,
						this.priorityListWrapper,
						this.modal,
						this.expanded
					);
				}
			});
		}
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
/* harmony import */ var _modules_switchView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/switchView */ "./src/modules/switchView.js");



class App {
	constructor() {
		this.projectStorage = new _modules_storageHelper__WEBPACK_IMPORTED_MODULE_0__.Storage("projects");
		this.view = new _modules_switchView__WEBPACK_IMPORTED_MODULE_1__["default"]();
	}
}
new App();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNWOztBQUV4QztBQUNBO0FBQ0EsNEJBQTRCLDJEQUFPO0FBQ25DLGtCQUFrQiwyREFBSTtBQUN0QjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL3Byb2plY3RFeHBhbmRlZC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9zd2l0Y2hWaWV3LmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVsZXRlUHJvamVjdCB9IGZyb20gXCIuL3N0b3JhZ2VIZWxwZXJcIjtcblxuY2xhc3MgSFRNTEVsZW1lbnQge1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBjbGFzc05hbWUsIHRleHRDb250ZW50LCBwYXJlbnREb20pIHtcblx0XHR0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0aWYgKGNsYXNzTmFtZS5sZW5ndGggPj0gMCkge1xuXHRcdFx0dGhpcy5kb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdH1cblx0XHRpZiAodGV4dENvbnRlbnQpIHtcblx0XHRcdHRoaXMuZG9tLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG5cdFx0XHRpZiAoZWxlbWVudCA9PT0gXCJidXR0b25cIikge1xuXHRcdFx0XHR0aGlzLmRvbS52YWx1ZSA9IHRleHRDb250ZW50O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocGFyZW50RG9tKSB7XG5cdFx0XHR0aGlzLmFwcGVuZFRvUGFyZW50KHBhcmVudERvbSk7XG5cdFx0fVxuXHR9XG5cdGFkZFRvQ2xhc3NMaXN0KGNsYXNzTmFtZSkge1xuXHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0fVxuXHRyZW1vdmVGcm9tQ2xhc3NMaXN0KGNsYXNzTmFtZSkge1xuXHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0fVxuXHRhcHBlbmRUb1BhcmVudChwYXJlbnREb20pIHtcblx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQodGhpcy5kb20pO1xuXHR9XG59XG5cbmNsYXNzIENhcmQge1xuXHRjb25zdHJ1Y3Rvcihwcm9qLCBwYXJlbnREb20sIG1vZGFsLCBleHBhbmRlZCkge1xuXHRcdHRoaXMuaWQgPSBwcm9qLmlkO1xuXHRcdHRoaXMud3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcImNhcmQtd3JhcHBlclwiKTtcblx0XHR0aGlzLndyYXBwZXIuZG9tLmlkID0gcHJvai5pZDtcblx0XHR0aGlzLndyYXBwZXIuZG9tLmRhdGFzZXQucHJpb3JpdHkgPSBwcm9qLnByaW9yaXR5O1xuXHRcdHRoaXMudGl0bGUgPSBuZXcgSFRNTEVsZW1lbnQoXCJoM1wiLCBcInRpdGxlXCIsIHByb2oudGl0bGUsIHRoaXMud3JhcHBlci5kb20pO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkdWUtZGF0ZVwiLFxuXHRcdFx0cHJvai5kdWVEYXRlLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0cHJvai5kZXNjcmlwdGlvbixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMucHJpb3JpdHkgPSBwcm9qLnByaW9yaXR5O1xuXHRcdGlmICh0aGlzLnByaW9yaXR5ID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkVG9DbGFzc0xpc3QoXCJwcmlvcml0eVwiKTtcblx0XHR9XG5cdFx0dGhpcy50b0RvTGlzdCA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwidWxcIixcblx0XHRcdFwidG8tZG8tbGlzdFwiLFxuXHRcdFx0XCJUbyBEbzpcIixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdC8vIHRoaXMudG9Eb0xpc3RJbmZvID0gcHJvai50b0RvTGlzdFxuXHRcdGlmIChwcm9qLnRvRG9zKSB7XG5cdFx0XHRwcm9qLnRvRG9zLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdFx0bmV3IEhUTUxFbGVtZW50KFwibGlcIiwgXCJ0by1kby1pdGVtXCIsIHRvRG8sIHRoaXMudG9Eb0xpc3QuZG9tKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmJ0bldyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImRpdlwiLFxuXHRcdFx0XCJjYXJkLWJ0bi13cmFwcGVyXCIsXG5cdFx0XHRcIlwiLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5leHBhbmRCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJleHBhbmQtYnRuXCIsXG5cdFx0XHRcIkV4cGFuZFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5lZGl0QnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZWRpdC1idG5cIixcblx0XHRcdFwiRWRpdFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZWxldGVCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJkZWxldGUtYnRuXCIsXG5cdFx0XHRcIlhcIixcblx0XHRcdHRoaXMuYnRuV3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIuZG9tKTtcblxuXHRcdHRoaXMuZXhwYW5kQnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGxldCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWV4cGFuZGVkLXdyYXBwZXJcIik7XG5cblx0XHRcdHByb2plY3REaWFsb2cuc2hvd01vZGFsKCk7XG5cdFx0XHRleHBhbmRlZC5leHBhbmRQcm9qZWN0KHRoaXMuaWQsIHRoaXMpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5kZWxldGVCdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRkZWxldGVQcm9qZWN0KHRoaXMuaWQsIFwicHJvamVjdHNcIik7XG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5lZGl0QnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bW9kYWwub3Blbk1vZGFsKHByb2osIHRoaXMpO1xuXHRcdFx0bW9kYWwudHVybk9uRWRpdE1vZGUocHJvaik7XG5cdFx0fSk7XG5cdH1cblx0Z2V0Q2FyZCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRlZGl0Q2FyZChuZXdEZXRhaWxzKSB7XG5cdFx0dGhpcy50aXRsZS5kb20udGV4dENvbnRlbnQgPSBuZXdEZXRhaWxzLnRpdGxlO1xuXHRcdHRoaXMuZHVlRGF0ZS5kb20udGV4dENvbnRlbnQgPSBuZXdEZXRhaWxzLmR1ZURhdGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbi5kb20udGV4dENvbnRlbnQgPSBuZXdEZXRhaWxzLmRlc2NyaXB0aW9uO1xuXHRcdHdoaWxlICh0aGlzLnRvRG9MaXN0LmRvbS5maXJzdENoaWxkKSB7XG5cdFx0XHR0aGlzLnRvRG9MaXN0LmRvbS5yZW1vdmVDaGlsZCh0aGlzLnRvRG9MaXN0LmRvbS5sYXN0Q2hpbGQpO1xuXHRcdH1cblx0XHRuZXdEZXRhaWxzLnRvRG9zLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdG5ldyBIVE1MRWxlbWVudChcImxpXCIsIFwidG8tdG8taXRlbVwiLCB0b0RvLCB0aGlzLnRvRG9MaXN0LmRvbSk7XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wcmlvcml0eSAhPT0gbmV3RGV0YWlscy5wcmlvcml0eSkge1xuXHRcdFx0dGhpcy5wcmlvcml0eSA9IG5ld0RldGFpbHMucHJpb3JpdHk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tLmRhdGFzZXQucHJpb3JpdHkgPSBuZXdEZXRhaWxzLnByaW9yaXR5O1xuXHRcdFx0aWYgKHRoaXMucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLmFkZFRvQ2xhc3NMaXN0KFwicHJpb3JpdHlcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlRnJvbUNsYXNzTGlzdChcInByaW9yaXR5XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBsZXQgbG9jYXRpb24gPSBkb2N1bWVudC5sb2NhdGlvblxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHR9XG59XG5cbmV4cG9ydCB7IENhcmQsIEhUTUxFbGVtZW50IH07XG4iLCJpbXBvcnQgeyBhZGRQcm9qZWN0RGF0YSwgZWRpdFByb2plY3REYXRhIH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuaW1wb3J0IHsgQ2FyZCwgSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9jYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5mb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtZm9ybVwiKTtcblx0XHR0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3Qtd3JhcHBlclwiKTtcblx0XHRjb25zdCBhZGRUb0RvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdG8tZG8tYnRuXCIpO1xuXHRcdGNvbnN0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcblx0XHRjb25zdCBjYW5jZWxQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtcHJvamVjdC1idG5cIik7XG5cdFx0Y29uc3Qgc3VibWl0UHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LXByb2plY3QtYnRuXCIpO1xuXHRcdHRoaXMudGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG5cdFx0dGhpcy5kdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIik7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcblx0XHR0aGlzLnByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xuXHRcdHRoaXMudG9Eb0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0by1kb1wiKTtcblx0XHR0aGlzLnRvRG9EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvLWRvLWxpc3QtZGl2XCIpO1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmVkaXREYXRhID0gXCJcIjtcblx0XHR0aGlzLnRvRG9EYXRhID0gW107XG5cblx0XHRhZGRQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcblx0XHR9KTtcblxuXHRcdGFkZFRvRG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoIXRoaXMudG9Eb0RhdGEpIHtcblx0XHRcdFx0dGhpcy50b0RvRGF0YSA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMudG9Eb0lucHV0LnZhbHVlICE9PSBcIlwiKSB7XG5cdFx0XHRcdGlmICh0aGlzLnRvRG9EYXRhLmluY2x1ZGVzKHRoaXMudG9Eb0lucHV0LnZhbHVlKSkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVG8gZG8gYWxyZWFkeSBleGlzdHMuXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxldCBuZXdUb0RvID0gdGhpcy50b0RvSW5wdXQudmFsdWU7XG5cblx0XHRcdFx0XHR0aGlzLnRvRG9EYXRhLnB1c2gobmV3VG9Ebyk7XG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVUb0RvRG9tKG5ld1RvRG8pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudG9Eb0lucHV0LnZhbHVlID0gXCJcIjtcblx0XHRcdHRoaXMudG9Eb0lucHV0LmZvY3VzKCk7XG5cdFx0fSk7XG5cblx0XHRjYW5jZWxQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLnR1cm5PZmZFZGl0TW9kZSgpO1xuXHRcdFx0d2hpbGUgKHRoaXMudG9Eb0Rpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdHRoaXMudG9Eb0Rpdi5yZW1vdmVDaGlsZCh0aGlzLnRvRG9EaXYubGFzdENoaWxkKTtcblx0XHRcdH1cblx0XHRcdHRoaXMudG9Eb0RhdGEgPSBbXTtcblxuXHRcdFx0dGhpcy5mb3JtRWxlbWVudC5yZXNldCgpO1xuXHRcdFx0dGhpcy5kaWFsb2cuY2xvc2UoKTtcblx0XHR9KTtcblxuXHRcdHN1Ym1pdFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHR0aXRsZTogdGhpcy50aXRsZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRkdWVEYXRlOiB0aGlzLmR1ZURhdGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcblx0XHRcdFx0cHJpb3JpdHk6IHRoaXMucHJpb3JpdHlJbnB1dC5jaGVja2VkLFxuXHRcdFx0XHR0b0RvczogdGhpcy50b0RvRGF0YSxcblx0XHRcdH07XG5cdFx0XHQvKiogaWYgdGhpcyBpcyBhIG5ldyBwcm9qZWN0OiAqL1xuXHRcdFx0aWYgKHRoaXMuZWRpdE1vZGUgIT09IHRydWUpIHtcblx0XHRcdFx0bGV0IHJhbmRvbU51bWIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNTAwIC0gMSArIDEpKSArIDE7XG5cdFx0XHRcdGRhdGEuaWQgPVxuXHRcdFx0XHRcdGRhdGEudGl0bGVbMF0gKyBkYXRhLnRpdGxlWzJdICsgZGF0YS50aXRsZVszXSArIFwiLVwiICsgcmFuZG9tTnVtYjtcblxuXHRcdFx0XHRsZXQgbmV3RGF0YVN0b3JlZCA9IGFkZFByb2plY3REYXRhKGRhdGEsIFwicHJvamVjdHNcIik7XG5cdFx0XHRcdGxldCBwYXJlbnREb207XG5cblx0XHRcdFx0aWYgKG5ld0RhdGFTdG9yZWQucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRwYXJlbnREb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5LWxpc3Qtd3JhcHBlclwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYXJlbnREb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmV3IENhcmQobmV3RGF0YVN0b3JlZCwgcGFyZW50RG9tLCB0aGlzKTtcblxuXHRcdFx0XHQvLyoqIGVsc2UgeW91IGFyZSBlZGl0aW5nIGEgcHJvamVjdDogKi9cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGEuaWQgPSB0aGlzLmVkaXREYXRhLmlkO1xuXHRcdFx0XHRsZXQgbmV3RGF0YVN0b3JlZCA9IGVkaXRQcm9qZWN0RGF0YShkYXRhLCBcInByb2plY3RzXCIpO1xuXHRcdFx0XHR0aGlzLmNhcmQuZWRpdENhcmQobmV3RGF0YVN0b3JlZCk7XG5cdFx0XHRcdHRoaXMudHVybk9mZkVkaXRNb2RlKCk7XG5cdFx0XHR9XG5cdFx0XHQvKiogUmVzZXQgdG8gZG8gbGlzdDogKi9cblx0XHRcdHdoaWxlICh0aGlzLnRvRG9EaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHR0aGlzLnRvRG9EaXYucmVtb3ZlQ2hpbGQodGhpcy50b0RvRGl2Lmxhc3RDaGlsZCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvRG9EYXRhID0gW107XG5cdFx0XHR0aGlzLmZvcm1FbGVtZW50LnJlc2V0KCk7XG5cdFx0XHR0aGlzLmRpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXHR9XG5cdHR1cm5PbkVkaXRNb2RlKGRhdGEpIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcblx0XHR0aGlzLmVkaXREYXRhID0gZGF0YTtcblx0fVxuXHR0dXJuT2ZmRWRpdE1vZGUoKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuXHRcdHRoaXMuZWRpdERhdGEgPSBcIlwiO1xuXHR9XG5cdG9wZW5Nb2RhbChwcm9qZWN0RGF0YSwgY2FyZCkge1xuXHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdHRoaXMudGl0bGVJbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLnRpdGxlO1xuXHRcdHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlID0gcHJvamVjdERhdGEuZHVlRGF0ZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS5kZXNjcmlwdGlvbjtcblx0XHR0aGlzLnByaW9yaXR5SW5wdXQuY2hlY2tlZCA9IHByb2plY3REYXRhLnByaW9yaXR5O1xuXHRcdHRoaXMudG9Eb0RhdGEgPSBwcm9qZWN0RGF0YS50b0Rvcztcblx0XHRpZiAodGhpcy50b0RvRGF0YSAmJiB0aGlzLnRvRG9EYXRhLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMudG9Eb0RhdGEuZm9yRWFjaCgodG9EbykgPT4ge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVRvRG9Eb20odG9Ebyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy5jYXJkID0gY2FyZDtcblx0fVxuXHRjcmVhdGVUb0RvRG9tKG5ld1RvRG8pIHtcblx0XHRsZXQgdGVtcERpdiA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcInRlbXAtdG8tZG8tZGl2XCIsIFwiXCIsIHRoaXMudG9Eb0Rpdik7XG5cdFx0bmV3IEhUTUxFbGVtZW50KFwicFwiLCBcInRlbXAtdG8tdG8taXRlbVwiLCBuZXdUb0RvLCB0ZW1wRGl2LmRvbSk7XG5cdFx0bGV0IGRlbGV0ZVRvRG9CdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJkZWxldGUtdG8tZG8tYnRuXCIsXG5cdFx0XHRcIlhcIixcblx0XHRcdHRlbXBEaXYuZG9tXG5cdFx0KTtcblxuXHRcdGRlbGV0ZVRvRG9CdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJJIGFtIGRlbGV0aW5nIGEgdG8gZG9cIik7XG5cblx0XHRcdGxldCBpbmRleFRvRGVsZXRlID0gdGhpcy50b0RvRGF0YS5maW5kSW5kZXgoKHRvRG8pID0+IHRvRG8gPT09IG5ld1RvRG8pO1xuXHRcdFx0dGhpcy50b0RvRGF0YS5zcGxpY2UoaW5kZXhUb0RlbGV0ZSwgMSk7XG5cdFx0XHR0ZW1wRGl2LmRvbS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9jYXJkXCI7XG5pbXBvcnQgeyBkZWxldGVQcm9qZWN0IH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0RXhwYW5kZWQge1xuXHRjb25zdHJ1Y3RvcihlZGl0TW9kYWwpIHtcblx0XHR0aGlzLnByb2plY3REaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZXhwYW5kZWQtd3JhcHBlclwiKTtcblx0XHR0aGlzLmVkaXREaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LXdyYXBwZXJcIik7XG5cdFx0dGhpcy5lZGl0TW9kYWwgPSBlZGl0TW9kYWw7XG5cblx0XHRjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtcHJvai1idG5cIik7XG5cdFx0Y29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qLWJ0blwiKTtcblx0XHRjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZS1wcm9qLWJ0blwiKTtcblxuXHRcdHRoaXMudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWV4XCIpO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHVlLWRhdGUtZXhcIik7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb24tZXhcIik7XG5cdFx0dGhpcy50b0RvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG8tZG8tbGlzdC1leFwiKTtcblxuXHRcdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLnByb2plY3REaWFsb2cuY2xvc2UoKTtcblx0XHR9KTtcblxuXHRcdGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0ZGVsZXRlUHJvamVjdCh0aGlzLmlkLCBcInByb2plY3RzXCIpO1xuXG5cdFx0XHR0aGlzLmNsZWFyRG9tKCk7XG5cdFx0XHR0aGlzLnByb2plY3REaWFsb2cuY2xvc2UoKTtcblx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdH0pO1xuXG5cdFx0ZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy5wcm9qZWN0RGlhbG9nLmNsb3NlKCk7XG5cblx0XHRcdGxldCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0KHRoaXMuaWQpO1xuXHRcdFx0dGhpcy5lZGl0TW9kYWwub3Blbk1vZGFsKHByb2plY3QsIHRoaXMuY2FyZCk7XG5cdFx0XHR0aGlzLmVkaXRNb2RhbC50dXJuT25FZGl0TW9kZShwcm9qZWN0KTtcblxuXHRcdFx0dGhpcy5jbGVhckRvbSgpO1xuXHRcdH0pO1xuXHR9XG5cdGNsZWFyRG9tKCkge1xuXHRcdHRoaXMudGl0bGUudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdHRoaXMuZHVlRGF0ZS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGhpcy5wcm9qZWN0RGlhbG9nLmRhdGFzZXQucHJvamVjdElkID0gXCJcIjtcblx0XHR0aGlzLmlkID0gXCJcIjtcblx0XHR0aGlzLmNhcmQgPSBcIlwiO1xuXHR9XG5cdGdldFByb2plY3QocHJvaklkKSB7XG5cdFx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuXHRcdGxldCBhY3RpdmVQcm9qZWN0cyA9IHN0b3JhZ2UuYWN0aXZlO1xuXHRcdGxldCBwcm9qZWN0ID0gYWN0aXZlUHJvamVjdHMuZmluZCgocHJvaikgPT4gcHJvai5pZCA9PT0gcHJvaklkKTtcblx0XHRyZXR1cm4gcHJvamVjdDtcblx0fVxuXHRleHBhbmRQcm9qZWN0KHByb2pJZCwgY2FyZCkge1xuXHRcdGxldCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0KHByb2pJZCk7XG5cdFx0dGhpcy50aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0dGhpcy5kdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5kdWVEYXRlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdHRoaXMuaWQgPSBwcm9qZWN0LmlkO1xuXHRcdHRoaXMuY2FyZCA9IGNhcmQ7XG5cblx0XHRsZXQgY2xhc3NlcyA9IEFycmF5LmZyb20odGhpcy5wcm9qZWN0RGlhbG9nLmNsYXNzTGlzdCk7XG5cblx0XHRpZiAocHJvamVjdC5wcmlvcml0eSA9PT0gdHJ1ZSkge1xuXHRcdFx0aWYgKCFjbGFzc2VzLmluY2x1ZGVzKFwicHJpb3JpdHlcIikpIHtcblx0XHRcdFx0dGhpcy5wcm9qZWN0RGlhbG9nLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGNsYXNzZXMuaW5jbHVkZXMoXCJwcmlvcml0eVwiKSkge1xuXHRcdFx0XHR0aGlzLnByb2plY3REaWFsb2cuY2xhc3NMaXN0LnJlbW92ZShcInByaW9yaXR5XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocHJvamVjdC50b0Rvcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZVRvRG9Eb20ocHJvamVjdC50b0Rvcyk7XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlVG9Eb0RvbSh0b0Rvcykge1xuXHRcdHRvRG9zLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdG5ldyBIVE1MRWxlbWVudChcImxpXCIsIFwidG8tdG8taXRlbVwiLCB0b0RvLCB0aGlzLnRvRG9XcmFwcGVyKTtcblx0XHR9KTtcblx0fVxufVxuIiwiZnVuY3Rpb24gaXNTdG9yYWdlQXZhaWxhYmxlKCkge1xuXHRsZXQgc3RvcmFnZTtcblx0dHJ5IHtcblx0XHRzdG9yYWdlID0gd2luZG93W1wibG9jYWxTdG9yYWdlXCJdO1xuXHRcdGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcblx0XHRzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG5cdFx0c3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcblx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdChlLmNvZGUgPT09IDIyIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5jb2RlID09PSAxMDE0IHx8XG5cdFx0XHRcdC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuXHRcdFx0XHQvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuXHRcdFx0XHQvLyBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuXHRcdFx0Ly8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcblx0XHRcdHN0b3JhZ2UgJiZcblx0XHRcdHN0b3JhZ2UubGVuZ3RoICE9PSAwXG5cdFx0KTtcblx0fVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcblx0Y29uc3RydWN0b3IobG9jYXRpb24pIHtcblx0XHRpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKCkgPT09IHRydWUpIHtcblx0XHRcdHRoaXMucHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0XHRcdGlmICh0aGlzLnByb2plY3RzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgZXhpc3RpbmcgU3RvcmFnZTpcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVzZXIgaGFzIG5vIHByZXZpb3VzIGRhdGEuXCIpO1xuXHRcdFx0XHRsZXQgbmV3U3RvcmFnZSA9IHtcblx0XHRcdFx0XHRhY3RpdmU6IFtdLFxuXHRcdFx0XHRcdGFyY2hpdmVkOiBbXSxcblx0XHRcdFx0fTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2UpKTtcblx0XHRcdFx0Y29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0XHRcdFx0dGhpcy5wcm9qZWN0cyA9IG5ld1N0b3JhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdElkLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRsZXQgdG9LZWVwID0gc3RvcmFnZS5hY3RpdmUuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQpO1xuXHRzdG9yYWdlLmFjdGl2ZSA9IHRvS2VlcDtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRzdG9yYWdlLmFjdGl2ZS5wdXNoKGRhdGEpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcblxuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuZnVuY3Rpb24gZWRpdFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRsZXQgZWRpdGVkU3RvcmFnZSA9IHN0b3JhZ2UuYWN0aXZlLmZpbHRlcihcblx0XHQocHJvamVjdCkgPT4gcHJvamVjdC5pZCAhPT0gZGF0YS5pZFxuXHQpO1xuXHRlZGl0ZWRTdG9yYWdlLnB1c2goZGF0YSk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gZWRpdGVkU3RvcmFnZTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cdGxldCBuZXdQcm9qZWN0RGF0YSA9IHN0b3JhZ2UuYWN0aXZlW3N0b3JhZ2UuYWN0aXZlLmxlbmd0aCAtIDFdO1xuXHRyZXR1cm4gbmV3UHJvamVjdERhdGE7XG59XG5cbmV4cG9ydCB7XG5cdGlzU3RvcmFnZUF2YWlsYWJsZSxcblx0U3RvcmFnZSxcblx0YWRkUHJvamVjdERhdGEsXG5cdGRlbGV0ZVByb2plY3QsXG5cdGVkaXRQcm9qZWN0RGF0YSxcbn07XG4iLCJpbXBvcnQgTW9kYWwgZnJvbSBcIi4vbW9kYWxcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9jYXJkXCI7XG5pbXBvcnQgUHJvamVjdEV4cGFuZGVkIGZyb20gXCIuL3Byb2plY3RFeHBhbmRlZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdHRoaXMucHJpb3JpdHlMaXN0V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHktbGlzdC13cmFwcGVyXCIpO1xuXG5cdFx0dGhpcy5saXN0ID0gW107XG5cdFx0dGhpcy5jYXJkSWRzID0gW107XG5cdFx0dGhpcy5hY3RpdmUgPSBcImFsbFwiO1xuXHRcdHRoaXMubW9kYWwgPSBuZXcgTW9kYWwoKTtcblx0XHR0aGlzLmV4cGFuZGVkID0gbmV3IFByb2plY3RFeHBhbmRlZCh0aGlzLm1vZGFsKTtcblxuXHRcdHRoaXMuc2V0QWxsVmlldygpO1xuXHR9XG5cdHN3aXRjaFZpZXcodmlldykge1xuXHRcdGlmICh2aWV3ID09PSBcImFsbFwiKSB7XG5cdFx0XHR0aGlzLnNldEFsbFZpZXcoKTtcblx0XHR9XG5cdFx0aWYgKHZpZXcgPT09IFwicHJpb3JpdHlcIikge1xuXHRcdFx0dGhpcy5zZXRQcmlvcml0eVZpZXcoKTtcblx0XHR9XG5cdH1cblx0c2V0QWxsVmlldygpIHtcblx0XHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XG5cdFx0bGV0IGFjdGl2ZVByb2plY3RzID0gc3RvcmFnZS5hY3RpdmU7XG5cdFx0aWYgKGFjdGl2ZVByb2plY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdGFjdGl2ZVByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0aWYgKHByb2plY3QucHJpb3JpdHkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bmV3IENhcmQocHJvamVjdCwgdGhpcy5wcm9qTGlzdFdyYXBwZXIsIHRoaXMubW9kYWwsIHRoaXMuZXhwYW5kZWQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb2plY3QucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRuZXcgQ2FyZChcblx0XHRcdFx0XHRcdHByb2plY3QsXG5cdFx0XHRcdFx0XHR0aGlzLnByaW9yaXR5TGlzdFdyYXBwZXIsXG5cdFx0XHRcdFx0XHR0aGlzLm1vZGFsLFxuXHRcdFx0XHRcdFx0dGhpcy5leHBhbmRlZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL3N3aXRjaFZpZXdcIjtcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cdFx0dGhpcy52aWV3ID0gbmV3IFZpZXcoKTtcblx0fVxufVxubmV3IEFwcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9