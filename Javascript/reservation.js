
document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.querySelector(".reservation-form");
    const dateInput = document.getElementById("date");
    const guestsInput = document.getElementById("guests");

    // Stop if the form cannot be found
    if (!reservationForm) {
        console.error("Reservation form was not found.");
        return;
    }

    // Create a message area above the form
    const feedbackMessage = document.createElement("div");
    feedbackMessage.id = "form-feedback";
    feedbackMessage.setAttribute("role", "status");
    feedbackMessage.setAttribute("aria-live", "polite");

    feedbackMessage.style.display = "none";
    feedbackMessage.style.padding = "15px";
    feedbackMessage.style.marginBottom = "20px";
    feedbackMessage.style.borderRadius = "6px";
    feedbackMessage.style.fontWeight = "bold";

    reservationForm.prepend(feedbackMessage);

    console.log("Reservation JavaScript loaded successfully.");

    // Set today's date as the earliest allowed date
    function setMinimumDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

    setMinimumDate();

    // Display a message on the page
    function showMessage(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.style.display = "block";

        if (type === "success") {
            feedbackMessage.style.color = "#155724";
            feedbackMessage.style.backgroundColor = "#d4edda";
            feedbackMessage.style.border = "1px solid #c3e6cb";
        } else {
            feedbackMessage.style.color = "#721c24";
            feedbackMessage.style.backgroundColor = "#f8d7da";
            feedbackMessage.style.border = "1px solid #f5c6cb";
        }

        feedbackMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    // Handle form submission
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Reservation form submission handled.");

        // Check required fields and email format
        if (!reservationForm.checkValidity()) {
            showMessage(
                "Please complete all required fields with valid information.",
                "error"
            );

            reservationForm.reportValidity();
            return;
        }

        // Check the selected date
        if (dateInput.value < dateInput.min) {
            showMessage(
                "Please select today or a future reservation date.",
                "error"
            );
            dateInput.focus();
            return;
        }

        // Check number of guests
        if (Number(guestsInput.value) < 1) {
            showMessage(
                "Please enter at least one guest.",
                "error"
            );
            guestsInput.focus();
            return;
        }

        // Show confirmation without clearing the form
        showMessage(
            "Reservation request checked successfully! Please contact Breeze Cafe to confirm your booking.",
            "success"
        );
    });

    // Clear the message when the Clear Form button is clicked
    reservationForm.addEventListener("reset", function () {
        feedbackMessage.textContent = "";
        feedbackMessage.style.display = "none";
    });
});
