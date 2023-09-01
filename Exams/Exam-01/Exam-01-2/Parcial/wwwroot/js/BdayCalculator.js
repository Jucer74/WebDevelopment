document.addEventListener("DOMContentLoaded", function () {
    var today = new Date();
    var daysRemainingElements = document.querySelectorAll(".days-remaining-placeholder");

    daysRemainingElements.forEach(function (element) {
        var birthdayString = element.getAttribute("data-birthday"); // Obtener la fecha de cumpleaños en formato de cadena
        var birthday = new Date(birthdayString);
        birthday.setFullYear(today.getFullYear()); // Ajustar el año para este año

        if (birthday < today) {
            // Si ya pasó, ajustar al próximo año
            birthday.setFullYear(today.getFullYear() + 1);
        }

        var daysRemaining = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
        element.textContent = daysRemaining + " días restantes para el cumpleaños";
    });
});