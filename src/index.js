import { Storage } from "./modules/storageHelper";
import Modal from "./modules/modal";
import { Card, HTMLElement } from "./modules/card";
import { View } from "./modules/views";

class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		const allProjectsWrapper = new HTMLElement("div", "all-projects-wrapper");
		const priorityProjectsWrapper = new HTMLElement(
			"div",
			"priority-projects-wrapper"
		);
		const upComingProjectsWrapper = new HTMLElement(
			"div",
			"up-coming-projects-wrapper"
		);

		const priorityBtn = document.getElementById("priority-btn");
		priorityBtn.addEventListener("click", (e) => {
			e.preventDefault();
		});
		let projectStorage = new Storage("projects");

		let modal = new Modal();
		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new Card(project, projListWrapper, modal);
			});
		}
	}
}
const app = new App();
