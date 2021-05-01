const apiKey = "f97301447cbd41068af8623a398ba1fb";
var cityName = "Los Angeles";
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
var lat = "";
var lon = "";
var uvIndex = "";


//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const displayFiveDay = function(location) {
            
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    
    fetch(fiveDayUrl).then(function(response) {
        response.json().then(function(fiveDay) {
            console.log("test");
            console.log(fiveDay);
        })
    })
}


 
const displayWeather = function() {

    // make a request to the url
 fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      //console.log(data);

        var cityNameEl = document.getElementById("city-name");
        cityNameEl.innerHTML = data.name;

        var cityTempEl = document.getElementById("temperature");
        cityTempEl.innerHTML = "Temp: " + convertTemp(data.main.temp).toFixed(2);

        var cityWindEl = document.getElementById("wind");
        cityWindEl.innerHTML = "Wind: " + convertWind(data.wind.speed).toFixed(2);

        var cityHumidityEl = document.getElementById("humidity");
        cityHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

        const getUVIndex = function(location) {
            lat = data.coord.lat;
            lon = data.coord.lon;
            var indexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
            fetch(indexUrl).then(function(response) {
                response.json().then(function(data) {
                    
                    uvIndex = data.current.uvi;
                    //console.log(uvIndex);

                    var cityUVIndex = document.getElementById("uv-index");
                    cityUVIndex.innerHTML = "UV: " + uvIndex;

                    //var uvBackgroundColor = document.getElementById("uv-color");

                })  
            })
        }

        getUVIndex(cityName);

        
        displayFiveDay(cityName);

        

    });
  });
}

displayWeather();

var convertTemp = function(k) {

    return (k - 273.15) * 9/5 + 32;
}

var convertWind = function(mps) {
    return mps * 2.237;
}


// everytime you search a city add city name to an array 

document.getElementById("search-btn").addEventListener("click", function() {
    var inputValue = document.getElementById("city-input");
    console.log(inputValue.value);

    cityName = inputValue.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    displayWeather();
})



