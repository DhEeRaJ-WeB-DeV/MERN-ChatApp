export function extractTime(dateString) { //gets the data from createdAt

	const date = new Date(dateString);// Parse the date string into a Date object
    //The Date object provides methods to retrieve parts of the date, such as hours and minutes.

	const hours = padZero(date.getHours());//Gets the hour (0–23) from the Date object.

	const minutes = padZero(date.getMinutes());//Gets the minutes (0–59) from the Date object.

	return `${hours}:${minutes}`;// Format as HH:mm and return
}

// Helper function to pad single-digit numbers with a leading zero
//The padZero helper function ensures single-digit numbers are formatted with a leading zero (e.g., 9 becomes 09).
function padZero(number) {
	return number.toString().padStart(2, "0");
}//number.toString()=Converts the number to a string so padStart can be used.
//padStart(2, "0")=Ensures the string is at least two characters long.
//Adds a "0" at the beginning if the string is less than two characters.