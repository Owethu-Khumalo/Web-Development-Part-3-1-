
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("menu-search");
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");
    const resultsMessage = document.getElementById("menu-results");

    const categories = document.querySelectorAll(".menu-category");

    // Save the original order of menu items
    const originalOrder = new Map();

    categories.forEach(function (category) {
        const menuContainer = category.querySelector(".menu-items");

        if (menuContainer) {
            originalOrder.set(
                menuContainer,
                Array.from(menuContainer.querySelectorAll(".menu-item"))
            );
        }
    });

    function updateMenu() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedSort = priceSort.value;

        let visibleCount = 0;

        categories.forEach(function (category) {

            let categoryName = "";

            if (category.classList.contains("breakfast-section")) {
                categoryName = "breakfast";
            } else if (category.classList.contains("lunch-section")) {
                categoryName = "lunch";
            } else if (category.classList.contains("drinks-section")) {
                categoryName = "drinks";
            } else if (category.classList.contains("desserts-section")) {
                categoryName = "desserts";
            }

            const menuContainer = category.querySelector(".menu-items");

            if (!menuContainer) {
                return;
            }

            const items = Array.from(
                menuContainer.querySelectorAll(".menu-item")
            );

            let categoryHasVisibleItems = false;

            items.forEach(function (item) {

                const heading = item.querySelector("h3");
                const description = item.querySelector("p");

                const itemName = heading
                    ? heading.textContent.toLowerCase()
                    : "";

                const itemDescription = description
                    ? description.textContent.toLowerCase()
                    : "";

                const matchesSearch =
                    itemName.includes(searchText) ||
                    itemDescription.includes(searchText);

                const matchesCategory =
                    selectedCategory === "all" ||
                    selectedCategory === categoryName;

                const shouldShow = matchesSearch && matchesCategory;

                item.style.display = shouldShow ? "" : "none";

                if (shouldShow) {
                    categoryHasVisibleItems = true;
                    visibleCount++;
                }
            });

            category.style.display =
                categoryHasVisibleItems ? "" : "none";

            // Restore original order when Default Order is selected
            if (selectedSort === "default") {

                originalOrder.get(menuContainer).forEach(function (item) {
                    menuContainer.appendChild(item);
                });

            } else {

                // Sort menu items using their displayed prices
                items.sort(function (a, b) {

                    const priceA = parseFloat(
                        a.querySelector(".menu-price").textContent.replace(/[^\d.]/g, "")
                    );

                    const priceB = parseFloat(
                        b.querySelector(".menu-price").textContent.replace(/[^\d.]/g, "")
                    );

                    return selectedSort === "low-high"
                        ? priceA - priceB
                        : priceB - priceA;
                });

                items.forEach(function (item) {
                    menuContainer.appendChild(item);
                });
            }
        });

        // Display the number of matching menu items
        resultsMessage.textContent =
            visibleCount + " menu item(s) found.";
    }

    // Search as the user types
    searchInput.addEventListener("input", updateMenu);

    // Filter when a category is selected
    categoryFilter.addEventListener("change", updateMenu);

    // Sort when a price option is selected
    priceSort.addEventListener("change", updateMenu);

    // Display all menu items when the page loads
    updateMenu();

    console.log("Breeze Cafe menu functionality loaded successfully.");

    // IMAGE LIGHTBOX FUNCTIONALITY

    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeLightbox = document.getElementById("close-lightbox");

    const menuImages = document.querySelectorAll(".menu-image");

    menuImages.forEach(function (image) {

        image.addEventListener("click", function () {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

        });

    });

    // Close using the close button
    closeLightbox.addEventListener("click", function () {
        lightbox.classList.remove("active");
        lightboxImage.src = "";
    });

    // Close when clicking the dark background
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            lightbox.classList.remove("active");
            lightboxImage.src = "";
        }

    });

    // Close using the Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            lightbox.classList.remove("active");
            lightboxImage.src = "";
        }

    });

    // SCROLL REVEAL ANIMATION

    const animatedSections = document.querySelectorAll(".menu-category");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        animatedSections.forEach(function (section) {
            section.classList.add("reveal");
            observer.observe(section);
        });

    }

});
