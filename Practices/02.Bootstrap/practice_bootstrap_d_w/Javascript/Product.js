document.addEventListener("DOMContentLoaded", function () {
    const productTableBody = document.getElementById("product-table-body");
    const productForm = document.getElementById("product-form");
    const cancelButton = document.getElementById("cancel-button");

    let products = [
        {
            name: "Game 1",
            description: "Description of Game 1",
            price: 49.99,
            category: "PC"
        },
        {
            name: "Game 2",
            description: "Description of Game 2",
            price: 59.99,
            category: "PlayStation"
        },
        {
            name: "Game 3",
            description: "Description of Game 3",
            price: 39.99,
            category: "Xbox"
        },
    ]; // Array to store product data

    // Function to render product rows in the table
    function renderProducts() {
        productTableBody.innerHTML = "";
        products.forEach((product, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>$${product.price}</td>
                    <td>$${product.category}</td>
                    <td>
                        <button class="btn btn-primary edit-button" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-button" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            productTableBody.insertAdjacentHTML("beforeend", row);
        });
    }

    // Function to reset the form
    function resetForm() {
        productForm.reset();
        document.getElementById("product-id").value = "";
    }

    // Event listener for form submission
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productId = document.getElementById("product-id").value;
        const productName = document.getElementById("product-name").value;
        const productDescription = document.getElementById("product-description").value;
        const productPrice = parseFloat(document.getElementById("product-price").value);
        const productCategory = document.getElementById("product-category").value;

        if (productId) {
            // Update existing product
            products[productId].name = productName;
            products[productId].description = productDescription;
            products[productId].price = productPrice;
            products[productId].category = productCategory;
        } else {
            // Add new product
            products.push({
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory
            });
        }

        renderProducts();
        resetForm();
    });

    // Event listener for edit buttons
    productTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const index = event.target.getAttribute("data-index");
            const product = products[index];

            document.getElementById("product-id").value = index;
            document.getElementById("product-name").value = product.name;
            document.getElementById("product-description").value = product.description;
            document.getElementById("product-price").value = product.price;
            document.getElementById("product-category").value = product.category;
        }
    });

    // Event listener for delete buttons
    productTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            const index = event.target.getAttribute("data-index");
            products.splice(index, 1);
            renderProducts();
        }
    });

    // Event listener for cancel button
    cancelButton.addEventListener("click", function () {
        resetForm();
    });

    // Initial rendering of categories
    renderProducts();
});
