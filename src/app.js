function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
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
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "30d51b8f5d573674a85c2b8f5f80916d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

