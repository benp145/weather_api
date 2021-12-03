let cityName = document.getElementById("cityName")
let submitCity = document.getElementById("submitCity")
let cardContainer = document.getElementById("cardContainer")
let errorMessage = document.getElementById("errorMessage")


submitCity.addEventListener('submit', function (event) {
    event.preventDefault()
    let city = document.getElementById("city").value
    cardContainer.innerHTML = ''
    cityName.innerHTML = ''
    errorMessage.innerHTML = ''
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f0ce9b3d15b2cf64f7eef5b554359b3&units=imperial`)
        .then((res) => res.json())
        .then((data) => {
            populateWeather(data)
        })
        .catch(() => displayError())
    })
    
 function populateWeather(data) {     
    console.log(data)
    cityName.innerText = `${data.name}, ${data.sys.country}`
     cardContainer.innerHTML = `
<div class="card" id="currentCard">
    <div class="card-header">Current Temperature</div>
    <div class="card-body">${data.main.temp}&#8457;</div>
</div>
<div class="card" id="highCard">
    <div class="card-header">High</div>
    <div class="card-body">${data.main.temp_max}&#8457;</div>
</div>
<div class="card" id="lowCard">
    <div class="card-header">Low</div>
    <div class="card-body">${data.main.temp_min}&#8457;</div>
</div>
<div class="card" id="forecastCard">
    <div class="card-header">Forecast</div>
    <div class="card-body">${data.weather[0].main}</div>
</div>
<div class="card" id="humidityCard">
    <div class="card-header">Humidity</div>
    <div class="card-body">${data.main.humidity}</div>
</div>
`
 }

function displayError() {
    errorMessage.innerText = "Unable to complete request. Make sure you have entered a valid city."
}