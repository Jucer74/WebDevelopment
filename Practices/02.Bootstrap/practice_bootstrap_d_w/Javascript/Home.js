document.addEventListener("DOMContentLoaded", function () {
    const dynamicContainer = document.getElementById("dynamic-container");

    function loadContent(path) {
        const iframeContainer = document.createElement("div");
        iframeContainer.id = "iframe-container";
        const iframe = document.createElement("iframe");
        iframe.src = path;
        iframeContainer.appendChild(iframe);
        dynamicContainer.innerHTML = ""; // Clear previous content
        dynamicContainer.appendChild(iframeContainer);
    }

    // Load Carousel as default content
    loadContent("../../../../src/pages/components/Carousel/Carousel.html");

    // Add event listener for clicking on "PricatApp" title
    const pricatAppTitle = document.getElementById("title-navbar");
    pricatAppTitle.addEventListener("click", () => {
        loadContent("../../../../src/pages/components/Carousel/Carousel.html");
    });

    // Category events 
    const categoryLinks = document.querySelectorAll(".dropdown-menu a.dropdown-item");
    categoryLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const categoryName = link.textContent.trim();
            const categoryContent = getCategoryContent(categoryName);
            loadContent(categoryContent);
        });
    });

    // Get category last click
    function getCategoryContent(categoryName) {
        const contentMap = {
            Games: "../../../../src/pages/components/Category/Games.html",
            Plays: "../../../../src/pages/components/Category/Play.html",
            Xbox: "../../../../src/pages/components/Category/Xbox.html",
            PC: "../../../../src/pages/components/Category/Pc.html",
            Categories: "../../../../src/pages/components/Category/Category.html"
        };
        return contentMap[categoryName] || "";
    }

    // Products events
    // Add event listener for clicking on "Products" title
    const productsTitle = document.getElementById("products");
    productsTitle.addEventListener("click", () => {
        loadContent("../../../../src/pages/components/Product/Product.html");
    });
});
