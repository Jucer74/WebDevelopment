document.addEventListener("DOMContentLoaded", function () {
    const categoryTableBody = document.getElementById("category-table-body");
    const categoryForm = document.getElementById("category-form");
    const cancelButton = document.getElementById("cancel-button");

    let categories = [
        {
            name: "Category 1",
            description: "Description of Category 1",
            action: "Action 1"
        },
        {
            name: "Category 2",
            description: "Description of Category 2",
            action: "Action 2"
        },
        {
            name: "Category 3",
            description: "Description of Category 3",
            action: "Action 3"
        },
    ]; // Array to store category data

    // Function to render category rows in the table
    function renderCategories() {
        categoryTableBody.innerHTML = "";
        categories.forEach((category, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td>${category.action}</td>
                    <td>
                        <button class="btn btn-primary edit-button" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-button" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            categoryTableBody.insertAdjacentHTML("beforeend", row);
        });
    }

    // Function to reset the form
    function resetForm() {
        categoryForm.reset();
        document.getElementById("category-id").value = "";
    }

    // Event listener for form submission
    categoryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const categoryId = document.getElementById("category-id").value;
        const categoryName = document.getElementById("category-name").value;
        const categoryDescription = document.getElementById("category-description").value;
        const categoryAction = document.getElementById("category-action").value;

        if (categoryId) {
            // Update existing category
            categories[categoryId].name = categoryName;
            categories[categoryId].description = categoryDescription;
            categories[categoryId].action = categoryAction;
        } else {
            // Add new category
            categories.push({
                name: categoryName,
                description: categoryDescription,
                action: categoryAction
            });
        }

        renderCategories();
        resetForm();
    });

    // Event listener for edit buttons
    categoryTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const index = event.target.getAttribute("data-index");
            const category = categories[index];

            document.getElementById("category-id").value = index;
            document.getElementById("category-name").value = category.name;
            document.getElementById("category-description").value = category.description;
            document.getElementById("category-action").value = category.action;
        }
    });

    // Event listener for delete buttons
    categoryTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            const index = event.target.getAttribute("data-index");
            categories.splice(index, 1);
            renderCategories();
        }
    });

    // Event listener for cancel button
    cancelButton.addEventListener("click", function () {
        resetForm();
    });

    // Initial rendering of categories
    renderCategories();
});
