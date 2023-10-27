import { addProjectData, editProjectData } from "./storageHelper";
import { Card, HTMLElement } from "./card";

export default class Modal {
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

				let newDataStored = addProjectData(data, "projects");
				let parentDom;

				if (newDataStored.priority === true) {
					parentDom = document.getElementById("priority-list-wrapper");
				} else {
					parentDom = document.getElementById("project-list-wrapper");
				}

				new Card(newDataStored, parentDom, this);

				//** else you are editing a project: */
			} else {
				data.id = this.editData.id;
				let newDataStored = editProjectData(data, "projects");
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
		let tempDiv = new HTMLElement("div", "temp-to-do-div", "", this.toDoDiv);
		new HTMLElement("p", "temp-to-to-item", newToDo, tempDiv.dom);
		let deleteToDoBtn = new HTMLElement(
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
