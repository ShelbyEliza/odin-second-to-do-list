import { Storage } from "./modules/storageHelper";
import AddProject from "./modules/addProject";
import { Card } from "./modules/card";

class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		let projectStorage = new Storage("projects");

		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new Card(project, projListWrapper);
			});
		}
		new AddProject();
	}
}
const app = new App();
