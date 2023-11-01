import ModifyModal from "./ModifyModal";
import Expanded from "./Expanded";
import { Card } from "./Card";
import { myStorage } from "./Storage";

const ascendingBtn = document.getElementById("ascending-btn");
const descendingBtn = document.getElementById("descending-btn");
const alphabeticalBtn = document.getElementById("alphabetical-btn");
const completedBtn = document.getElementById("completed-btn");
const projectListWrapper = document.getElementById("project-list-wrapper");
const priorityListWrapper = document.getElementById("priority-list-wrapper");
const completedListWrapper = document.getElementById("completed-list-wrapper");
const completedFullWrapper = document.getElementById("completed-wrapper-full");

export default class View {
	constructor() {
		this.currentSort = "alpha";

		this.modal = new ModifyModal();
		this.expanded = new Expanded(this.modal);

		ascendingBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "ascending") {
				this.switchActiveBtn();

				myStorage.sortByDue("ascending");
				ascendingBtn.classList.add("active-btn");
				this.setCurrentSort("ascending");
				this.switchView();
			}
		});
		descendingBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "descending") {
				this.switchActiveBtn();

				myStorage.sortByDue("descending");
				descendingBtn.classList.add("active-btn");
				this.setCurrentSort("descending");
				this.switchView();
			}
		});
		alphabeticalBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (this.currentSort !== "alpha") {
				this.switchActiveBtn();

				myStorage.sortByAlpha();
				alphabeticalBtn.classList.add("active-btn");
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
	switchActiveBtn() {
		switch (this.currentSort) {
			case "alpha":
				alphabeticalBtn.classList.remove("active-btn");
				break;
			case "ascending":
				ascendingBtn.classList.remove("active-btn");
				break;
			case "descending":
				descendingBtn.classList.remove("active-btn");
				break;
			default:
				console.log("No switch.");
				break;
		}
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
			while (completedListWrapper.firstChild) {
				completedListWrapper.removeChild(completedListWrapper.lastChild);
			}

			activeProjects.forEach((project) => {
				if (project.completed === false || !project.completed) {
					console.log(project);
					if (project.priority === false) {
						new Card(project, projectListWrapper, this.modal, this.expanded);
					} else if (project.priority === true) {
						new Card(project, priorityListWrapper, this.modal, this.expanded);
					}
				} else {
					let newCard = new Card(
						project,
						completedListWrapper,
						this.modal,
						this.expanded
					);

					newCard.wrapper.addToClassList("completed");
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
