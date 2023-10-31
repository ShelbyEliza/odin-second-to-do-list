import { compareAsc, compareDesc } from "date-fns";
import { formatNewDate } from "./formatDate.js";

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
			localStorage.setItem("view", "alpha");
			console.log(localStorage.getItem("view"));

			if (!localStorage.getItem(location)) {
				console.log("User has no previous data.");
				let newStorage = {
					active: [],
					archived: [],
				};
				localStorage.setItem(location, JSON.stringify(newStorage));
				console.log(localStorage.getItem(location));
			} else {
				console.log("User has existing Storage:");
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

function addProjectData(data, location, view) {
	let storage = JSON.parse(localStorage.getItem(location));

	storage.active.push(data);
	localStorage.setItem("projects", JSON.stringify(storage));

	let newProjectData = storage.active[storage.active.length - 1];

	return newProjectData;
}
function editProjectData(data, location, view) {
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

function sortByAlpha() {
	let storage = JSON.parse(localStorage.getItem("projects"));

	storage.active.sort(function compareFn(a, b) {
		if (a.title < b.title) {
			return -1;
		} else if (a.title > b.title) {
			return 1;
		}
		return 0;
	});
	localStorage.setItem("projects", JSON.stringify(storage));
}

function sortByDue(setting) {
	let storage = JSON.parse(localStorage.getItem("projects"));
	console.log(storage);

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
	}
	localStorage.setItem("projects", JSON.stringify(storage));
}

export {
	isStorageAvailable,
	Storage,
	addProjectData,
	deleteProject,
	editProjectData,
	sortByAlpha,
	sortByDue,
};
