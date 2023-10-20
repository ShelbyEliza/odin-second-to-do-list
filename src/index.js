import { Storage } from "./modules/storageHelper";
import AddProject from "./modules/addProject";
import { Card } from "./modules/card";

class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
		let projectStorage = new Storage("projects");
		console.log(projectStorage);

		let addProjController = new AddProject(projectStorage, projListWrapper);
		if (projectStorage.projects.active.length > 0) {
			projectStorage.projects.active.forEach((project) => {
				new Card(project, projListWrapper);
			});
		}
	}
}
const app = new App();
