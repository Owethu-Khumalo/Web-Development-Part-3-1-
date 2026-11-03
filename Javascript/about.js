
document.addEventListener("DOMContentLoaded", function () {

    const accordionButtons = document.querySelectorAll(
        ".accordion-button"
    );

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const content = button.nextElementSibling;
            const icon = button.querySelector(".accordion-icon");

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            // Close all accordion sections
            accordionButtons.forEach(function (otherButton) {

                const otherContent = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector(
                    ".accordion-icon"
                );

                otherButton.setAttribute("aria-expanded", "false");
                otherContent.hidden = true;
                otherIcon.textContent = "+";

            });

            // Open the selected section if it was previously closed
            if (!isExpanded) {

                button.setAttribute("aria-expanded", "true");
                content.hidden = false;
                icon.textContent = "−";

            }

        });

    });

    console.log("About page accordion loaded successfully.");

});
