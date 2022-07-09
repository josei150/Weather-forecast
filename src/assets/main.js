const API = 'https://community-open-weather-map.p.rapidapi.com/forecast';

//const imagenes = `https://openweathermap.org/img/wn/${num}d@2x.png`

const content = null || document.getElementById("content");
const city = null || document.getElementById("city");
const button = null || document.getElementById("find-city");
const inputCity = null || document.getElementById("text-city");


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1594ff2db9msh08eca4903109c50p190764jsnedb7dade11d1',
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
	}
};

const fetchData = async function (urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data
};

button.addEventListener("click", (even) => {
    nameCity = inputCity.value;
    weather(API, nameCity);

});


const weather = async function (urlApi, nameCity="bogota"){

    try{

        cities = await fetchData(`${urlApi}?q=${nameCity}`);
        console.log(cities);

        let pronostic = cities.list.map(city => {
            return `
                <div class="group relative">
                    <div class="w-full bg-gray-500 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png" alt="" class="w-medium pl-24">
                        <span aria-hidden="true" class="text-gray-100 absolute font-semibold inset-0">${city.weather[0].description}</span>
                        
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-300">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            <span class="font-semibold">Temperature:</span> ${city.main.temp}° <br>
                            <span class="font-semibold">Feels like:</span> ${city.main.feels_like}° <br>
                            <span class="font-semibold">Humidity:</span> ${city.main.humidity} <br>
                            <span class="font-semibold">Date:</span> ${city.dt_txt}
                        </h3>
                    </div>
                </div>
            `
        }).join("");
        city.innerHTML = cities.city.name + " (" + cities.city.country + ")";
        content.innerHTML = pronostic;
    }catch(e){
        weather(API)
    }
};

weather(API)
