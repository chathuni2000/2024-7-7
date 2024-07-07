document.addEventListener("DOMContentLoaded", () => {
    fetchAllCountries();
});

let row = document.getElementById("card-row");

function fetchAllCountries() {
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            row.innerHTML = '';  // Clear previous content
            data.forEach((element) => {
                row.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card card-country">
                        <img src="${element.flags.png}" class="card-img-top" alt="flag">
                        <div class="card-body">
                            <h5 class="card-title">${element.name.common}</h5>
                            <p class="card-text"><strong>Official Name:</strong> ${element.name.official}</p>
                            <p class="card-text"><strong>Region:</strong> ${element.region}</p>
                            <p class="card-text"><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                            <a href="${element.maps.googleMaps}" class="btn btn-primary" target="_blank">Go to Map</a>
                        </div>
                    </div>
                </div>`;
            });
        })
        .catch((error) => console.error("Error fetching all countries:", error));
}

function searchCountry() {
    let userInput = document.getElementById("txtInput").value;

    let flagImg = document.getElementById("flagImg");
    let name = document.getElementById("name");
    let officialName = document.getElementById("officialName");
    let region = document.getElementById("region");
    let population = document.getElementById("population");

    fetch(`https://restcountries.com/v3.1/name/${userInput}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {
                let obj = data[0];
                flagImg.src = obj.flags.png;
                name.innerText = obj.name.common;
                officialName.innerText = obj.name.official;
                region.innerText = obj.region;
                population.innerText = obj.population.toLocaleString();
            } else {
                alert("Country not found!");
            }
        })
        .catch((error) => console.error("Error searching country:", error));
}
