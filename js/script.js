const countriesList = document.getElementById('countries-list');

    const lCountries= async () =>{
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));


        banderas(countries);
    } catch (error) {
        console.error("Error al cargar los países:", error);
    }
}

const banderas=(countries) =>{
    countriesList.innerHTML = '';
    countries.forEach(country => {
  
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" class="flag">
            <p>${country.name.common}</p>
        `;

        countryDiv.addEventListener('click', () => countryDetails(country));
        countriesList.appendChild(countryDiv);
    });
}
const countryDetails = (country) => {

    const divcountry = document.createElement('div');
    divcountry.classList.add('div');

    const divContent = document.createElement('div');
    divContent.classList.add('div-content');

    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = '×';

    
    const flagImg = document.createElement('img');
    flagImg.src = country.flags.svg;
    flagImg.alt = `Bandera de ${country.name.common}`;
    flagImg.classList.add('div-flag');

    
    const countryName = document.createElement('h2');
    countryName.textContent = country.name.common;

    
    const capitalInfo = document.createElement('p');

        if (country.capital) {
            
            capitalInfo.innerHTML = `<strong>Capital:</strong> ${country.capital[0]}`;
        } else {
            
            capitalInfo.innerHTML = `<strong>Capital:</strong> No disponible`;
        }

    const populationInfo = document.createElement('p');
    populationInfo.innerHTML = `<strong>Población:</strong> ${country.population.toLocaleString()}`;


    const drivingSideInfo = document.createElement('p');

    if (country.car && country.car.side) {

        drivingSideInfo.innerHTML = `<strong>Conduce por:</strong> ${country.car.side}`;
    } else {
    
        drivingSideInfo.innerHTML = `<strong>Conduce por:</strong> No disponible`;
    }


    divContent.appendChild(closeBtn);
    divContent.appendChild(flagImg);
    divContent.appendChild(countryName);
    divContent.appendChild(capitalInfo);
    divContent.appendChild(populationInfo);
    divContent.appendChild(drivingSideInfo);

    divcountry.appendChild(divContent);


    closeBtn.addEventListener('click', () => divcountry.remove());


    document.body.appendChild(divcountry);
};

document.addEventListener('DOMContentLoaded', lCountries);
