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
		this.toDoList = new HTMLElement("ul", "to-do-list", "", this.wrapper.dom);
		if (proj.toDos) {
			proj.toDos.forEach((toDo) => {
				new HTMLElement("li", "to-do-item", toDo, this.toDoList.dom);
			});
		}
		this.toDoList.dom.hidden = true;
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
			"Delete",
			this.btnWrapper.dom
		);
		parentDom.appendChild(this.wrapper.dom);

		this.expandBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();
			let projectDialog = document.getElementById("dialog-expanded");

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
		this.titleInput = document.getElementById("title-input");
		this.dueDateInput = document.getElementById("dueDate-input");
		this.descriptionInput = document.getElementById("description-input");
		this.priorityInput = document.getElementById("priority-input");
		this.toDoInput = document.getElementById("to-do-input");
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
		this.projectDialog = document.getElementById("dialog-expanded");

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

			this.clearDom();

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
		this.projectDialog.close();
	}
	clearDom() {
		this.title.textContent = "";
		this.dueDate.textContent = "";
		this.description.textContent = "";
		this.projectDialog.dataset.projectId = "";
		this.id = "";
		this.card = "";
		while (this.toDoWrapper.firstChild) {
			this.toDoWrapper.removeChild(this.toDoWrapper.lastChild);
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7Ozs7O1VDM0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1Y7O0FBRXhDO0FBQ0E7QUFDQSw0QkFBNEIsMkRBQU87QUFDbkMsa0JBQWtCLDJEQUFJO0FBQ3RCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvY2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL21vZGFsLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvcHJvamVjdEV4cGFuZGVkLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvc3RvcmFnZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL3N3aXRjaFZpZXcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWxldGVQcm9qZWN0IH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuXG5jbGFzcyBIVE1MRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNsYXNzTmFtZSwgdGV4dENvbnRlbnQsIHBhcmVudERvbSkge1xuXHRcdHRoaXMuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcblx0XHRpZiAoY2xhc3NOYW1lLmxlbmd0aCA+PSAwKSB7XG5cdFx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0ZXh0Q29udGVudCkge1xuXHRcdFx0dGhpcy5kb20udGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcblx0XHRcdGlmIChlbGVtZW50ID09PSBcImJ1dHRvblwiKSB7XG5cdFx0XHRcdHRoaXMuZG9tLnZhbHVlID0gdGV4dENvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwYXJlbnREb20pIHtcblx0XHRcdHRoaXMuYXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKTtcblx0XHR9XG5cdH1cblx0YWRkVG9DbGFzc0xpc3QoY2xhc3NOYW1lKSB7XG5cdFx0dGhpcy5kb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHR9XG5cdHJlbW92ZUZyb21DbGFzc0xpc3QoY2xhc3NOYW1lKSB7XG5cdFx0dGhpcy5kb20uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuXHR9XG5cdGFwcGVuZFRvUGFyZW50KHBhcmVudERvbSkge1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLmRvbSk7XG5cdH1cbn1cblxuY2xhc3MgQ2FyZCB7XG5cdGNvbnN0cnVjdG9yKHByb2osIHBhcmVudERvbSwgbW9kYWwsIGV4cGFuZGVkKSB7XG5cdFx0dGhpcy5pZCA9IHByb2ouaWQ7XG5cdFx0dGhpcy53cmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFwiZGl2XCIsIFwiY2FyZC13cmFwcGVyXCIpO1xuXHRcdHRoaXMud3JhcHBlci5kb20uaWQgPSBwcm9qLmlkO1xuXHRcdHRoaXMud3JhcHBlci5kb20uZGF0YXNldC5wcmlvcml0eSA9IHByb2oucHJpb3JpdHk7XG5cdFx0dGhpcy50aXRsZSA9IG5ldyBIVE1MRWxlbWVudChcImgzXCIsIFwidGl0bGVcIiwgcHJvai50aXRsZSwgdGhpcy53cmFwcGVyLmRvbSk7XG5cdFx0dGhpcy5kdWVEYXRlID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJwXCIsXG5cdFx0XHRcImR1ZS1kYXRlXCIsXG5cdFx0XHRwcm9qLmR1ZURhdGUsXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJwXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCIsXG5cdFx0XHRwcm9qLmRlc2NyaXB0aW9uLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5wcmlvcml0eSA9IHByb2oucHJpb3JpdHk7XG5cdFx0aWYgKHRoaXMucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRUb0NsYXNzTGlzdChcInByaW9yaXR5XCIpO1xuXHRcdH1cblx0XHR0aGlzLnRvRG9MaXN0ID0gbmV3IEhUTUxFbGVtZW50KFwidWxcIiwgXCJ0by1kby1saXN0XCIsIFwiXCIsIHRoaXMud3JhcHBlci5kb20pO1xuXHRcdGlmIChwcm9qLnRvRG9zKSB7XG5cdFx0XHRwcm9qLnRvRG9zLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdFx0bmV3IEhUTUxFbGVtZW50KFwibGlcIiwgXCJ0by1kby1pdGVtXCIsIHRvRG8sIHRoaXMudG9Eb0xpc3QuZG9tKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnRvRG9MaXN0LmRvbS5oaWRkZW4gPSB0cnVlO1xuXHRcdHRoaXMuYnRuV3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiZGl2XCIsXG5cdFx0XHRcImNhcmQtYnRuLXdyYXBwZXJcIixcblx0XHRcdFwiXCIsXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmV4cGFuZEJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImV4cGFuZC1idG5cIixcblx0XHRcdFwiRXhwYW5kXCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmVkaXRCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJlZGl0LWJ0blwiLFxuXHRcdFx0XCJFZGl0XCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmRlbGV0ZUJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImRlbGV0ZS1idG5cIixcblx0XHRcdFwiRGVsZXRlXCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLmRvbSk7XG5cblx0XHR0aGlzLmV4cGFuZEJ0bi5kb20uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRsZXQgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlhbG9nLWV4cGFuZGVkXCIpO1xuXG5cdFx0XHRwcm9qZWN0RGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdFx0ZXhwYW5kZWQuZXhwYW5kUHJvamVjdCh0aGlzLmlkLCB0aGlzKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZGVsZXRlQnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0ZGVsZXRlUHJvamVjdCh0aGlzLmlkLCBcInByb2plY3RzXCIpO1xuXHRcdFx0dGhpcy53cmFwcGVyLmRvbS5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZWRpdEJ0bi5kb20uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdG1vZGFsLm9wZW5Nb2RhbChwcm9qLCB0aGlzKTtcblx0XHRcdG1vZGFsLnR1cm5PbkVkaXRNb2RlKHByb2opO1xuXHRcdH0pO1xuXHR9XG5cdGdldENhcmQoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0ZWRpdENhcmQobmV3RGV0YWlscykge1xuXHRcdHRoaXMudGl0bGUuZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy50aXRsZTtcblx0XHR0aGlzLmR1ZURhdGUuZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy5kdWVEYXRlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24uZG9tLnRleHRDb250ZW50ID0gbmV3RGV0YWlscy5kZXNjcmlwdGlvbjtcblx0XHR3aGlsZSAodGhpcy50b0RvTGlzdC5kb20uZmlyc3RDaGlsZCkge1xuXHRcdFx0dGhpcy50b0RvTGlzdC5kb20ucmVtb3ZlQ2hpbGQodGhpcy50b0RvTGlzdC5kb20ubGFzdENoaWxkKTtcblx0XHR9XG5cdFx0bmV3RGV0YWlscy50b0Rvcy5mb3JFYWNoKCh0b0RvKSA9PiB7XG5cdFx0XHRuZXcgSFRNTEVsZW1lbnQoXCJsaVwiLCBcInRvLXRvLWl0ZW1cIiwgdG9EbywgdGhpcy50b0RvTGlzdC5kb20pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMucHJpb3JpdHkgIT09IG5ld0RldGFpbHMucHJpb3JpdHkpIHtcblx0XHRcdHRoaXMucHJpb3JpdHkgPSBuZXdEZXRhaWxzLnByaW9yaXR5O1xuXHRcdFx0dGhpcy53cmFwcGVyLmRvbS5kYXRhc2V0LnByaW9yaXR5ID0gbmV3RGV0YWlscy5wcmlvcml0eTtcblx0XHRcdGlmICh0aGlzLnByaW9yaXR5ID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRUb0NsYXNzTGlzdChcInByaW9yaXR5XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUZyb21DbGFzc0xpc3QoXCJwcmlvcml0eVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gbGV0IGxvY2F0aW9uID0gZG9jdW1lbnQubG9jYXRpb25cblx0XHRkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcblx0fVxufVxuXG5leHBvcnQgeyBDYXJkLCBIVE1MRWxlbWVudCB9O1xuIiwiaW1wb3J0IHsgYWRkUHJvamVjdERhdGEsIGVkaXRQcm9qZWN0RGF0YSB9IGZyb20gXCIuL3N0b3JhZ2VIZWxwZXJcIjtcbmltcG9ydCB7IENhcmQsIEhUTUxFbGVtZW50IH0gZnJvbSBcIi4vY2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWZvcm1cIik7XG5cdFx0dGhpcy5kaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LXdyYXBwZXJcIik7XG5cdFx0Y29uc3QgYWRkVG9Eb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRvLWRvLWJ0blwiKTtcblx0XHRjb25zdCBhZGRQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC1idG5cIik7XG5cdFx0Y29uc3QgY2FuY2VsUHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsLXByb2plY3QtYnRuXCIpO1xuXHRcdGNvbnN0IHN1Ym1pdFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC1wcm9qZWN0LWJ0blwiKTtcblx0XHR0aGlzLnRpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlLWlucHV0XCIpO1xuXHRcdHRoaXMuZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlLWlucHV0XCIpO1xuXHRcdHRoaXMuZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24taW5wdXRcIik7XG5cdFx0dGhpcy5wcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eS1pbnB1dFwiKTtcblx0XHR0aGlzLnRvRG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG8tZG8taW5wdXRcIik7XG5cdFx0dGhpcy50b0RvRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0by1kby1saXN0LWRpdlwiKTtcblx0XHR0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cdFx0dGhpcy5lZGl0RGF0YSA9IFwiXCI7XG5cdFx0dGhpcy50b0RvRGF0YSA9IFtdO1xuXG5cdFx0YWRkUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG5cdFx0fSk7XG5cblx0XHRhZGRUb0RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKCF0aGlzLnRvRG9EYXRhKSB7XG5cdFx0XHRcdHRoaXMudG9Eb0RhdGEgPSBbXTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnRvRG9JbnB1dC52YWx1ZSAhPT0gXCJcIikge1xuXHRcdFx0XHRpZiAodGhpcy50b0RvRGF0YS5pbmNsdWRlcyh0aGlzLnRvRG9JbnB1dC52YWx1ZSkpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlRvIGRvIGFscmVhZHkgZXhpc3RzLlwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsZXQgbmV3VG9EbyA9IHRoaXMudG9Eb0lucHV0LnZhbHVlO1xuXG5cdFx0XHRcdFx0dGhpcy50b0RvRGF0YS5wdXNoKG5ld1RvRG8pO1xuXHRcdFx0XHRcdHRoaXMuY3JlYXRlVG9Eb0RvbShuZXdUb0RvKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnRvRG9JbnB1dC52YWx1ZSA9IFwiXCI7XG5cdFx0XHR0aGlzLnRvRG9JbnB1dC5mb2N1cygpO1xuXHRcdH0pO1xuXG5cdFx0Y2FuY2VsUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy50dXJuT2ZmRWRpdE1vZGUoKTtcblx0XHRcdHdoaWxlICh0aGlzLnRvRG9EaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHR0aGlzLnRvRG9EaXYucmVtb3ZlQ2hpbGQodGhpcy50b0RvRGl2Lmxhc3RDaGlsZCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvRG9EYXRhID0gW107XG5cblx0XHRcdHRoaXMuZm9ybUVsZW1lbnQucmVzZXQoKTtcblx0XHRcdHRoaXMuZGlhbG9nLmNsb3NlKCk7XG5cdFx0fSk7XG5cblx0XHRzdWJtaXRQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0dGl0bGU6IHRoaXMudGl0bGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0ZHVlRGF0ZTogdGhpcy5kdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG5cdFx0XHRcdHByaW9yaXR5OiB0aGlzLnByaW9yaXR5SW5wdXQuY2hlY2tlZCxcblx0XHRcdFx0dG9Eb3M6IHRoaXMudG9Eb0RhdGEsXG5cdFx0XHR9O1xuXHRcdFx0LyoqIGlmIHRoaXMgaXMgYSBuZXcgcHJvamVjdDogKi9cblx0XHRcdGlmICh0aGlzLmVkaXRNb2RlICE9PSB0cnVlKSB7XG5cdFx0XHRcdGxldCByYW5kb21OdW1iID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDUwMCAtIDEgKyAxKSkgKyAxO1xuXHRcdFx0XHRkYXRhLmlkID1cblx0XHRcdFx0XHRkYXRhLnRpdGxlWzBdICsgZGF0YS50aXRsZVsyXSArIGRhdGEudGl0bGVbM10gKyBcIi1cIiArIHJhbmRvbU51bWI7XG5cblx0XHRcdFx0bGV0IG5ld0RhdGFTdG9yZWQgPSBhZGRQcm9qZWN0RGF0YShkYXRhLCBcInByb2plY3RzXCIpO1xuXHRcdFx0XHRsZXQgcGFyZW50RG9tO1xuXG5cdFx0XHRcdGlmIChuZXdEYXRhU3RvcmVkLnByaW9yaXR5ID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0cGFyZW50RG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eS1saXN0LXdyYXBwZXJcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50RG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWxpc3Qtd3JhcHBlclwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5ldyBDYXJkKG5ld0RhdGFTdG9yZWQsIHBhcmVudERvbSwgdGhpcyk7XG5cblx0XHRcdFx0Ly8qKiBlbHNlIHlvdSBhcmUgZWRpdGluZyBhIHByb2plY3Q6ICovXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhLmlkID0gdGhpcy5lZGl0RGF0YS5pZDtcblx0XHRcdFx0bGV0IG5ld0RhdGFTdG9yZWQgPSBlZGl0UHJvamVjdERhdGEoZGF0YSwgXCJwcm9qZWN0c1wiKTtcblx0XHRcdFx0dGhpcy5jYXJkLmVkaXRDYXJkKG5ld0RhdGFTdG9yZWQpO1xuXHRcdFx0XHR0aGlzLnR1cm5PZmZFZGl0TW9kZSgpO1xuXHRcdFx0fVxuXHRcdFx0LyoqIFJlc2V0IHRvIGRvIGxpc3Q6ICovXG5cdFx0XHR3aGlsZSAodGhpcy50b0RvRGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0dGhpcy50b0RvRGl2LnJlbW92ZUNoaWxkKHRoaXMudG9Eb0Rpdi5sYXN0Q2hpbGQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy50b0RvRGF0YSA9IFtdO1xuXHRcdFx0dGhpcy5mb3JtRWxlbWVudC5yZXNldCgpO1xuXHRcdFx0dGhpcy5kaWFsb2cuY2xvc2UoKTtcblx0XHR9KTtcblx0fVxuXHR0dXJuT25FZGl0TW9kZShkYXRhKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IHRydWU7XG5cdFx0dGhpcy5lZGl0RGF0YSA9IGRhdGE7XG5cdH1cblx0dHVybk9mZkVkaXRNb2RlKCkge1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmVkaXREYXRhID0gXCJcIjtcblx0fVxuXHRvcGVuTW9kYWwocHJvamVjdERhdGEsIGNhcmQpIHtcblx0XHR0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcblx0XHR0aGlzLnRpdGxlSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS50aXRsZTtcblx0XHR0aGlzLmR1ZURhdGVJbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLmR1ZURhdGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvamVjdERhdGEuZGVzY3JpcHRpb247XG5cdFx0dGhpcy5wcmlvcml0eUlucHV0LmNoZWNrZWQgPSBwcm9qZWN0RGF0YS5wcmlvcml0eTtcblx0XHR0aGlzLnRvRG9EYXRhID0gcHJvamVjdERhdGEudG9Eb3M7XG5cdFx0aWYgKHRoaXMudG9Eb0RhdGEgJiYgdGhpcy50b0RvRGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnRvRG9EYXRhLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdFx0dGhpcy5jcmVhdGVUb0RvRG9tKHRvRG8pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuY2FyZCA9IGNhcmQ7XG5cdH1cblx0Y3JlYXRlVG9Eb0RvbShuZXdUb0RvKSB7XG5cdFx0bGV0IHRlbXBEaXYgPSBuZXcgSFRNTEVsZW1lbnQoXCJkaXZcIiwgXCJ0ZW1wLXRvLWRvLWRpdlwiLCBcIlwiLCB0aGlzLnRvRG9EaXYpO1xuXHRcdG5ldyBIVE1MRWxlbWVudChcInBcIiwgXCJ0ZW1wLXRvLXRvLWl0ZW1cIiwgbmV3VG9EbywgdGVtcERpdi5kb20pO1xuXHRcdGxldCBkZWxldGVUb0RvQnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZGVsZXRlLXRvLWRvLWJ0blwiLFxuXHRcdFx0XCJYXCIsXG5cdFx0XHR0ZW1wRGl2LmRvbVxuXHRcdCk7XG5cblx0XHRkZWxldGVUb0RvQnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiSSBhbSBkZWxldGluZyBhIHRvIGRvXCIpO1xuXG5cdFx0XHRsZXQgaW5kZXhUb0RlbGV0ZSA9IHRoaXMudG9Eb0RhdGEuZmluZEluZGV4KCh0b0RvKSA9PiB0b0RvID09PSBuZXdUb0RvKTtcblx0XHRcdHRoaXMudG9Eb0RhdGEuc3BsaWNlKGluZGV4VG9EZWxldGUsIDEpO1xuXHRcdFx0dGVtcERpdi5kb20ucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSBcIi4vY2FyZFwiO1xuaW1wb3J0IHsgZGVsZXRlUHJvamVjdCB9IGZyb20gXCIuL3N0b3JhZ2VIZWxwZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdEV4cGFuZGVkIHtcblx0Y29uc3RydWN0b3IoZWRpdE1vZGFsKSB7XG5cdFx0dGhpcy5wcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFsb2ctZXhwYW5kZWRcIik7XG5cblx0XHR0aGlzLmVkaXREaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LXdyYXBwZXJcIik7XG5cdFx0dGhpcy5lZGl0TW9kYWwgPSBlZGl0TW9kYWw7XG5cblx0XHRjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtcHJvai1idG5cIik7XG5cdFx0Y29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qLWJ0blwiKTtcblx0XHRjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZS1wcm9qLWJ0blwiKTtcblxuXHRcdHRoaXMudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlLWV4XCIpO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHVlLWRhdGUtZXhcIik7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb24tZXhcIik7XG5cdFx0dGhpcy50b0RvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG8tZG8tbGlzdC1leFwiKTtcblxuXHRcdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLmNsZWFyRG9tKCk7XG5cblx0XHRcdHRoaXMucHJvamVjdERpYWxvZy5jbG9zZSgpO1xuXHRcdH0pO1xuXG5cdFx0ZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRkZWxldGVQcm9qZWN0KHRoaXMuaWQsIFwicHJvamVjdHNcIik7XG5cblx0XHRcdHRoaXMuY2xlYXJEb20oKTtcblx0XHRcdHRoaXMucHJvamVjdERpYWxvZy5jbG9zZSgpO1xuXHRcdFx0ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0fSk7XG5cblx0XHRlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLnByb2plY3REaWFsb2cuY2xvc2UoKTtcblxuXHRcdFx0bGV0IHByb2plY3QgPSB0aGlzLmdldFByb2plY3QodGhpcy5pZCk7XG5cdFx0XHR0aGlzLmVkaXRNb2RhbC5vcGVuTW9kYWwocHJvamVjdCwgdGhpcy5jYXJkKTtcblx0XHRcdHRoaXMuZWRpdE1vZGFsLnR1cm5PbkVkaXRNb2RlKHByb2plY3QpO1xuXG5cdFx0XHR0aGlzLmNsZWFyRG9tKCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5wcm9qZWN0RGlhbG9nLmNsb3NlKCk7XG5cdH1cblx0Y2xlYXJEb20oKSB7XG5cdFx0dGhpcy50aXRsZS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0dGhpcy5kdWVEYXRlLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aGlzLmRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHR0aGlzLnByb2plY3REaWFsb2cuZGF0YXNldC5wcm9qZWN0SWQgPSBcIlwiO1xuXHRcdHRoaXMuaWQgPSBcIlwiO1xuXHRcdHRoaXMuY2FyZCA9IFwiXCI7XG5cdFx0d2hpbGUgKHRoaXMudG9Eb1dyYXBwZXIuZmlyc3RDaGlsZCkge1xuXHRcdFx0dGhpcy50b0RvV3JhcHBlci5yZW1vdmVDaGlsZCh0aGlzLnRvRG9XcmFwcGVyLmxhc3RDaGlsZCk7XG5cdFx0fVxuXHR9XG5cdGdldFByb2plY3QocHJvaklkKSB7XG5cdFx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuXHRcdGxldCBhY3RpdmVQcm9qZWN0cyA9IHN0b3JhZ2UuYWN0aXZlO1xuXHRcdGxldCBwcm9qZWN0ID0gYWN0aXZlUHJvamVjdHMuZmluZCgocHJvaikgPT4gcHJvai5pZCA9PT0gcHJvaklkKTtcblx0XHRyZXR1cm4gcHJvamVjdDtcblx0fVxuXHRleHBhbmRQcm9qZWN0KHByb2pJZCwgY2FyZCkge1xuXHRcdGxldCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0KHByb2pJZCk7XG5cdFx0dGhpcy50aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG5cdFx0dGhpcy5kdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5kdWVEYXRlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdHRoaXMuaWQgPSBwcm9qZWN0LmlkO1xuXHRcdHRoaXMuY2FyZCA9IGNhcmQ7XG5cblx0XHRsZXQgY2xhc3NlcyA9IEFycmF5LmZyb20odGhpcy5wcm9qZWN0RGlhbG9nLmNsYXNzTGlzdCk7XG5cblx0XHRpZiAocHJvamVjdC5wcmlvcml0eSA9PT0gdHJ1ZSkge1xuXHRcdFx0aWYgKCFjbGFzc2VzLmluY2x1ZGVzKFwicHJpb3JpdHlcIikpIHtcblx0XHRcdFx0dGhpcy5wcm9qZWN0RGlhbG9nLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eVwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGNsYXNzZXMuaW5jbHVkZXMoXCJwcmlvcml0eVwiKSkge1xuXHRcdFx0XHR0aGlzLnByb2plY3REaWFsb2cuY2xhc3NMaXN0LnJlbW92ZShcInByaW9yaXR5XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocHJvamVjdC50b0Rvcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZVRvRG9Eb20ocHJvamVjdC50b0Rvcyk7XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlVG9Eb0RvbSh0b0Rvcykge1xuXHRcdHRvRG9zLmZvckVhY2goKHRvRG8pID0+IHtcblx0XHRcdG5ldyBIVE1MRWxlbWVudChcImxpXCIsIFwidG8tdG8taXRlbVwiLCB0b0RvLCB0aGlzLnRvRG9XcmFwcGVyKTtcblx0XHR9KTtcblx0fVxufVxuIiwiZnVuY3Rpb24gaXNTdG9yYWdlQXZhaWxhYmxlKCkge1xuXHRsZXQgc3RvcmFnZTtcblx0dHJ5IHtcblx0XHRzdG9yYWdlID0gd2luZG93W1wibG9jYWxTdG9yYWdlXCJdO1xuXHRcdGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcblx0XHRzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG5cdFx0c3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcblx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdChlLmNvZGUgPT09IDIyIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5jb2RlID09PSAxMDE0IHx8XG5cdFx0XHRcdC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuXHRcdFx0XHQvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuXHRcdFx0XHQvLyBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuXHRcdFx0Ly8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcblx0XHRcdHN0b3JhZ2UgJiZcblx0XHRcdHN0b3JhZ2UubGVuZ3RoICE9PSAwXG5cdFx0KTtcblx0fVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcblx0Y29uc3RydWN0b3IobG9jYXRpb24pIHtcblx0XHRpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKCkgPT09IHRydWUpIHtcblx0XHRcdHRoaXMucHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0XHRcdGlmICh0aGlzLnByb2plY3RzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgZXhpc3RpbmcgU3RvcmFnZTpcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVzZXIgaGFzIG5vIHByZXZpb3VzIGRhdGEuXCIpO1xuXHRcdFx0XHRsZXQgbmV3U3RvcmFnZSA9IHtcblx0XHRcdFx0XHRhY3RpdmU6IFtdLFxuXHRcdFx0XHRcdGFyY2hpdmVkOiBbXSxcblx0XHRcdFx0fTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2UpKTtcblx0XHRcdFx0Y29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0XHRcdFx0dGhpcy5wcm9qZWN0cyA9IG5ld1N0b3JhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QocHJvamVjdElkLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRsZXQgdG9LZWVwID0gc3RvcmFnZS5hY3RpdmUuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQpO1xuXHRzdG9yYWdlLmFjdGl2ZSA9IHRvS2VlcDtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRzdG9yYWdlLmFjdGl2ZS5wdXNoKGRhdGEpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcblxuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuZnVuY3Rpb24gZWRpdFByb2plY3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRsZXQgZWRpdGVkU3RvcmFnZSA9IHN0b3JhZ2UuYWN0aXZlLmZpbHRlcihcblx0XHQocHJvamVjdCkgPT4gcHJvamVjdC5pZCAhPT0gZGF0YS5pZFxuXHQpO1xuXHRlZGl0ZWRTdG9yYWdlLnB1c2goZGF0YSk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gZWRpdGVkU3RvcmFnZTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cdGxldCBuZXdQcm9qZWN0RGF0YSA9IHN0b3JhZ2UuYWN0aXZlW3N0b3JhZ2UuYWN0aXZlLmxlbmd0aCAtIDFdO1xuXHRyZXR1cm4gbmV3UHJvamVjdERhdGE7XG59XG5cbmV4cG9ydCB7XG5cdGlzU3RvcmFnZUF2YWlsYWJsZSxcblx0U3RvcmFnZSxcblx0YWRkUHJvamVjdERhdGEsXG5cdGRlbGV0ZVByb2plY3QsXG5cdGVkaXRQcm9qZWN0RGF0YSxcbn07XG4iLCJpbXBvcnQgTW9kYWwgZnJvbSBcIi4vbW9kYWxcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9jYXJkXCI7XG5pbXBvcnQgUHJvamVjdEV4cGFuZGVkIGZyb20gXCIuL3Byb2plY3RFeHBhbmRlZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdHRoaXMucHJpb3JpdHlMaXN0V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHktbGlzdC13cmFwcGVyXCIpO1xuXG5cdFx0dGhpcy5saXN0ID0gW107XG5cdFx0dGhpcy5jYXJkSWRzID0gW107XG5cdFx0dGhpcy5hY3RpdmUgPSBcImFsbFwiO1xuXHRcdHRoaXMubW9kYWwgPSBuZXcgTW9kYWwoKTtcblx0XHR0aGlzLmV4cGFuZGVkID0gbmV3IFByb2plY3RFeHBhbmRlZCh0aGlzLm1vZGFsKTtcblxuXHRcdHRoaXMuc2V0QWxsVmlldygpO1xuXHR9XG5cdHN3aXRjaFZpZXcodmlldykge1xuXHRcdGlmICh2aWV3ID09PSBcImFsbFwiKSB7XG5cdFx0XHR0aGlzLnNldEFsbFZpZXcoKTtcblx0XHR9XG5cdFx0aWYgKHZpZXcgPT09IFwicHJpb3JpdHlcIikge1xuXHRcdFx0dGhpcy5zZXRQcmlvcml0eVZpZXcoKTtcblx0XHR9XG5cdH1cblx0c2V0QWxsVmlldygpIHtcblx0XHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XG5cdFx0bGV0IGFjdGl2ZVByb2plY3RzID0gc3RvcmFnZS5hY3RpdmU7XG5cdFx0aWYgKGFjdGl2ZVByb2plY3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdGFjdGl2ZVByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdFx0aWYgKHByb2plY3QucHJpb3JpdHkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bmV3IENhcmQocHJvamVjdCwgdGhpcy5wcm9qTGlzdFdyYXBwZXIsIHRoaXMubW9kYWwsIHRoaXMuZXhwYW5kZWQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb2plY3QucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRuZXcgQ2FyZChcblx0XHRcdFx0XHRcdHByb2plY3QsXG5cdFx0XHRcdFx0XHR0aGlzLnByaW9yaXR5TGlzdFdyYXBwZXIsXG5cdFx0XHRcdFx0XHR0aGlzLm1vZGFsLFxuXHRcdFx0XHRcdFx0dGhpcy5leHBhbmRlZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi9tb2R1bGVzL3N3aXRjaFZpZXdcIjtcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cdFx0dGhpcy52aWV3ID0gbmV3IFZpZXcoKTtcblx0fVxufVxubmV3IEFwcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9