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



function AddProject() {
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

		let newDataStored = (0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.addProjectData)(data, "projects");

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

		this.deleteBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();

			(0,_storageHelper__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(this.id, "projects");
			this.wrapper.dom.remove();
		});
	}
	getCard() {
		return this;
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
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
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

		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new _modules_card__WEBPACK_IMPORTED_MODULE_2__.Card(project, projListWrapper);
			});
		}
		new _modules_addProject__WEBPACK_IMPORTED_MODULE_1__["default"]();
	}
}
const app = new App();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ25COztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsOERBQWM7O0FBRXBDLE1BQU0sdUNBQUk7QUFDVjtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRyw2REFBYTtBQUNoQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9FaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFc0U7Ozs7Ozs7VUNsRXRFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNKO0FBQ1I7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyREFBTzs7QUFFbEM7QUFDQTtBQUNBLFFBQVEsK0NBQUk7QUFDWixJQUFJO0FBQ0o7QUFDQSxNQUFNLDJEQUFVO0FBQ2hCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG8tZG9zLy4vc3JjL21vZHVsZXMvYWRkUHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy8uL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvbW9kdWxlcy9zdG9yYWdlSGVscGVyLmpzIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG9zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kb3MvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRkUHJvamVjdERhdGEgfSBmcm9tIFwiLi9zdG9yYWdlSGVscGVyXCI7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4vY2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZGRQcm9qZWN0KCkge1xuXHRjb25zdCBhZGRQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcHJvamVjdC1idG5cIik7XG5cdGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3Qtd3JhcHBlclwiKTtcblx0Y29uc3QgY2FuY2VsUHJvakJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsLXByb2plY3QtYnRuXCIpO1xuXHRjb25zdCBzdWJtaXRQcm9qQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtcHJvamVjdC1idG5cIik7XG5cdGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpO1xuXHRjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIik7XG5cdGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuXG5cdGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRkaWFsb2cuc2hvd01vZGFsKCk7XG5cdH0pO1xuXG5cdGNhbmNlbFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRpYWxvZy5jbG9zZSgpO1xuXHR9KTtcblxuXHRzdWJtaXRQcm9qQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0dGl0bGU6IHRpdGxlSW5wdXQudmFsdWUsXG5cdFx0XHRkdWVEYXRlOiBkdWVEYXRlSW5wdXQudmFsdWUsXG5cdFx0XHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcblx0XHR9O1xuXG5cdFx0bGV0IHJhbmRvbU51bWIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNTAwIC0gMSArIDEpKSArIDE7XG5cdFx0ZGF0YS5pZCA9IGRhdGEudGl0bGVbMF0gKyBkYXRhLnRpdGxlWzJdICsgZGF0YS50aXRsZVszXSArIFwiLVwiICsgcmFuZG9tTnVtYjtcblxuXHRcdGxldCBuZXdEYXRhU3RvcmVkID0gYWRkUHJvamVjdERhdGEoZGF0YSwgXCJwcm9qZWN0c1wiKTtcblxuXHRcdG5ldyBDYXJkKG5ld0RhdGFTdG9yZWQsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0LXdyYXBwZXJcIikpO1xuXHRcdGRpYWxvZy5jbG9zZSgpO1xuXHR9KTtcbn1cbiIsImltcG9ydCB7IGRlbGV0ZVByb2plY3QgfSBmcm9tIFwiLi9zdG9yYWdlSGVscGVyXCI7XG5cbmNsYXNzIEhUTUxFbGVtZW50IHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgY2xhc3NOYW1lLCB0ZXh0Q29udGVudCwgcGFyZW50RG9tKSB7XG5cdFx0dGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGlmIChjbGFzc05hbWUubGVuZ3RoID49IDApIHtcblx0XHRcdHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHRleHRDb250ZW50KSB7XG5cdFx0XHR0aGlzLmRvbS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuXHRcdFx0aWYgKGVsZW1lbnQgPT09IFwiYnV0dG9uXCIpIHtcblx0XHRcdFx0dGhpcy5kb20udmFsdWUgPSB0ZXh0Q29udGVudDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBhcmVudERvbSkge1xuXHRcdFx0dGhpcy5hcHBlbmRUb1BhcmVudChwYXJlbnREb20pO1xuXHRcdH1cblx0fVxuXHRhZGRUb0NsYXNzTGlzdChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdH1cblx0YXBwZW5kVG9QYXJlbnQocGFyZW50RG9tKSB7XG5cdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKHRoaXMuZG9tKTtcblx0fVxufVxuXG5jbGFzcyBDYXJkIHtcblx0Y29uc3RydWN0b3IocHJvaiwgcGFyZW50RG9tKSB7XG5cdFx0dGhpcy5pZCA9IHByb2ouaWQ7XG5cdFx0dGhpcy53cmFwcGVyID0gbmV3IEhUTUxFbGVtZW50KFwiZGl2XCIsIFwiY2FyZC13cmFwcGVyXCIpO1xuXHRcdHRoaXMudGl0bGUgPSBuZXcgSFRNTEVsZW1lbnQoXCJoM1wiLCBcInRpdGxlXCIsIHByb2oudGl0bGUsIHRoaXMud3JhcHBlci5kb20pO1xuXHRcdHRoaXMuZHVlRGF0ZSA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkdWUtZGF0ZVwiLFxuXHRcdFx0cHJvai5kdWVEYXRlLFxuXHRcdFx0dGhpcy53cmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwicFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiLFxuXHRcdFx0cHJvai5kZXNjcmlwdGlvbixcblx0XHRcdHRoaXMud3JhcHBlci5kb21cblx0XHQpO1xuXHRcdHRoaXMuYnRuV3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiZGl2XCIsXG5cdFx0XHRcImNhcmQtYnRuLXdyYXBwZXJcIixcblx0XHRcdFwiXCIsXG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmVkaXRCdG4gPSBuZXcgSFRNTEVsZW1lbnQoXG5cdFx0XHRcImJ1dHRvblwiLFxuXHRcdFx0XCJlZGl0LWJ0blwiLFxuXHRcdFx0XCJFZGl0XCIsXG5cdFx0XHR0aGlzLmJ0bldyYXBwZXIuZG9tXG5cdFx0KTtcblx0XHR0aGlzLmRlbGV0ZUJ0biA9IG5ldyBIVE1MRWxlbWVudChcblx0XHRcdFwiYnV0dG9uXCIsXG5cdFx0XHRcImRlbGV0ZS1idG5cIixcblx0XHRcdFwiWFwiLFxuXHRcdFx0dGhpcy5idG5XcmFwcGVyLmRvbVxuXHRcdCk7XG5cdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlci5kb20pO1xuXG5cdFx0dGhpcy5kZWxldGVCdG4uZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRkZWxldGVQcm9qZWN0KHRoaXMuaWQsIFwicHJvamVjdHNcIik7XG5cdFx0XHR0aGlzLndyYXBwZXIuZG9tLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGdldENhcmQoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuY2xhc3MgQWxsQ2FyZHMge1xuXHRjb25zdHJ1Y3RvcigpIHt9XG59XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImZ1bmN0aW9uIGlzU3RvcmFnZUF2YWlsYWJsZSgpIHtcblx0bGV0IHN0b3JhZ2U7XG5cdHRyeSB7XG5cdFx0c3RvcmFnZSA9IHdpbmRvd1tcImxvY2FsU3RvcmFnZVwiXTtcblx0XHRjb25zdCB4ID0gXCJfX3N0b3JhZ2VfdGVzdF9fXCI7XG5cdFx0c3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuXHRcdHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiAoXG5cdFx0XHRlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmXG5cdFx0XHQvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG5cdFx0XHQoZS5jb2RlID09PSAyMiB8fFxuXHRcdFx0XHQvLyBGaXJlZm94XG5cdFx0XHRcdGUuY29kZSA9PT0gMTAxNCB8fFxuXHRcdFx0XHQvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcblx0XHRcdFx0Ly8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuXHRcdFx0XHRlLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIgfHxcblx0XHRcdFx0Ly8gRmlyZWZveFxuXHRcdFx0XHRlLm5hbWUgPT09IFwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIikgJiZcblx0XHRcdC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG5cdFx0XHRzdG9yYWdlICYmXG5cdFx0XHRzdG9yYWdlLmxlbmd0aCAhPT0gMFxuXHRcdCk7XG5cdH1cbn1cblxuY2xhc3MgU3RvcmFnZSB7XG5cdGNvbnN0cnVjdG9yKGxvY2F0aW9uKSB7XG5cdFx0aWYgKGlzU3RvcmFnZUF2YWlsYWJsZSgpID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLnByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhdGlvbikpO1xuXG5cdFx0XHRpZiAodGhpcy5wcm9qZWN0cykge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVzZXIgaGFzIGV4aXN0aW5nIFN0b3JhZ2U6XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVc2VyIGhhcyBubyBwcmV2aW91cyBkYXRhLlwiKTtcblx0XHRcdFx0bGV0IG5ld1N0b3JhZ2UgPSB7XG5cdFx0XHRcdFx0YWN0aXZlOiBbXSxcblx0XHRcdFx0XHRhcmNoaXZlZDogW10sXG5cdFx0XHRcdH07XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2F0aW9uLCBKU09OLnN0cmluZ2lmeShuZXdTdG9yYWdlKSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cdFx0XHRcdHRoaXMucHJvamVjdHMgPSBuZXdTdG9yYWdlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KHByb2plY3RJZCwgbG9jYXRpb24pIHtcblx0bGV0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2F0aW9uKSk7XG5cblx0bGV0IHRvS2VlcCA9IHN0b3JhZ2UuYWN0aXZlLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5pZCAhPT0gcHJvamVjdElkKTtcblx0c3RvcmFnZS5hY3RpdmUgPSB0b0tlZXA7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSkpO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0RGF0YShkYXRhLCBsb2NhdGlvbikge1xuXHRsZXQgc3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYXRpb24pKTtcblxuXHRzdG9yYWdlLmFjdGl2ZS5wdXNoKGRhdGEpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKTtcblxuXHRsZXQgbmV3UHJvamVjdERhdGEgPSBzdG9yYWdlLmFjdGl2ZVtzdG9yYWdlLmFjdGl2ZS5sZW5ndGggLSAxXTtcblx0cmV0dXJuIG5ld1Byb2plY3REYXRhO1xufVxuXG5leHBvcnQgeyBpc1N0b3JhZ2VBdmFpbGFibGUsIFN0b3JhZ2UsIGFkZFByb2plY3REYXRhLCBkZWxldGVQcm9qZWN0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9tb2R1bGVzL3N0b3JhZ2VIZWxwZXJcIjtcbmltcG9ydCBBZGRQcm9qZWN0IGZyb20gXCIuL21vZHVsZXMvYWRkUHJvamVjdFwiO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL21vZHVsZXMvY2FyZFwiO1xuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRjb25zdCBwcm9qTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdC13cmFwcGVyXCIpO1xuXHRcdGxldCBwcm9qZWN0U3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwicHJvamVjdHNcIik7XG5cblx0XHRpZiAocHJvamVjdFN0b3JhZ2UucHJvamVjdHMuYWN0aXZlLmxlbmd0aCA+IDApIHtcblx0XHRcdHByb2plY3RTdG9yYWdlLnByb2plY3RzLmFjdGl2ZS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdG5ldyBDYXJkKHByb2plY3QsIHByb2pMaXN0V3JhcHBlcik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0bmV3IEFkZFByb2plY3QoKTtcblx0fVxufVxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9