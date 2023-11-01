import { compareAsc, compareDesc } from "date-fns";
import { formatNewDate } from "./formatDate.js";

class Storage {
	constructor() {
		this.view = "alpha";
		this.showCompleted = false;

		if (isStorageAvailable() === true) {
			if (!this.getStoredData("projects")) {
				console.log("User has no previous projects data.");

				localStorage.setItem("projects", {
					active: [],
					archived: [],
				});
			} else {
				// console.log("User has previous projects data.");
			}

			if (!this.getStoredData("view")) {
				this.setStoredSettings("view");
			} else {
				this.view = this.getStoredData("view");
			}
			if (!this.getStoredData("showCompleted")) {
				this.setStoredSettings("showCompleted");
			} else {
				this.showCompleted = this.getStoredData("showCompleted");
			}
		} else {
			console.log("Storage is not available.");
		}
	}
	getStoredData(location) {
		return localStorage.getItem(location);
	}
	getParsedStoredData(location) {
		// return JSON.parse(localStorage.getItem(location));
		return localStorage.getItem(location);
	}
	setStoredData(storage) {
		// localStorage.setItem("projects", JSON.stringify(storage));
		localStorage.setItem("projects", storage);
	}
	setStoredSettings(location) {
		localStorage.setItem(location, this[location]);
	}

	deleteProject(projectId, location) {
		let storage = this.getParsedStoredData("projects");

		let toKeep = storage[location].filter(
			(project) => project.id !== projectId
		);
		storage[location] = toKeep;
		this.setStoredData(storage);
	}

	addProjectData(data, location) {
		let storage = this.getParsedStoredData("projects");

		storage[location].push(data);
		this.setStoredData(storage);

		let newProjectData = storage.active[storage[location].length - 1];

		return newProjectData;
	}

	editProjectData(data, location, newLocation) {
		let storage = this.getParsedStoredData("projects");
		let editedStorage = storage[location].filter(
			(project) => project.id !== data.id
		);
		if (!newLocation) {
			editedStorage.push(data);
			storage[location] = editedStorage;
			this.setStoredData(storage);

			let newProjectData = storage[location][storage[location].length - 1];
			return newProjectData;
		} else {
			storage[location] = editedStorage;
			storage[newLocation].push(data);

			this.setStoredData(storage);
			let newProjectData =
				storage[newLocation][storage[newLocation].length - 1];
			return newProjectData;
		}
	}

	sortByAlpha() {
		let storage = this.getParsedStoredData("projects");

		storage.active.sort(function compareFn(a, b) {
			if (a.title < b.title) {
				return -1;
			} else if (a.title > b.title) {
				return 1;
			}
			return 0;
		});
		storage.archived.sort(function compareFn(a, b) {
			if (a.title < b.title) {
				return -1;
			} else if (a.title > b.title) {
				return 1;
			}
			return 0;
		});

		this.setStoredData(storage);
	}

	sortByDue(setting) {
		let storage = this.getParsedStoredData("projects");

		if (setting === "ascending") {
			storage.active.sort((a, b) => {
				return compareAsc(
					new Date(formatNewDate(a.dueDate)),
					new Date(formatNewDate(b.dueDate))
				);
			});
		} else {
			storage.active.sort((a, b) => {
				return compareDesc(
					new Date(formatNewDate(a.dueDate)),
					new Date(formatNewDate(b.dueDate))
				);
			});
			storage.archived.sort((a, b) => {
				return compareDesc(
					new Date(formatNewDate(a.dueDate)),
					new Date(formatNewDate(b.dueDate))
				);
			});
		}
		this.setStoredData(storage);
	}
}

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
let myStorage = new Storage();

export { myStorage };
