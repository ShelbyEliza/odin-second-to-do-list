/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/addProject.js":
/*!***********************************!*\
  !*** ./src/modules/addProject.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddProject)
/* harmony export */ });
/* harmony import */ var _storageHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageHelper */ "./src/modules/storageHelper.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/modules/card.js");



function AddProject(storage) {
	const addProjBtn = document.getElementById("add-project-btn");
	const dialog = document.getElementById("add-project-wrapper");
	const cancelProjBtn = document.getElementById("cancel-project-btn");
	const submitProjBtn = document.getElementById("submit-project-btn");
	const titleInput = document.getElementById("title");
	const dueDateInput = document.getElementById("dueDate");
	const descriptionInput = document.getElementById("description");

	addProjBtn.addEventListener("click", () => {
		dialog.showModal();
	});

	cancelProjBtn.addEventListener("click", (e) => {
		e.preventDefault();
		dialog.close();
	});

	submitProjBtn.addEventListener("click", (e) => {
		e.preventDefault();

		let data = {
			title: titleInput.value,
			dueDate: dueDateInput.value,
			description: descriptionInput.value,
		};

		let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
		data.id = data.title[0] + data.title[2] + data.title[3] + "-" + randomNumb;

		(0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.addProjectData)(data, storage);
		let newDataStored =
			storage.projects.active[storage.projects.active.length - 1];
		// console.log(newDataStored)
		new _card__WEBPACK_IMPORTED_MODULE_1__.Card(newDataStored, document.querySelector(".project-list-wrapper"));
		dialog.close();
	});
}


/***/ }),

/***/ "./src/modules/card.js":
/*!*****************************!*\
  !*** ./src/modules/card.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card)
/* harmony export */ });
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
	constructor(proj, parentDom) {
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
	}
}

