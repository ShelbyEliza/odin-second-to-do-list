import { addProjectData } from "./storageHelper";
import { Card } from "./card";

export default function AddProject(storage) {
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

		addProjectData(data, storage);
		let newDataStored =
			storage.projects.active[storage.projects.active.length - 1];
		// console.log(newDataStored)
		new Card(newDataStored, document.querySelector(".project-list-wrapper"));
		dialog.close();
	});
}
