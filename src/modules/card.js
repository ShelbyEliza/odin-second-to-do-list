import { deleteProject } from "./storageHelper";

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
	removeFromClassList(className) {
		this.dom.classList.remove(className);
	}
	appendToParent(parentDom) {
		parentDom.appendChild(this.dom);
	}
}

class Card {
	constructor(proj, parentDom, modal, expanded) {
		this.id = proj.id;
		this.wrapper = new HTMLElement("div", "card-wrapper");
		this.wrapper.dom.id = proj.id;
		this.wrapper.dom.dataset.priority = proj.priority;
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
		this.priority = proj.priority;
		if (this.priority === true) {
			this.wrapper.addToClassList("priority");
		}
		this.toDoList = new HTMLElement("ul", "to-do-list", "", this.wrapper.dom);
		if (proj.toDos) {
			proj.toDos.forEach((toDo) => {
				new HTMLElement("li", "to-do-item", toDo, this.toDoList.dom);
			});
		}
		this.toDoList.dom.hidden = true;
		this.btnWrapper = new HTMLElement(
			"div",
			"card-btn-wrapper",
			"",
			this.wrapper.dom
		);
		this.deleteBtn = new HTMLElement(
			"button",
			"delete-btn",
			"Delete",
			this.btnWrapper.dom
		);
		this.editBtn = new HTMLElement(
			"button",
			"edit-btn",
			"Edit",
			this.btnWrapper.dom
		);
		this.expandBtn = new HTMLElement(
			"button",
			"expand-btn",
			"Expand",
			this.btnWrapper.dom
		);
		parentDom.appendChild(this.wrapper.dom);

		this.expandBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();
			let projectDialog = document.getElementById("dialog-expanded");

			projectDialog.showModal();
			expanded.expandProject(this.id, this);
		});

		this.deleteBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();

			deleteProject(this.id, "projects");
			this.wrapper.dom.remove();
		});

		this.editBtn.dom.addEventListener("click", (e) => {
			e.preventDefault();

			modal.openModal(proj, this);
			modal.turnOnEditMode(proj);
		});
	}
	getCard() {
		return this;
	}
	editCard(newDetails) {
		this.title.dom.textContent = newDetails.title;
		this.dueDate.dom.textContent = newDetails.dueDate;
		this.description.dom.textContent = newDetails.description;
		while (this.toDoList.dom.firstChild) {
			this.toDoList.dom.removeChild(this.toDoList.dom.lastChild);
		}
		newDetails.toDos.forEach((toDo) => {
			new HTMLElement("li", "to-to-item", toDo, this.toDoList.dom);
		});

		if (this.priority !== newDetails.priority) {
			this.priority = newDetails.priority;
			this.wrapper.dom.dataset.priority = newDetails.priority;
			if (this.priority === true) {
				this.wrapper.addToClassList("priority");
			} else {
				this.wrapper.removeFromClassList("priority");
			}
		}
		// let location = document.location
		document.location.reload();
	}
}

export { Card, HTMLElement };
