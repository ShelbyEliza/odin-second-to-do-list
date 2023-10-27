import { format } from "date-fns";

function formatNewDate(date) {
	// data variable === "mm-yyyy-dd"
	// JS new Date() is required for date.fns
	// JS new Date() requires format === "yyyy/dd/mm"
	let dateArray = date.split("-");

	return new Date(dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]);
}

function formatDateView(date) {
	return format(new Date(formatNewDate(date)), "MMMM dd, yyyy");
}

export { formatDateView };
