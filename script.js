let city = document.querySelector('#cityInput');
let searchButton = document.querySelector('#searchButton');

let temp = document.querySelector('.temperature');
let cityName = document.querySelector('.city-name');
let weatherCondition = document.querySelector('.weather-condition');
let humidity = document.querySelector('#humidityValue');
let wind = document.querySelector('#windValue');
let pressure = document.querySelector('#pressureValue');


let apiKey = '70b6731c3ce3216bfd6745e3278f46a9';

async function getWeatherInformation(city) {

    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    let jsonResult = await result.json();
    setInformation(jsonResult);

}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15) + '°';
}

function updateWeatherIcon(iconCode) {

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    document.querySelector('.weather-icon').innerHTML = 
        `<img src="${iconUrl}" alt="weather icon" style="width: 80px; height: 80px;">`;
}

function setInformation(data) {
    console.log(data);

    weatherCondition.textContent = data["weather"][0]["description"];
    humidity.textContent = data["main"]["humidity"] + '%';
    wind.textContent = data["wind"]["speed"] + ' km/h';
    pressure.textContent = data["main"]["pressure"];
    cityName.textContent = data["sys"]["country"] + '-' + data["name"]
    temp.textContent = kelvinToCelsius(data["main"]["temp"]);
    updateWeatherIcon(data["weather"][0]["icon"]);
}

window.addEventListener('load', getWeatherInformation('tehran'));
searchButton.addEventListener('click', () => {
    getWeatherInformation(city.value);
    
});

