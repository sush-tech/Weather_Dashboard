$(document).ready(function() {
	// Event Click for Search Button
	$("#search-button").on("click", function(event) {
	  event.preventDefault();
	  var city = $("#city").val();
	  if (city == "") {
		return;
	  } else {
		getCityWeather(city);
		addToRecentSearches(city);
	  }
	});
});
  
	// Onclick listener to search list items
	$("#recent-searches-list").on("click", "li.list-group-item", function() {
	  var city = $(this).text();
	  getCityWeather(city);
	});
  
	// Hide Elements til item is searched
	$("#city-info").hide();
	$("#forecast").hide();
  
	// Load Recent Searches from Local Storage
	getRecentSearches();
  
	
	// City's Weather Info
	function getCityWeather(city) 
    {
	  $("#city-info").show();
  
	  var api_key = "e02862d1d15fb4af2c38820449913ff6";
	  var baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;
  
	  city = city;
	  var unit = "imperial";
	  var newURL = baseURL + "&q=" + city + "&units=" + unit;
  
	  $.ajax({
		url: newURL,
		method: "GET"
	  }).then(function(response) {
		// City Name
		$("#city-name").text(response.name);
  
		// Today's Date
		$("#date-today").text(`(${moment().format("l")})`);
  
		// Weather Icon
		$("#weather-icon").attr(
		  "src",
		  `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`
		);
  
		// Temperature in Fahrenheit
		$("#temperature").text(response.main.temp + " F");
  
		// Humidity Percentage
		$("#humidity").text(response.main.humidity + " %");
  
		// Wind Speed: MPH
		$("#wind-speed").text(response.wind.speed + " MPH");
  
		// Get UV Index
		var lon = response.coord.lon;
		var lat = response.coord.lat;
		getUVIndex(lon, lat);
  
		// 5 day forecast
		var id = response.id;
		getWeekForecast(id);
	  });
    }