const dialog = document.getElementById("add-project-wrapper");

export default function editProject(projectData) {
	const titleInput = document.getElementById("title");
	const dueDateInput = document.getElementById("dueDate");
	const descriptionInput = document.getElementById("description");
	const editBtn = document.getElementById("edit-project-btn");
	const submitBtn = document.getElementById("submit-project-btn");

	dialog.showModal();
	editBtn.hidden = false;
	submitBtn.hidden = true;

	titleInput.value = projectData.title;
	dueDateInput.value = projectData.dueDate;
	descriptionInput.value = projectData.description;

	// editBtn.hidden = true;
	// submitBtn.hidden = false;
}

export { editProject };
