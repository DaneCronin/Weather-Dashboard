
//API Key for OpenWeather
const APIKey = "202c298807f99a13122415d39ef0b143";

// Declare variables for city
var cityFormEl = document.querySelector("#search-form"); // Variable for the search city form element
var cityNameSearch = document.querySelector("#city-search"); //Variable for the searched city name
var cityName = document.querySelector("#city-name"); //Variable to display searched City's name in current weather element 
var currentWeatherEl = document.querySelector("#current-weather"); //Variable to hold current weather
var fiveDayEl = document.querySelector("#extended-forecast"); //Variable to hold the 5-day extended forecast
var cityHistory = [];  //Store cities in an array



// Create Click Event handler for search form
var formSubmitHandler= function (event) {
    event.preventDefault();


    var city = cityNameSearch.value.trim();
    
    if (city) {
        getCity(city);
        cityNameSearch.value = "";
    } else {
        alert("Please enter city name!");
    }
    console.log("city searched");
};


//Create function to get city name, date and time
var getCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
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

           // weather(data);
        })

}


// Create function to fetch data from OpenWeather API
var getWeatherInfo = function() {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + data.coord.lat + "&units=imperial&cnt=5&appid=" + APIKey;
    //make fetch request to get weather info 
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        })
   
};




// Display current city weather to site
var displayWeather = function(weather) {
    console.log("weather data");


    //check for returned weather data from api
    if (weather.length === 0) {
        currentWeatherEl.textContent = "No weather data found.";
        return;
    }

    //display temp

    //display wind speed

    //display humidity

    //display UV index


};


// Display 5-day Forecast of current city

// Store cities searched to localStorage and show as buttons beneath search

//Add event listener for button click on search
cityFormEl.addEventListener("submit", formSubmitHandler);