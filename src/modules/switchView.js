import Modal from "./modal";
import { Card } from "./card";
import ProjectExpanded from "./projectExpanded";

export default class View {
	constructor() {
		this.projListWrapper = document.getElementById("project-list-wrapper");
		this.priorityListWrapper = document.getElementById("priority-list-wrapper");

		this.list = [];
		this.cardIds = [];
		this.active = "all";
		this.modal = new Modal();
		this.expanded = new ProjectExpanded(this.modal);

		this.setAllView();
	}
	switchView(view) {
		if (view === "all") {
			this.setAllView();
		}
		if (view === "priority") {
			this.setPriorityView();
		}
	}
	setAllView() {
		let storage = JSON.parse(localStorage.getItem("projects"));
		let activeProjects = storage.active;
		if (activeProjects.length > 0) {
			activeProjects.forEach((project) => {
				if (project.priority === false) {
					new Card(project, this.projListWrapper, this.modal, this.expanded);
				} else if (project.priority === true) {
					new Card(
						project,
						this.priorityListWrapper,
						this.modal,
						this.expanded
					);
				}
			});
		}
	}
}
