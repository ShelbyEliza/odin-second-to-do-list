import { Storage } from "./modules/storageHelper";
import View from "./modules/switchView";

class App {
	constructor() {
		this.projectStorage = new Storage("projects");
		this.view = new View();
	}
}
new App();
