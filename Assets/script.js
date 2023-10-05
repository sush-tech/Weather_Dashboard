

var todoInput = document.querySelector("#recent-searches");
var todoForm = document.querySelector("#search-button");
var todoList = document.querySelector("#recent-searches-list");
// // var todoCountSpan = document.querySelector("#todo-count");

// var todos = [];

// // The following function renders items in a todo list as <li> elements
// function getRecentSearches() {
//   // Clear todoList element and update todoCountSpan
//   todoList.innerHTML = "";
//   todoCountSpan.textContent = todos.length;

//   // Render a new li for each todo
//   for (var i = 0; i < todos.length; i++) {
//     var todo = todos[i];

//     var li = document.createElement("li");
//     li.textContent = todo;
//     li.setAttribute("data-index", i);

//     var button = document.createElement("button");
//     button.textContent = "Complete ✔️";

//     li.appendChild(button);
//     todoList.appendChild(li);
//   }
// }

// // This function is being called below and will run when the page loads.
// function init() {
//   // Get stored todos from localStorage
//   var storedTodos = JSON.parse(localStorage.getItem("todos"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedTodos !== null) {
//     todos = storedTodos;
//   }

//   // This is a helper function that will render todos to the DOM
//   getRecentSearches()();
// }

// function addToRecentSearches() {
//   // Stringify and set key in localStorage to todos array
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// // Add submit event to form
// todoForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var todoText = todoInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (todoText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   todos.push(todoText);
  

//   // Store updated todos in localStorage, re-render the list
//   addToRecentSearches();
//   getRecentSearches();
// });

// // Add click event to todoList element
// todoList.addEventListener("click", function(event) {
//   var element = event.target;

//   // Checks if element is a button
//   if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     todos.splice(index, 1);

//     // Store updated todos in localStorage, re-render the list
//     addToRecentSearches();
//     getRecentSearches();
//   }
// });

// // Calls init to retrieve data and render it to the page on load
// init()




var cities =[];

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
      todos.push(city);
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

function addToRecentSearches() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("cities", JSON.stringify(city));
}

