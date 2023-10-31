import { deleteProject } from "./storageHelper";
import { formatDateView } from "./formatDate";

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
		this.title = new HTMLElement("h3", "title", proj.title, this.wrapper.dom);
		let dateView = formatDateView(proj.dueDate);
		this.dueDate = new HTMLElement("p", "due-date", dateView, this.wrapper.dom);
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
		this.completed = proj.completed;
		if (this.completed === true) {
			this.wrapper.addToClassList("completed");
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

	replaceToDos(toDos) {
		while (this.toDoList.dom.firstChild) {
			this.toDoList.dom.removeChild(this.toDoList.dom.lastChild);
		}
		toDos.forEach((toDo) => {
			new HTMLElement("li", "to-to-item", toDo, this.toDoList.dom);
		});
	}
	toggleProperty(newData, prop) {
		if (this[prop] !== newData) {
			this[prop] = newData;
			if (this[prop] === true) {
				this.wrapper.addToClassList(prop);
			} else {
				this.wrapper.removeFromClassList(prop);
			}
		}
	}

	editCard(newDetails) {
		this.title.dom.textContent = newDetails.title;
		this.dueDate.dom.textContent = newDetails.dueDate;
		this.description.dom.textContent = newDetails.description;

		this.toggleProperty(newDetails.priority, "priority");
		this.toggleProperty(newDetails.completed, "completed");
		this.replaceToDos(newDetails.toDos);

		document.location.reload();
	}
}

export { Card, HTMLElement };
