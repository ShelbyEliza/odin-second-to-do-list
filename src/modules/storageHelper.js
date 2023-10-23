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

export { isStorageAvailable, Storage, addProjectData, deleteProject };
