import Modal from "./modal";
import ProjectExpanded from "./projectExpanded";
import { Card } from "./card";
import { sortByAlpha, sortByDue } from "./storageHelper";

const ascendingBtn = document.getElementById("ascending-btn");
const descendingBtn = document.getElementById("descending-btn");
const alphabeticalBtn = document.getElementById("alphabetical-btn");
const completedBtn = document.getElementById("completed-btn");
const projectListWrapper = document.getElementById("project-list-wrapper");
const priorityListWrapper = document.getElementById("priority-list-wrapper");
const completedFullWrapper = document.getElementById("completed-wrapper-full");

export default class View {
	constructor(storage) {
		this.currentView = "all";
		this.currentSort = "alpha";

		this.modal = new Modal();
		this.expanded = new ProjectExpanded(this.modal);

		ascendingBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "ascending") {
				sortByDue("ascending", this);
				this.setCurrentSort("ascending");
				this.switchView();
			}
		});
		descendingBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "descending") {
				sortByDue("descending", this.view);
				this.setCurrentSort("descending");
				this.switchView();
			}
		});
		alphabeticalBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "alpha") {
				sortByAlpha(this.view);
				this.setCurrentSort("alpha");
				this.switchView();
			}
		});
		completedBtn.addEventListener("click", (e) => {
			if (completedFullWrapper.hidden === true) {
				completedFullWrapper.hidden = false;
				completedBtn.classList.add("active-btn");
			} else {
				completedFullWrapper.hidden = true;
				completedBtn.classList.remove("active-btn");
			}
		});

		this.setAllView();
	}
	setCurrentSort(newSetting) {
		this.currentSort = newSetting;
	}
	switchView() {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;

		if (activeProjects.length > 0) {
			while (priorityListWrapper.firstChild) {
				priorityListWrapper.removeChild(priorityListWrapper.lastChild);
			}
			while (projectListWrapper.firstChild) {
				projectListWrapper.removeChild(projectListWrapper.lastChild);
			}

			activeProjects.forEach((project) => {
				if (project.priority === false) {
					new Card(project, projectListWrapper, this.modal, this.expanded);
				} else if (project.priority === true) {
					new Card(project, priorityListWrapper, this.modal, this.expanded);
				}
			});
		}
	}
	setAllView() {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;
		if (activeProjects.length > 0) {
			activeProjects.forEach((project) => {
				if (project.priority === false) {
					new Card(project, projectListWrapper, this.modal, this.expanded);
				} else if (project.priority === true) {
					new Card(project, priorityListWrapper, this.modal, this.expanded);
				}
			});
		}
	}
}
