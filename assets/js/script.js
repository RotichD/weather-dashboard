const apiKey = "f97301447cbd41068af8623a398ba1fb";
var cityName = "";
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
var lat = "";
var lon = "";
var uvIndex = "";
var uvIndicator = document.getElementById("uv-color");
uvIndicator.className = "";

var tempOne = document.getElementById("temp1");
var tempTwo = document.getElementById("temp2");
var tempThree = document.getElementById("temp3");
var tempFour = document.getElementById("temp4");
var tempFive = document.getElementById("temp5");

var windOne = document.getElementById("wind1");
var windTwo = document.getElementById("wind2");
var windThree = document.getElementById("wind3");
var windFour = document.getElementById("wind4");
var windFive = document.getElementById("wind5");

var humidOne = document.getElementById("humid1");
var humidTwo = document.getElementById("humid2");
var humidThree = document.getElementById("humid3");
var humidFour = document.getElementById("humid4");
var humidFive = document.getElementById("humid5");




//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const displayFiveDay = function(location) {
            
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    
    fetch(fiveDayUrl).then(function(response) {
        response.json().then(function(fiveDay) {
            console.log("test");
            console.log(fiveDay);

            tempOne.innerHTML = "Temp: " + convertTemp(fiveDay.list[0].main.temp).toFixed(2) + " F°";
            tempTwo.innerHTML = "Temp: " + convertTemp(fiveDay.list[1].main.temp).toFixed(2) + " F°";
            tempThree.innerHTML = "Temp: " + convertTemp(fiveDay.list[2].main.temp).toFixed(2) + " F°";
            tempFour.innerHTML = "Temp: " + convertTemp(fiveDay.list[3].main.temp).toFixed(2) + " F°";
            tempFive.innerHTML = "Temp: " + convertTemp(fiveDay.list[4].main.temp).toFixed(2) + " F°";

            windOne.innerHTML = "Wind: " + convertWind(fiveDay.list[0].wind.speed).toFixed(2) + " mph";
            windTwo.innerHTML = "Wind: " + convertWind(fiveDay.list[1].wind.speed).toFixed(2) + " mph";
            windThree.innerHTML = "Wind: " + convertWind(fiveDay.list[2].wind.speed).toFixed(2) + " mph";
            windFour.innerHTML = "Wind: " + convertWind(fiveDay.list[3].wind.speed).toFixed(2) + " mph";
            windFive.innerHTML = "Wind: " + convertWind(fiveDay.list[4].wind.speed).toFixed(2) + " mph";
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
                    
                    if (uvIndex < 3) {
                        uvIndicator.className = "uv-min";
                    } else if (uvIndicator >= 3 && uvIndicator < 6) {
                        uvIndicator.className = "uv-mod"; 
                    } else if (uvIndicator >= 6 && uvIndicator < 8) {
                        uvIndicator.className = "uv-high";
                    } else if (uvIndicator >= 8 && uvIndicator < 11) {
                        uvIndicator.className = "uv-vhigh";
                    } else if (uvIndicator > 11) {
                        uvIndicator.className = "uv-ehigh";
                    }
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



