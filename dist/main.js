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
		console.log(modal);
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

			modal.openModal(proj);
			modal.turnOnEditMode(proj);

			/** can't cancel editing without deleting card dom */
			this.wrapper.dom.remove();
		});
	}
	getCard() {
		return this;
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
		const addProjBtn = document.getElementById("add-project-btn");
		this.dialog = document.getElementById("add-project-wrapper");
		const cancelProjBtn = document.getElementById("cancel-project-btn");
		const submitProjBtn = document.getElementById("submit-project-btn");
		// const editProjBtn = document.getElementById("edit-project-btn");
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
			this.dialog.close();
		});

		// editProjBtn.addEventListener("click", (e) => {
		// 	e.preventDefault();

		// 	let data = {
		// 		title: titleInput.value,
		// 		dueDate: dueDateInput.value,
		// 		description: descriptionInput.value,
		// 	};
		// 	editProject(data);
		// });

		submitProjBtn.addEventListener("click", (e) => {
			e.preventDefault();
			console.log(this.editMode);
			let data = {
				title: this.titleInput.value,
				dueDate: this.dueDateInput.value,
				description: this.descriptionInput.value,
			};
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
			} else {
				data.id = this.editData.id;
				console.log(data);
				let newDataStored = (0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.editProjectData)(data, "projects");
				new _card__WEBPACK_IMPORTED_MODULE_1__.Card(
					newDataStored,
					document.querySelector(".project-list-wrapper"),
					this
				);
				this.turnOffEditMode();
			}

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
	openModal(projectData) {
		this.dialog.showModal();
		this.titleInput.value = projectData.title;
		this.dueDateInput.value = projectData.dueDate;
		this.descriptionInput.value = projectData.description;
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
	console.log(editedStorage);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxHQUFHLDZEQUFhO0FBQ2hCO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RmtEO0FBQ3BDOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLDhEQUFjOztBQUV0QyxRQUFRLHVDQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QiwrREFBZTtBQUN2QyxRQUFRLHVDQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBUUU7Ozs7Ozs7VUNwRkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ2Q7QUFDRTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDJEQUFPOztBQUVsQyxrQkFBa0Isc0RBQUs7QUFDdkI7QUFDQTtBQUNBLFFBQVEsK0NBQUk7QUFDWixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWxldGVQcm9qZWN0IH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuXG5jbGFzcyBIVE1MRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNsYXNzTmFtZSwgdGV4dENvbnRlbnQsIHBhcmVudERvbSkge1xuXHRcdHRoaXMuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcblx0XHRpZiAoY2xhc3NOYW1lLmxlbmd0aCA+PSAwKSB7XG5cdFx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0ZXh0Q29udGVudCkge1xuXHRcdFx0dGhpcy5kb20udGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcblx0XHRcdGlmIChlbGVtZW50ID09PSBcImJ1dHRvblwiKSB7XG5cdFx0XHRcdHRoaXMuZG9tLnZhbHVlID0gdGV4dENvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwYXJlbnREb20pIHtcblx0XHRcdHRoaXMuYXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKTtcblx0XHR9XG5cdH1cblx0YWRkVG9DbGFzc0xpc3QoY2xhc3NOYW1lKSB7XG5cdFx0dGhpcy5kb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHR9XG5cdGFwcGVuZFRvUGFyZW50KHBhcmVudERvbSkge1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLmRvbSk7XG5cdH1cbn1cblxuY2xhc3MgQ2FyZCB7XG5cdGNvbnN0cnVjdG9yKHByb2osIHBhcmVudERvbSwgbW9kYWwpIHtcblx0XHRjb25zb2xlLmxvZyhtb2RhbCk7XG5cdFx0dGhpcy5pZCA9IHByb2ouaWQ7XG5cdFx0dGhpcy53cmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFwiZGl2XCIsIFwiY2FyZC13cmFwcGVyXCIpO1xuXHRcdHRoaXMudGl0bGUgPSBuZXcgSFRNTEVsZW1lbnQoXCJoM1wiLCBcInRpdGxlXCIsIHByb2oudGl0bGUsIHRoaXMud3JhcHBlci5kb20pO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkdWUtZGF0ZVwiLFxuXHRcdFx0cHJvai5kdWVEYXRlLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0cHJvai5kZXNjcmlwdGlvbixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuYnRuV3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiZGl2XCIsXG5cdFx0XHRcImNhcmQtYnRuLXdyYXBwZXJcIixcblx0XHRcdFwiXCIsXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmVkaXRCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJlZGl0LWJ0blwiLFxuXHRcdFx0XCJFZGl0XCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmRlbGV0ZUJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImRlbGV0ZS1idG5cIixcblx0XHRcdFwiWFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlci5kb20pO1xuXG5cdFx0dGhpcy5kZWxldGVCdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRkZWxldGVQcm9qZWN0KHRoaXMuaWQsIFwicHJvamVjdHNcIik7XG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tLnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5lZGl0QnRuLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bW9kYWwub3Blbk1vZGFsKHByb2opO1xuXHRcdFx0bW9kYWwudHVybk9uRWRpdE1vZGUocHJvaik7XG5cblx0XHRcdC8qKiBjYW4ndCBjYW5jZWwgZWRpdGluZyB3aXRob3V0IGRlbGV0aW5nIGNhcmQgZG9tICovXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGdldENhcmQoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IHsgQ2FyZCB9O1xuIiwiaW1wb3J0IHsgYWRkUHJvamVjdERhdGEsIGVkaXRQcm9qZWN0RGF0YSB9IGZyb20gXCIuL3N0b3JhZ2VIZWxwZXJcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9jYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Y29uc3QgYWRkUHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3QtYnRuXCIpO1xuXHRcdHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC13cmFwcGVyXCIpO1xuXHRcdGNvbnN0IGNhbmNlbFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbC1wcm9qZWN0LWJ0blwiKTtcblx0XHRjb25zdCBzdWJtaXRQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtcHJvamVjdC1idG5cIik7XG5cdFx0Ly8gY29uc3QgZWRpdFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcHJvamVjdC1idG5cIik7XG5cdFx0dGhpcy50aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKTtcblx0XHR0aGlzLmR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmVkaXREYXRhID0gXCJcIjtcblxuXHRcdGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdH0pO1xuXG5cdFx0Y2FuY2VsUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuZGlhbG9nLmNsb3NlKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBlZGl0UHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHQvLyBcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIFx0bGV0IGRhdGEgPSB7XG5cdFx0Ly8gXHRcdHRpdGxlOiB0aXRsZUlucHV0LnZhbHVlLFxuXHRcdC8vIFx0XHRkdWVEYXRlOiBkdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0Ly8gXHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuXHRcdC8vIFx0fTtcblx0XHQvLyBcdGVkaXRQcm9qZWN0KGRhdGEpO1xuXHRcdC8vIH0pO1xuXG5cdFx0c3VibWl0UHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuZWRpdE1vZGUpO1xuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRcdGR1ZURhdGU6IHRoaXMuZHVlRGF0ZUlucHV0LnZhbHVlLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuXHRcdFx0fTtcblx0XHRcdGlmICh0aGlzLmVkaXRNb2RlICE9PSB0cnVlKSB7XG5cdFx0XHRcdGxldCByYW5kb21OdW1iID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDUwMCAtIDEgKyAxKSkgKyAxO1xuXHRcdFx0XHRkYXRhLmlkID1cblx0XHRcdFx0XHRkYXRhLnRpdGxlWzBdICsgZGF0YS50aXRsZVsyXSArIGRhdGEudGl0bGVbM10gKyBcIi1cIiArIHJhbmRvbU51bWI7XG5cblx0XHRcdFx0bGV0IG5ld0RhdGFTdG9yZWQgPSBhZGRQcm9qZWN0RGF0YShkYXRhLCBcInByb2plY3RzXCIpO1xuXG5cdFx0XHRcdG5ldyBDYXJkKFxuXHRcdFx0XHRcdG5ld0RhdGFTdG9yZWQsXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3Qtd3JhcHBlclwiKSxcblx0XHRcdFx0XHR0aGlzXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhLmlkID0gdGhpcy5lZGl0RGF0YS5pZDtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGxldCBuZXdEYXRhU3RvcmVkID0gZWRpdFByb2plY3REYXRhKGRhdGEsIFwicHJvamVjdHNcIik7XG5cdFx0XHRcdG5ldyBDYXJkKFxuXHRcdFx0XHRcdG5ld0RhdGFTdG9yZWQsXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3Qtd3JhcHBlclwiKSxcblx0XHRcdFx0XHR0aGlzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMudHVybk9mZkVkaXRNb2RlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZGlhbG9nLmNsb3NlKCk7XG5cdFx0fSk7XG5cdH1cblx0dHVybk9uRWRpdE1vZGUoZGF0YSkge1xuXHRcdHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuXHRcdHRoaXMuZWRpdERhdGEgPSBkYXRhO1xuXHR9XG5cdHR1cm5PZmZFZGl0TW9kZSgpIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cdFx0dGhpcy5lZGl0RGF0YSA9IFwiXCI7XG5cdH1cblx0b3Blbk1vZGFsKHByb2plY3REYXRhKSB7XG5cdFx0dGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG5cdFx0dGhpcy50aXRsZUlucHV0LnZhbHVlID0gcHJvamVjdERhdGEudGl0bGU7XG5cdFx0dGhpcy5kdWVEYXRlSW5wdXQudmFsdWUgPSBwcm9qZWN0RGF0YS5kdWVEYXRlO1xuXHRcdHRoaXMuZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2plY3REYXRhLmRlc2NyaXB0aW9uO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBpc1N0b3JhZ2VBdmFpbGFibGUoKSB7XG5cdGxldCBzdG9yYWdlO1xuXHR0cnkge1xuXHRcdHN0b3JhZ2UgPSB3aW5kb3dbXCJsb2NhbFN0b3JhZ2VcIl07XG5cdFx0Y29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuXHRcdHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcblx0XHRzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuXHRcdFx0Ly8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuXHRcdFx0KGUuY29kZSA9PT0gMjIgfHxcblx0XHRcdFx0Ly8gRmlyZWZveFxuXHRcdFx0XHRlLmNvZGUgPT09IDEwMTQgfHxcblx0XHRcdFx0Ly8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG5cdFx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG5cdFx0XHQvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuXHRcdFx0c3RvcmFnZSAmJlxuXHRcdFx0c3RvcmFnZS5sZW5ndGggIT09IDBcblx0XHQpO1xuXHR9XG59XG5cbmNsYXNzIFN0b3JhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuXHRcdGlmIChpc1N0b3JhZ2VBdmFpbGFibGUoKSA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRcdFx0aWYgKHRoaXMucHJvamVjdHMpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVc2VyIGhhcyBleGlzdGluZyBTdG9yYWdlOlwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgbm8gcHJldmlvdXMgZGF0YS5cIik7XG5cdFx0XHRcdGxldCBuZXdTdG9yYWdlID0ge1xuXHRcdFx0XHRcdGFjdGl2ZTogW10sXG5cdFx0XHRcdFx0YXJjaGl2ZWQ6IFtdLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkobmV3U3RvcmFnZSkpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXHRcdFx0XHR0aGlzLnByb2plY3RzID0gbmV3U3RvcmFnZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0SWQsIGxvY2F0aW9uKSB7XG5cdGxldCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXG5cdGxldCB0b0tlZXAgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IHByb2plY3RJZCk7XG5cdHN0b3JhZ2UuYWN0aXZlID0gdG9LZWVwO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdERhdGEoZGF0YSwgbG9jYXRpb24pIHtcblx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0c3RvcmFnZS5hY3RpdmUucHVzaChkYXRhKTtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSk7XG5cblx0bGV0IG5ld1Byb2plY3REYXRhID0gc3RvcmFnZS5hY3RpdmVbc3RvcmFnZS5hY3RpdmUubGVuZ3RoIC0gMV07XG5cdHJldHVybiBuZXdQcm9qZWN0RGF0YTtcbn1cbmZ1bmN0aW9uIGVkaXRQcm9qZWN0RGF0YShkYXRhLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0bGV0IGVkaXRlZFN0b3JhZ2UgPSBzdG9yYWdlLmFjdGl2ZS5maWx0ZXIoXG5cdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IGRhdGEuaWRcblx0KTtcblx0Y29uc29sZS5sb2coZWRpdGVkU3RvcmFnZSk7XG5cdGVkaXRlZFN0b3JhZ2UucHVzaChkYXRhKTtcblx0c3RvcmFnZS5hY3RpdmUgPSBlZGl0ZWRTdG9yYWdlO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcblx0bGV0IG5ld1Byb2plY3REYXRhID0gc3RvcmFnZS5hY3RpdmVbc3RvcmFnZS5hY3RpdmUubGVuZ3RoIC0gMV07XG5cdHJldHVybiBuZXdQcm9qZWN0RGF0YTtcbn1cblxuZXhwb3J0IHtcblx0aXNTdG9yYWdlQXZhaWxhYmxlLFxuXHRTdG9yYWdlLFxuXHRhZGRQcm9qZWN0RGF0YSxcblx0ZGVsZXRlUHJvamVjdCxcblx0ZWRpdFByb2plY3REYXRhLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL21vZHVsZXMvc3RvcmFnZUhlbHBlclwiO1xuaW1wb3J0IE1vZGFsIGZyb20gXCIuL21vZHVsZXMvbW9kYWxcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9tb2R1bGVzL2NhcmRcIjtcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Y29uc3QgcHJvakxpc3RXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3Qtd3JhcHBlclwiKTtcblx0XHRsZXQgcHJvamVjdFN0b3JhZ2UgPSBuZXcgU3RvcmFnZShcInByb2plY3RzXCIpO1xuXG5cdFx0bGV0IG1vZGFsID0gbmV3IE1vZGFsKCk7XG5cdFx0aWYgKHByb2plY3RTdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRwcm9qZWN0U3RvcmFnZS5wcm9qZWN0cy5hY3RpdmUuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRuZXcgQ2FyZChwcm9qZWN0LCBwcm9qTGlzdFdyYXBwZXIsIG1vZGFsKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9