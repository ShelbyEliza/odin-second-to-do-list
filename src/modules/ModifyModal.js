import { myStorage } from "./Storage";
import { Card, HTMLElement } from "./Card";

const formElement = document.getElementById("modal-form");
const dialog = document.getElementById("add-project-wrapper");
const addToDoBtn = document.getElementById("add-to-do-btn");
const addProjBtn = document.getElementById("add-project-btn");
const cancelProjBtn = document.getElementById("cancel-project-btn");
const submitProjBtn = document.getElementById("submit-project-btn");

const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("dueDate-input");
const descriptionInput = document.getElementById("description-input");
const priorityInput = document.getElementById("priority-input");
const completedInput = document.getElementById("completed-input");
const toDoInput = document.getElementById("to-do-input");
const toDoDiv = document.getElementById("to-do-list-div");

export default class ModifyModal {
	constructor() {
		this.editMode = false;
		this.editData = "";
		this.editComplete = "";
		this.toDoData = [];
		this.sort = "alpha";

		addProjBtn.addEventListener("click", () => {
			dialog.showModal();
		});

		addToDoBtn.addEventListener("click", (e) => {
			/** if you cancel after adding to do, the to do dom will pop up the next time project is edited until reload  */
			e.preventDefault();
			if (!this.toDoData) {
				this.toDoData = [];
			}
			if (toDoInput.value !== "") {
				if (this.toDoData.includes(toDoInput.value)) {
					console.log("To do already exists.");
				} else {
					let newToDo = toDoInput.value;

					this.toDoData.push(newToDo);
					this.createToDoDom(newToDo);
				}
			}

			toDoInput.value = "";
			toDoInput.focus();
		});

		cancelProjBtn.addEventListener("click", (e) => {
			e.preventDefault();

			this.turnOffEditMode();
			this.clearForm();
		});

		submitProjBtn.addEventListener("click", (e) => {
			e.preventDefault();
			let data = {
				title: titleInput.value,
				dueDate: dueDateInput.value,
				description: descriptionInput.value,
				priority: priorityInput.checked,
				completed: completedInput.checked,
				toDos: this.toDoData,
			};
			/** Create Project: */
			if (this.editMode !== true) {
				data.id = this.createId(data.title);

				let newDataStored = myStorage.addProjectData(data, "active");
				let parentDom = this.setParentDom(
					newDataStored.completed,
					newDataStored.priority
				);
				console.log(parentDom);

				new Card(newDataStored, parentDom, this);

				//** Edit Project: */
			} else {
				data.id = this.editData.id;
				let newDataStored = myStorage.editProjectData(data, "active");
				this.card.editCard(newDataStored);
				this.turnOffEditMode();
			}

			this.clearForm();
		});
	}
	setParentDom(completedStatus, priorityStatus) {
		if (completedStatus === true) {
			return document.getElementById("completed-list-wrapper");
		} else {
			if (priorityStatus === true) {
				return document.getElementById("priority-list-wrapper");
			} else {
				return document.getElementById("project-list-wrapper");
			}
		}
	}
	createId(title) {
		let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
		return title[0] + title[2] + title[3] + "-" + randomNumb;
	}
	clearForm() {
		while (toDoDiv.firstChild) {
			toDoDiv.removeChild(toDoDiv.lastChild);
		}
		this.toDoData = [];
		formElement.reset();
		dialog.close();
	}
	turnOnEditMode(data) {
		console.log(data);
		this.editMode = true;
		this.editComplete = data.completed;
		this.editData = data;
	}
	turnOffEditMode() {
		this.editMode = false;
		this.editData = "";
		this.editComplete = "";
	}
	openModal(projectData, card) {
		dialog.showModal();
		titleInput.value = projectData.title;

		dueDateInput.value = projectData.dueDate;
		descriptionInput.value = projectData.description;
		priorityInput.checked = projectData.priority;
		if (projectData.completed) {
			completedInput.checked = projectData.completed;
		} else {
			completedInput.checked = false;
		}

		this.toDoData = projectData.toDos;
		if (this.toDoData && this.toDoData.length > 0) {
			this.toDoData.forEach((toDo) => {
				this.createToDoDom(toDo);
			});
		}
		this.card = card;
	}

	createToDoDom(newToDo) {
		let tempDiv = new HTMLElement("div", "temp-to-do-div", "", toDoDiv);
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
