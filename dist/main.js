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
		const addProjBtn = document.getElementById("add-project-btn");
		const cancelProjBtn = document.getElementById("cancel-project-btn");
		const submitProjBtn = document.getElementById("submit-project-btn");
		this.titleInput = document.getElementById("title");
		this.dueDateInput = document.getElementById("dueDate");
		this.descriptionInput = document.getElementById("description");
		this.priorityInput = document.getElementById("priority");
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
				priority: this.priorityInput.checked,
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
		this.priorityInput.checked = projectData.priority;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WyJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9jYXJkLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9zdG9yYWdlSGVscGVyLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVsZXRlUHJvamVjdCB9IGZyb20gXCIuL3N0b3JhZ2VIZWxwZXJcIjtcblxuY2xhc3MgSFRNTEVsZW1lbnQge1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBjbGFzc05hbWUsIHRleHRDb250ZW50LCBwYXJlbnREb20pIHtcblx0XHR0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0aWYgKGNsYXNzTmFtZS5sZW5ndGggPj0gMCkge1xuXHRcdFx0dGhpcy5kb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdH1cblx0XHRpZiAodGV4dENvbnRlbnQpIHtcblx0XHRcdHRoaXMuZG9tLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG5cdFx0XHRpZiAoZWxlbWVudCA9PT0gXCJidXR0b25cIikge1xuXHRcdFx0XHR0aGlzLmRvbS52YWx1ZSA9IHRleHRDb250ZW50O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocGFyZW50RG9tKSB7XG5cdFx0XHR0aGlzLmFwcGVuZFRvUGFyZW50KHBhcmVudERvbSk7XG5cdFx0fVxuXHR9XG5cdGFkZFRvQ2xhc3NMaXN0KGNsYXNzTmFtZSkge1xuXHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0fVxuXHRyZW1vdmVGcm9tQ2xhc3NMaXN0KGNsYXNzTmFtZSkge1xuXHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0fVxuXHRhcHBlbmRUb1BhcmVudChwYXJlbnREb20pIHtcblx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQodGhpcy5kb20pO1xuXHR9XG59XG5cbmNsYXNzIENhcmQge1xuXHRjb25zdHJ1Y3Rvcihwcm9qLCBwYXJlbnREb20sIG1vZGFsKSB7XG5cdFx0dGhpcy5pZCA9IHByb2ouaWQ7XG5cdFx0dGhpcy53cmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFwiZGl2XCIsIFwiY2FyZC13cmFwcGVyXCIpO1xuXHRcdHRoaXMudGl0bGUgPSBuZXcgSFRNTEVsZW1lbnQoXCJoM1wiLCBcInRpdGxlXCIsIHByb2oudGl0bGUsIHRoaXMud3JhcHBlci5kb20pO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkdWUtZGF0ZVwiLFxuXHRcdFx0cHJvai5kdWVEYXRlLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0cHJvai5kZXNjcmlwdGlvbixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMucHJpb3JpdHkgPSBwcm9qLnByaW9yaXR5O1xuXHRcdGlmICh0aGlzLnByaW9yaXR5ID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkVG9DbGFzc0xpc3QoXCJwcmlvcml0eVwiKTtcblx0XHR9XG5cdFx0dGhpcy5idG5XcmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJkaXZcIixcblx0XHRcdFwiY2FyZC1idG4td3JhcHBlclwiLFxuXHRcdFx0XCJcIixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZWRpdEJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImVkaXQtYnRuXCIsXG5cdFx0XHRcIkVkaXRcIixcblx0XHRcdHRoaXMuYnRuV3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZGVsZXRlQnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZGVsZXRlLWJ0blwiLFxuXHRcdFx0XCJYXCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLmRvbSk7XG5cblx0XHR0aGlzLmRlbGV0ZUJ0bi5kb20uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGRlbGV0ZVByb2plY3QodGhpcy5pZCwgXCJwcm9qZWN0c1wiKTtcblx0XHRcdHRoaXMud3JhcHBlci5kb20ucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmVkaXRCdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRtb2RhbC5vcGVuTW9kYWwocHJvaiwgdGhpcyk7XG5cdFx0XHRtb2RhbC50dXJuT25FZGl0TW9kZShwcm9qKTtcblx0XHR9KTtcblx0fVxuXHRnZXRDYXJkKCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdGVkaXRDYXJkKG5ld0RldGFpbHMpIHtcblx0XHR0aGlzLnRpdGxlLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMudGl0bGU7XG5cdFx0dGhpcy5kdWVEYXRlLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMuZHVlRGF0ZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uLmRvbS50ZXh0Q29udGVudCA9IG5ld0RldGFpbHMuZGVzY3JpcHRpb247XG5cdFx0aWYgKHRoaXMucHJpb3JpdHkgIT09IG5ld0RldGFpbHMucHJpb3JpdHkpIHtcblx0XHRcdHRoaXMucHJpb3JpdHkgPSBuZXdEZXRhaWxzLnByaW9yaXR5O1xuXHRcdFx0aWYgKHRoaXMucHJpb3JpdHkgPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLmFkZFRvQ2xhc3NMaXN0KFwicHJpb3JpdHlcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlRnJvbUNsYXNzTGlzdChcInByaW9yaXR5XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgeyBDYXJkIH07XG4iLCJpbXBvcnQgeyBhZGRQcm9qZWN0RGF0YSwgZWRpdFByb2plY3REYXRhIH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL2NhcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1mb3JtXCIpO1xuXHRcdHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC13cmFwcGVyXCIpO1xuXHRcdGNvbnN0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcblx0XHRjb25zdCBjYW5jZWxQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtcHJvamVjdC1idG5cIik7XG5cdFx0Y29uc3Qgc3VibWl0UHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LXByb2plY3QtYnRuXCIpO1xuXHRcdHRoaXMudGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG5cdFx0dGhpcy5kdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIik7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcblx0XHR0aGlzLnByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmVkaXREYXRhID0gXCJcIjtcblxuXHRcdGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0Y2FuY2VsUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMudHVybk9mZkVkaXRNb2RlKCk7XG5cdFx0XHR0aGlzLmZvcm1FbGVtZW50LnJlc2V0KCk7XG5cblx0XHRcdHRoaXMuZGlhbG9nLmNsb3NlKCk7XG5cdFx0fSk7XG5cblx0XHRzdWJtaXRQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0dGl0bGU6IHRoaXMudGl0bGVJbnB1dC52YWx1ZSxcblx0XHRcdFx0ZHVlRGF0ZTogdGhpcy5kdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG5cdFx0XHRcdHByaW9yaXR5OiB0aGlzLnByaW9yaXR5SW5wdXQuY2hlY2tlZCxcblx0XHRcdH07XG5cdFx0XHQvKiogaWYgdGhpcyBpcyBhIG5ldyBwcm9qZWN0OiAqL1xuXHRcdFx0aWYgKHRoaXMuZWRpdE1vZGUgIT09IHRydWUpIHtcblx0XHRcdFx0bGV0IHJhbmRvbU51bWIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNTAwIC0gMSArIDEpKSArIDE7XG5cdFx0XHRcdGRhdGEuaWQgPVxuXHRcdFx0XHRcdGRhdGEudGl0bGVbMF0gKyBkYXRhLnRpdGxlWzJdICsgZGF0YS50aXRsZVszXSArIFwiLVwiICsgcmFuZG9tTnVtYjtcblxuXHRcdFx0XHRsZXQgbmV3RGF0YVN0b3JlZCA9IGFkZFByb2plY3REYXRhKGRhdGEsIFwicHJvamVjdHNcIik7XG5cblx0XHRcdFx0bmV3IENhcmQoXG5cdFx0XHRcdFx0bmV3RGF0YVN0b3JlZCxcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpLFxuXHRcdFx0XHRcdHRoaXNcblx0XHRcdFx0KTtcblx0XHRcdFx0Ly8qKiBlbHNlIHlvdSBhcmUgZWRpdGluZyBhIHByb2plY3Q6ICovXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhLmlkID0gdGhpcy5lZGl0RGF0YS5pZDtcblx0XHRcdFx0bGV0IG5ld0RhdGFTdG9yZWQgPSBlZGl0UHJvamVjdERhdGEoZGF0YSwgXCJwcm9qZWN0c1wiKTtcblx0XHRcdFx0dGhpcy5jYXJkLmVkaXRDYXJkKG5ld0RhdGFTdG9yZWQpO1xuXHRcdFx0XHR0aGlzLnR1cm5PZmZFZGl0TW9kZSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5mb3JtRWxlbWVudC5yZXNldCgpO1xuXHRcdFx0dGhpcy5kaWFsb2cuY2xvc2UoKTtcblx0XHR9KTtcblx0fVxuXHR0dXJuT25FZGl0TW9kZShkYXRhKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9IHRydWU7XG5cdFx0dGhpcy5lZGl0RGF0YSA9IGRhdGE7XG5cdH1cblx0dHVybk9mZkVkaXRNb2RlKCkge1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmVkaXREYXRhID0gXCJcIjtcblx0fVxuXHRvcGVuTW9kYWwocHJvamVjdERhdGEsIGNhcmQpIHtcblx0XHR0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcblx0XHR0aGlzLnRpdGxlSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS50aXRsZTtcblx0XHR0aGlzLmR1ZURhdGVJbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLmR1ZURhdGU7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlID0gcHJvamVjdERhdGEuZGVzY3JpcHRpb247XG5cdFx0dGhpcy5wcmlvcml0eUlucHV0LmNoZWNrZWQgPSBwcm9qZWN0RGF0YS5wcmlvcml0eTtcblx0XHR0aGlzLmNhcmQgPSBjYXJkO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBpc1N0b3JhZ2VBdmFpbGFibGUoKSB7XG5cdGxldCBzdG9yYWdlO1xuXHR0cnkge1xuXHRcdHN0b3JhZ2UgPSB3aW5kb3dbXCJsb2NhbFN0b3JhZ2VcIl07XG5cdFx0Y29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuXHRcdHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcblx0XHRzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuXHRcdFx0Ly8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuXHRcdFx0KGUuY29kZSA9PT0gMjIgfHxcblx0XHRcdFx0Ly8gRmlyZWZveFxuXHRcdFx0XHRlLmNvZGUgPT09IDEwMTQgfHxcblx0XHRcdFx0Ly8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG5cdFx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG5cdFx0XHQvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuXHRcdFx0c3RvcmFnZSAmJlxuXHRcdFx0c3RvcmFnZS5sZW5ndGggIT09IDBcblx0XHQpO1xuXHR9XG59XG5cbmNsYXNzIFN0b3JhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuXHRcdGlmIChpc1N0b3JhZ2VBdmFpbGFibGUoKSA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRcdFx0aWYgKHRoaXMucHJvamVjdHMpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVc2VyIGhhcyBleGlzdGluZyBTdG9yYWdlOlwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgbm8gcHJldmlvdXMgZGF0YS5cIik7XG5cdFx0XHRcdGxldCBuZXdTdG9yYWdlID0ge1xuXHRcdFx0XHRcdGFjdGl2ZTogW10sXG5cdFx0XHRcdFx0YXJjaGl2ZWQ6IFtdLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkobmV3U3RvcmFnZSkpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRcdFx0XHR0aGlzLnByb2plY3RzID0gbmV3U3RvcmFnZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0SWQsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXG5cdGxldCB0b0tlZXAgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IHByb2plY3RJZCk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gdG9LZWVwO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdERhdGEoZGF0YSwgbG9jYXRpb24pIHtcblx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0c3RvcmFnZS5hY3RpdmUucHVzaChkYXRhKTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cblx0bGV0IG5ld1Byb2plY3REYXRhID0gc3RvcmFnZS5hY3RpdmVbc3RvcmFnZS5hY3RpdmUubGVuZ3RoIC0gMV07XG5cdHJldHVybiBuZXdQcm9qZWN0RGF0YTtcbn1cbmZ1bmN0aW9uIGVkaXRQcm9qZWN0RGF0YShkYXRhLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0bGV0IGVkaXRlZFN0b3JhZ2UgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoXG5cdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IGRhdGEuaWRcblx0KTtcblx0ZWRpdGVkU3RvcmFnZS5wdXNoKGRhdGEpO1xuXHRzdG9yYWdlLmFjdGl2ZSA9IGVkaXRlZFN0b3JhZ2U7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSkpO1xuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuXG5leHBvcnQge1xuXHRpc1N0b3JhZ2VBdmFpbGFibGUsXG5cdFN0b3JhZ2UsXG5cdGFkZFByb2plY3REYXRhLFxuXHRkZWxldGVQcm9qZWN0LFxuXHRlZGl0UHJvamVjdERhdGEsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgTW9kYWwgZnJvbSBcIi4vbW9kdWxlcy9tb2RhbFwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL21vZHVsZXMvY2FyZFwiO1xuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRjb25zdCBwcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdGxldCBwcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cblx0XHRsZXQgbW9kYWwgPSBuZXcgTW9kYWwoKTtcblx0XHRpZiAocHJvamVjdFN0b3JhZ2UucHJvamVjdHMuYWN0aXZlLmxlbmd0aCA+IDApIHtcblx0XHRcdHByb2plY3RTdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdG5ldyBDYXJkKHByb2plY3QsIHByb2pMaXN0V3JhcHBlciwgbW9kYWwpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=