// BdayCalculator.js
document.addEventListener("DOMContentLoaded", function () {
    var today = new Date();
    var daysRemainingElements = document.querySelectorAll(".days-remaining-placeholder");

    daysRemainingElements.forEach(function (element) {
        var birthday = new Date(element.getAttribute("data-birthday"));
        birthday.setFullYear(today.getFullYear()); // Ajustar el año para este año
        if (birthday < today) {
            birthday.setFullYear(today.getFullYear() + 1); // Si ya pasó, ajustar al próximo año
        }

        var daysRemaining = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
        element.textContent = daysRemaining + " días restantes para el cumpleaños";


        
    });
});
