import { Storage } from "./modules/storageHelper";
import Modal from "./modules/modal";
import { Card } from "./modules/card";

class App {
	constructor() {
		const projListWrapper = document.querySelector(".project-list-wrapper");
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
