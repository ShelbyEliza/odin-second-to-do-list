const dialog = document.getElementById("add-project-wrapper");
const titleInput = document.getElementById("title");
const dueDateInput = document.getElementById("dueDate");
const descriptionInput = document.getElementById("description");
const editBtn = document.getElementById("edit-project-btn");
const submitBtn = document.getElementById("submit-project-btn");

function openEditModal(projectData) {
	dialog.showModal();
	switchModalMode("editing");

	titleInput.value = projectData.title;
	dueDateInput.value = projectData.dueDate;
	descriptionInput.value = projectData.description;
}

function switchModalMode(currentMode) {
	if (currentMode === "editing") {
		editBtn.hidden = false;
		submitBtn.hidden = true;
	} else if (currentMode === "not editing") {
		editBtn.hidden = true;
		submitBtn.hidden = false;
	} else {
		console.log("No known mode.");
	}
}

export { openEditModal };
