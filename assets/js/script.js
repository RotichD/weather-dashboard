const apiKey = "f97301447cbd41068af8623a398ba1fb";
var cityName = "Los Angeles";
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

 
const displayWeather = function() {

    // make a request to the url
 fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);

        var cityNameEl = document.getElementById("city-name");
        cityNameEl.innerHTML = data.name;

        var cityTempEl = document.getElementById("temperature");
        cityTempEl.innerHTML = "Temp: " + convertTemp(data.main.temp).toFixed(2);

    });
  });
}

displayWeather();

var convertTemp = function(k) {

    return (k - 273.15) * 9/5 + 32;
}


// everytime you search a city add city name to an array 

document.getElementById("search-btn").addEventListener("click", function() {
    var inputValue = document.getElementById("city-input");
    console.log(inputValue.value);

    cityName = inputValue.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    displayWeather();
})



