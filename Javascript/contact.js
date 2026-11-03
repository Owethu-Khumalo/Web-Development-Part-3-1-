
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        console.error("Contact form was not found.");
        return;
    }

    // Create the feedback message
    const feedbackMessage = document.createElement("div");

    feedbackMessage.id = "contact-feedback";
    feedbackMessage.setAttribute("role", "status");
    feedbackMessage.setAttribute("aria-live", "polite");

    feedbackMessage.style.display = "none";
    feedbackMessage.style.padding = "15px";
    feedbackMessage.style.marginBottom = "20px";
    feedbackMessage.style.borderRadius = "6px";

    contactForm.prepend(feedbackMessage);

    // Display success or error messages
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
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {

            showMessage(
                "Please complete all required fields correctly.",
                "error"
            );

            contactForm.reportValidity();
            return;
        }

        // Clear the form first
        contactForm.reset();

        // Display the success message after resetting
        showMessage(
            "Thank you for contacting Breeze Cafe! Your message has been checked successfully.",
            "success"
        );
    });

    // Clear feedback when the user manually resets the form
    contactForm.addEventListener("reset", function () {
        feedbackMessage.textContent = "";
        feedbackMessage.style.display = "none";
    });

    console.log("Contact form JavaScript loaded successfully.");

});
// Initialise Breeze Cafe Map
const mapElement = document.getElementById("map");

if (mapElement) {

    // Coordinates for Estcourt town centre
    const latitude = -29.010768;
    const longitude = 29.877105;

    const map = L.map("map").setView(
        [latitude, longitude],
        15
    );

    // Load OpenStreetMap tiles
    L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri"
    }
).addTo(map);

    // Add location marker
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("<b>Breeze Cafe</b><br>Estcourt, KwaZulu-Natal")
        .openPopup();
}
