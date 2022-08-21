// Declare variables for city
var cityFormEl = document.querySelector("#search-form"); // Variable for the search city form element
var cityNameInput = document.querySelector("#city-search"); //Variable to hold the searched city name
var currentWeatherEl = document.querySelector("#current-weather"); //Variable to hold current weather
var fiveDayEl = document.querySelector("#extended-forecast"); //Variable to hold the 5-day extended forecast
var cities = [];  //Store cities in an array

//Create function to get city name, date and time
var getCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city.name + "&appid=202c298807f99a13122415d39ef0b143";
        fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
             
            var date = new Date(data.dt * 1000);
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();

            cityName.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ")";

            weather(data);
        })

}


// Create function to fetch data from OpenWeather API
var getWeatherInfo = function() {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + data.coord.lat + "&units=imperial&cnt=5&appid=202c298807f99a13122415d39ef0b143";
    //make fetch request to get weather info 
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        })
   
};

// Create Click Event handler for search form
var cityNameInput = function (event) {
    event.preventDefault();

    console.log("city searched");

    var city = search.value.trim().touppercase;
    
    if (city) {
        getCity(city);
        search.value = "";
    } else {
        alert("Please enter city name!");
    }
};



// Display current city weather to site

// Display 5-day Forecast of current city

// Store cities searched to localStorage and show as buttons beneath search

