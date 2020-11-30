function formatDate(timestamp) {
	let date = new Date(timestamp);
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return `${day} ${formatHours(timestamp)}`
}

function formatHours(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	return `${hours}:${minutes}`;
}

function displayTemperature(response) {
	celsiusTemperature = response.data.main.temp;

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	let dateElement = document.querySelector("#date");
	dateElement.innerHTML = formatDate(response.data.dt * 1000)
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = response.data.name;
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



function displayForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = null;
	let forecast = null;
	
	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastElement.innerHTML +=  `
		<div class="col-2">
			<h3>
			${formatHours(forecast.dt * 1000)}
			</h3>
			<img
			src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
			/>
			<div class="weather-forecast-temperature">
				<strong>
					${Math.round(forecast.main.temp_max)}°
				</strong> 
				${Math.round(forecast.main.temp_min)}°
			</div>
		</div>`;	
	}	
}

function search(city) {
	let apiKey = "30d51b8f5d573674a85c2b8f5f80916d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);

	apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
	console.log(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	//remove the active class from the celsius link
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active")
	let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null; //has nothing in it

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active")
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature);