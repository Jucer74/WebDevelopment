document.addEventListener("DOMContentLoaded", function () {
    //const apiKey = ; // Replace with your Unsplash API access key, claramente. 
    //const randomButton = document.getElementById("get-random");
    const randomImages = document.getElementById("photosgrid");

    function getRandomImages(apiKey) {
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=8&orientation=squarish&query=engineer`;
        let randomImagesCount = randomImages.childElementCount;
        if (randomImagesCount === 8){return;}


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                //const imagesUrl = data;
                //console.log("urls!! ", imagesUrl);
                data.forEach(image => {            
                    const img = document.createElement("img");
                    img.src = image.urls.small;
                    randomImages.appendChild(img);
                });
                
            })
            .catch(error => {
                console.error("Error fetching images:", error);
            });
    }

    //randomButton.addEventListener("click", function () {
    //    getRandomImages(apiKey);
    //});
    getRandomImages(apiKey);
});