class AllCards {
	constructor() {}
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

function deleteProject(data, storage) {
	let toKeep = storage.projects.active.filter(
		(project) => project.id !== data.id
	);
	storage.projects.active = toKeep;
	localStorage.setItem("projects", JSON.stringify(storage.projects));
}

function addProjectData(data, storage) {
	storage.projects.active.push(data);

	localStorage.setItem("projects", JSON.stringify(storage.projects));
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
/* harmony import */ var _modules_addProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/addProject */ "./src/modules/addProject.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/card */ "./src/modules/card.js");




class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		let projectStorage = new _modules_storageHelper__WEBPACK_IMPORTED_MODULE_0__.Storage("projects");
		console.log(projectStorage);

		let addProjController = new _modules_addProject__WEBPACK_IMPORTED_MODULE_1__["default"](projectStorage, projListWrapper);
		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new _modules_card__WEBPACK_IMPORTED_MODULE_2__.Card(project, projListWrapper);
			});
		}
	}
}
const app = new App();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ25COztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFLDhEQUFjO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUNBQUk7QUFDVjtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFdUQ7Ozs7Ozs7VUM5RHZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNKO0FBQ1I7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyREFBTztBQUNsQzs7QUFFQSw4QkFBOEIsMkRBQVU7QUFDeEM7QUFDQTtBQUNBLFFBQVEsK0NBQUk7QUFDWixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL2FkZFByb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9jYXJkLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvc3RvcmFnZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkZFByb2plY3REYXRhIH0gZnJvbSBcIi4vc3RvcmFnZUhlbHBlclwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL2NhcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWRkUHJvamVjdChzdG9yYWdlKSB7XG5cdGNvbnN0IGFkZFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcblx0Y29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC13cmFwcGVyXCIpO1xuXHRjb25zdCBjYW5jZWxQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWwtcHJvamVjdC1idG5cIik7XG5cdGNvbnN0IHN1Ym1pdFByb2pCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC1wcm9qZWN0LWJ0blwiKTtcblx0Y29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG5cdGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKTtcblx0Y29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XG5cblx0YWRkUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGRpYWxvZy5zaG93TW9kYWwoKTtcblx0fSk7XG5cblx0Y2FuY2VsUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZGlhbG9nLmNsb3NlKCk7XG5cdH0pO1xuXG5cdHN1Ym1pdFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHR0aXRsZTogdGl0bGVJbnB1dC52YWx1ZSxcblx0XHRcdGR1ZURhdGU6IGR1ZURhdGVJbnB1dC52YWx1ZSxcblx0XHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuXHRcdH07XG5cblx0XHRsZXQgcmFuZG9tTnVtYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg1MDAgLSAxICsgMSkpICsgMTtcblx0XHRkYXRhLmlkID0gZGF0YS50aXRsZVswXSArIGRhdGEudGl0bGVbMl0gKyBkYXRhLnRpdGxlWzNdICsgXCItXCIgKyByYW5kb21OdW1iO1xuXG5cdFx0YWRkUHJvamVjdERhdGEoZGF0YSwgc3RvcmFnZSk7XG5cdFx0bGV0IG5ld0RhdGFTdG9yZWQgPVxuXHRcdFx0c3RvcmFnZS5wcm9qZWN0cy5hY3RpdmVbc3RvcmFnZS5wcm9qZWN0cy5hY3RpdmUubGVuZ3RoIC0gMV07XG5cdFx0Ly8gY29uc29sZS5sb2cobmV3RGF0YVN0b3JlZClcblx0XHRuZXcgQ2FyZChuZXdEYXRhU3RvcmVkLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpKTtcblx0XHRkaWFsb2cuY2xvc2UoKTtcblx0fSk7XG59XG4iLCJjbGFzcyBIVE1MRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNsYXNzTmFtZSwgdGV4dENvbnRlbnQsIHBhcmVudERvbSkge1xuXHRcdHRoaXMuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcblx0XHRpZiAoY2xhc3NOYW1lLmxlbmd0aCA+PSAwKSB7XG5cdFx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0ZXh0Q29udGVudCkge1xuXHRcdFx0dGhpcy5kb20udGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcblx0XHRcdGlmIChlbGVtZW50ID09PSBcImJ1dHRvblwiKSB7XG5cdFx0XHRcdHRoaXMuZG9tLnZhbHVlID0gdGV4dENvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwYXJlbnREb20pIHtcblx0XHRcdHRoaXMuYXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKTtcblx0XHR9XG5cdH1cblx0YWRkVG9DbGFzc0xpc3QoY2xhc3NOYW1lKSB7XG5cdFx0dGhpcy5kb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHR9XG5cdGFwcGVuZFRvUGFyZW50KHBhcmVudERvbSkge1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLmRvbSk7XG5cdH1cbn1cblxuY2xhc3MgQ2FyZCB7XG5cdGNvbnN0cnVjdG9yKHByb2osIHBhcmVudERvbSkge1xuXHRcdHRoaXMuaWQgPSBwcm9qLmlkO1xuXHRcdHRoaXMud3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcImRpdlwiLCBcImNhcmQtd3JhcHBlclwiKTtcblx0XHR0aGlzLnRpdGxlID0gbmV3IEhUTUxFbGVtZW50KFwiaDNcIiwgXCJ0aXRsZVwiLCBwcm9qLnRpdGxlLCB0aGlzLndyYXBwZXIuZG9tKTtcblx0XHR0aGlzLmR1ZURhdGUgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZHVlLWRhdGVcIixcblx0XHRcdHByb2ouZHVlRGF0ZSxcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcInBcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIixcblx0XHRcdHByb2ouZGVzY3JpcHRpb24sXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmJ0bldyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImRpdlwiLFxuXHRcdFx0XCJjYXJkLWJ0bi13cmFwcGVyXCIsXG5cdFx0XHRcIlwiLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5lZGl0QnRuID0gbmV3IEhUTUxFbGVtZW50KFxuXHRcdFx0XCJidXR0b25cIixcblx0XHRcdFwiZWRpdC1idG5cIixcblx0XHRcdFwiRWRpdFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZWxldGVCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJkZWxldGUtYnRuXCIsXG5cdFx0XHRcIlhcIixcblx0XHRcdHRoaXMuYnRuV3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIuZG9tKTtcblx0fVxufVxuXG5jbGFzcyBBbGxDYXJkcyB7XG5cdGNvbnN0cnVjdG9yKCkge31cbn1cblxuZXhwb3J0IHsgQ2FyZCB9O1xuIiwiZnVuY3Rpb24gaXNTdG9yYWdlQXZhaWxhYmxlKCkge1xuXHRsZXQgc3RvcmFnZTtcblx0dHJ5IHtcblx0XHRzdG9yYWdlID0gd2luZG93W1wibG9jYWxTdG9yYWdlXCJdO1xuXHRcdGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcblx0XHRzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG5cdFx0c3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcblx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdChlLmNvZGUgPT09IDIyIHx8XG5cdFx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdFx0ZS5jb2RlID09PSAxMDE0IHx8XG5cdFx0XHRcdC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuXHRcdFx0XHQvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuXHRcdFx0XHQvLyBGaXJlZm94XG5cdFx0XHRcdGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuXHRcdFx0Ly8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcblx0XHRcdHN0b3JhZ2UgJiZcblx0XHRcdHN0b3JhZ2UubGVuZ3RoICE9PSAwXG5cdFx0KTtcblx0fVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcblx0Y29uc3RydWN0b3IobG9jYXRpb24pIHtcblx0XHRpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKCkgPT09IHRydWUpIHtcblx0XHRcdHRoaXMucHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0XHRcdGlmICh0aGlzLnByb2plY3RzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXNlciBoYXMgZXhpc3RpbmcgU3RvcmFnZTpcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVzZXIgaGFzIG5vIHByZXZpb3VzIGRhdGEuXCIpO1xuXHRcdFx0XHRsZXQgbmV3U3RvcmFnZSA9IHtcblx0XHRcdFx0XHRhY3RpdmU6IFtdLFxuXHRcdFx0XHRcdGFyY2hpdmVkOiBbXSxcblx0XHRcdFx0fTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2UpKTtcblx0XHRcdFx0Y29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblx0XHRcdFx0dGhpcy5wcm9qZWN0cyA9IG5ld1N0b3JhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZGF0YSwgc3RvcmFnZSkge1xuXHRsZXQgdG9LZWVwID0gc3RvcmFnZS5wcm9qZWN0cy5hY3RpdmUuZmlsdGVyKFxuXHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBkYXRhLmlkXG5cdCk7XG5cdHN0b3JhZ2UucHJvamVjdHMuYWN0aXZlID0gdG9LZWVwO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UucHJvamVjdHMpKTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdERhdGEoZGF0YSwgc3RvcmFnZSkge1xuXHRzdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5wdXNoKGRhdGEpO1xuXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZS5wcm9qZWN0cykpO1xufVxuXG5leHBvcnQgeyBpc1N0b3JhZ2VBdmFpbGFibGUsIFN0b3JhZ2UsIGFkZFByb2plY3REYXRhIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9tb2R1bGVzL3N0b3JhZ2VIZWxwZXJcIjtcbmltcG9ydCBBZGRQcm9qZWN0IGZyb20gXCIuL21vZHVsZXMvYWRkUHJvamVjdFwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL21vZHVsZXMvY2FyZFwiO1xuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRjb25zdCBwcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdGxldCBwcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdFN0b3JhZ2UpO1xuXG5cdFx0bGV0IGFkZFByb2pDb250cm9sbGVyID0gbmV3IEFkZFByb2plY3QocHJvamVjdFN0b3JhZ2UsIHByb2pMaXN0V3JhcHBlcik7XG5cdFx0aWYgKHByb2plY3RTdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRwcm9qZWN0U3RvcmFnZS5wcm9qZWN0cy5hY3RpdmUuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRuZXcgQ2FyZChwcm9qZWN0LCBwcm9qTGlzdFdyYXBwZXIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=