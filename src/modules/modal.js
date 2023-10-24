import { addProjectData, editProjectData } from "./storageHelper";
import { Card } from "./card";

export default class Modal {
	constructor() {
		this.formElement = document.getElementById("modal-form");
		this.dialog = document.getElementById("add-project-wrapper");
		const addProjBtn = document.getElementById("add-project-btn");
		const cancelProjBtn = document.getElementById("cancel-project-btn");
		const submitProjBtn = document.getElementById("submit-project-btn");
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
			};
			/** if this is a new project: */
			if (this.editMode !== true) {
				let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
				data.id =
					data.title[0] + data.title[2] + data.title[3] + "-" + randomNumb;

				let newDataStored = addProjectData(data, "projects");

				new Card(
					newDataStored,
					document.querySelector(".project-list-wrapper"),
					this
				);
				//** else you are editing a project: */
			} else {
				data.id = this.editData.id;
				let newDataStored = editProjectData(data, "projects");
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
		this.card = card;
	}
}
