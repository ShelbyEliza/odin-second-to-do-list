import { HTMLElement } from "./card";
import { deleteProject } from "./storageHelper";

export default class ProjectExpanded {
	constructor(editModal) {
		this.projectDialog = document.getElementById("dialog-expanded");

		this.editDialog = document.getElementById("add-project-wrapper");
		this.editModal = editModal;

		const closeBtn = document.getElementById("close-proj-btn");
		const editBtn = document.getElementById("edit-proj-btn");
		const deleteBtn = document.getElementById("delete-proj-btn");

		this.title = document.querySelector(".title-ex");
		this.dueDate = document.querySelector(".due-date-ex");
		this.description = document.querySelector(".description-ex");
		this.toDoWrapper = document.querySelector(".to-do-list-ex");

		closeBtn.addEventListener("click", (e) => {
			e.preventDefault();

			this.clearDom();

			this.projectDialog.close();
		});

		deleteBtn.addEventListener("click", (e) => {
			e.preventDefault();

			deleteProject(this.id, "projects");

			this.clearDom();
			this.projectDialog.close();
			document.location.reload();
		});

		editBtn.addEventListener("click", (e) => {
			e.preventDefault();

			this.projectDialog.close();

			let project = this.getProject(this.id);
			this.editModal.openModal(project, this.card);
			this.editModal.turnOnEditMode(project);

			this.clearDom();
		});
		this.projectDialog.close();
	}
	clearDom() {
		this.title.textContent = "";
		this.dueDate.textContent = "";
		this.description.textContent = "";
		this.projectDialog.dataset.projectId = "";
		this.id = "";
		this.card = "";
		while (this.toDoWrapper.firstChild) {
			this.toDoWrapper.removeChild(this.toDoWrapper.lastChild);
		}
	}
	getProject(projId) {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;
		let project = activeProjects.find((proj) => proj.id === projId);
		return project;
	}
	expandProject(projId, card) {
		let project = this.getProject(projId);
		this.title.textContent = project.title;
		this.dueDate.textContent = project.dueDate;
		this.description.textContent = project.description;
		this.id = project.id;
		this.card = card;

		let classes = Array.from(this.projectDialog.classList);

		if (project.priority === true) {
			if (!classes.includes("priority")) {
				this.projectDialog.classList.add("priority");
			}
		} else {
			if (classes.includes("priority")) {
				this.projectDialog.classList.remove("priority");
			}
		}
		if (project.toDos.length > 0) {
			this.createToDoDom(project.toDos);
		}
	}

	createToDoDom(toDos) {
		toDos.forEach((toDo) => {
			new HTMLElement("li", "to-do-item", toDo, this.toDoWrapper);
		});
	}
}
