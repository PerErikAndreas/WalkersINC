"use strict";

window.onload = init;

function init() {
    loadBreeds();

    // Start-meddelande
    document.getElementById("dog-images").innerHTML = "<p>Välj en hundras här ovan!</p>";
}

function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            let breeds = Object.keys(data.message);
            showBreeds(breeds);
        })
        .catch(error => console.log(error));
}

function showBreeds(breeds) {
    let breedListEL = document.getElementById("breed-list");
    for(let i=0; i<breeds.length; i++) {
        let newEl = document.createElement("option");
        let newOtionText = document.createTextNode(breeds[i]);
        newEl.appendChild(newOtionText);

        // Lägg till i DOM
        breedListEL.appendChild(newEl);
    }

    // Add event listener when list is loaded to DOM
    breedListEL.addEventListener("change", function() {
        loadDogImage(breedListEL.value);
    });
}

function loadDogImage(breed) {
    console.log(breed);
    let url = "https://dog.ceo/api/breed/" + breed + "/images/random";

    fetch(url) 
        .then(response => response.json())
        .then(data => {
            showDogImage(data.message, breed);
        })
        .catch(error => console.log(error));
}

function showDogImage(image, breed) {
    let dogImagesEl =  document.getElementById("dog-images");
    dogImagesEl.innerHTML = "<img src='" + image + "' alt='" + breed + "'>";
}