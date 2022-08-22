
//API Key for OpenWeather
const APIKey = "202c298807f99a13122415d39ef0b143";

// Declare variables for city

var cityFormEl = document.querySelector("#search-form"); // Variable for the search city form element
var cityNameSearch = document.querySelector("#city-search"); //Variable for the searched city name
var cityName = document.querySelector("#city-name"); //Variable to display searched City's name in current weather element 
var currentWeatherEl = document.querySelector("#current-weather"); //Variable to hold current weather
var fiveDayEl = document.querySelector("#extended-forecast"); //Variable to hold the 5-day extended forecast
var savedCityButtonsEl = document.querySelector("#savedCityBtn"); //Variables for button to hold searched-for cities
var historyCardEl = document.querySelector("history"); //Variable for container for searched city buttons
var cityHistory = [];  //Store cities in an array



// Create Click Event handler for search form
var formSubmitHandler= function (event) {
    event.preventDefault();


    var city = cityNameSearch.value.trim();

    
    if (city) {

        //Save searcehd city names into local storage and display in savedCityButtons
        // cityHistory.push(city);
        // localStorage.setItem("weatherSearch", JSON.stringify(cityHistory));
        // var searchHistoryEl = document.createElement('button');
        // searchHistoryEl.className = "btn";
        // searchHistoryEl.setAttribute("data-city", city)
        // searchHistoryEl.innerHTML = city;
        // savedCityButtonsEl.appendChild(searchHistoryEl);
        // historyCardEl.removeAttribute(style = "display: none");


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
            var weatherIcon = data.weather[0].icon;
            var weatherDescription = data.weather[0].description;
            weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />";


            cityName.innerHTML = data.name + " (" + (month +1) + "/" + day + "/" + year + ")" + weatherIconLink;

           getWeatherInfo(data);
            
          
        })




// Create function to fetch data from OpenWeather API
var getWeatherInfo = function (data) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + APIKey;
    //make fetch request to get weather info 
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            displayCurrentWeather(data);
        })
        
   
};

}


// Display current city weather to site
var displayCurrentWeather = function(weather) {
    console.log("weather data");

    //check for returned weather data from api
    if (weather.length === 0) {
        currentWeatherEl.textContent = "No weather data found.";
        return;
    }

    //clear old content?-
      
  

    //display temp
    var temperature = document.createElement('p');
    temperature.id = "temp";
    temperature.innerHTML = "Temp: " + weather.temp; 
    currentWeatherEl.appendChild(temperature);
   

    //display wind speed
    var windspeed = document.createElement('p');
    windspeed.id = "temp";
    windspeed.innerHTML = "Wind: "; 
    currentWeatherEl.appendChild(windspeed);
    
    //display humidity
    var humidity = document.createElement('p');
    humidity.id = "humidity";
    humidity.innerHTML = "Humidity: "; 
    currentWeatherEl.appendChild(humidity);

  
    //display UV index
    var UV = document.createElement('p');
    UV.id = "UV Index";
    UV.innerHTML = "UV Index: "; 
    currentWeatherEl.appendChild(UV);


};


// Display 5-day Forecast of current city
    // var extendedForecastArray = weather.daily;
    // // loop over weather data 
    // for (var i=0; i < extendedForecastArray; i++) {

    //     var date = (today.getMonth() + 1) + '/' + (today.getDate()) + '/' + today.getFullYear();
    //     var weatherIcon = extendedForecastArray[i].weather[0].icon;
    //     var weatherDescription = extendedForecastArray[i].weather[0].description;
    //     weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />";
    //     var dayEl = document.createElement("div");
    //     dayEl.className = "day";
    //     dayEl.innerHTML = "<p>" + date + "</p>" +
    //         "<p>" + weatherIconLink + "</p>" +
    //         "<p>Temp:" + extendedForecastArray[i].temp.day.toFixed(1) + "°F</p>" +
    //         "<p>Humidity: " + extendedForecastArray[i].humidity + "%</p>"

    //     fiveDayEl.appendChild(dayEl);
    // }

// load cities searched to localStorage and show as buttons beneath search

// var loadHistory = function () {
//     searchArray = JSON.parse(localStorage.getItem("weatherSearch"));

//     if (searchArray) {
//         cityHistory = JSON.parse(localStorage.getItem("weatherSearch"));
//         for (let i = 0; i < searchArray.length; i++) {
//             var searchHistoryEl = document.createElement('button');
//             searchHistoryEl.className = "btn";
//             searchHistoryEl.setAttribute("data-city", searchArray[i])
//             searchHistoryEl.innerHTML = searchArray[i];
//             historyButtonsEl.appendChild(searchHistoryEl);
//             historyCardEl.removeAttribute("style");
//         }

//     }
// }

// // Search weather using search history buttons
// var buttonClickHandler = function (event) {
//     var city = event.target.getAttribute("data-city");
//     if (city) {
//         getWeatherInfo(city);
//     }
// }

//Add event listener for button click on search
cityFormEl.addEventListener("submit", formSubmitHandler);

//Add event listener for click on searched-city buttons
//savedCityButtonsEl.addEventListener("click", buttonClickHandler);