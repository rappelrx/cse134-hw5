class WeatherWidget extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerHTML = `
        img {
          width: 30px;
        }
        p {
          display: inline-block;
          font-size: 200%;
          margin-left: 20px;
          line-height: 40px;
        }
      `;
    shadowRoot.appendChild(style);

    const titleElement = document.createElement("h1");
    titleElement.innerHTML = "Current Weather";
    shadowRoot.appendChild(titleElement);

    const displayElement = document.createElement("div");

    const weatherIconElement = document.createElement("img");
    weatherIconElement.alt = "icon of weather";
    displayElement.appendChild(weatherIconElement);

    const temperatureElement = document.createElement("p");
    temperatureElement.innerHTML = "";
    displayElement.appendChild(temperatureElement);

    shadowRoot.appendChild(displayElement);

    const latitude = "32.8801";
    const longitude = "-117.2340";

    fetch(`https://api.weather.gov/points/${latitude},${longitude}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((pointData) => {
        console.log(pointData);
        fetch(pointData.properties.forecast, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((forecastData) => {
            console.log(forecastData);
            const currentWeather = forecastData.properties.periods[0];
            const temperature = currentWeather.temperature;
            const temperatureUnit = currentWeather.temperatureUnit;
            const description = currentWeather.shortForecast;
            console.log(temperature);
            console.log(temperatureUnit);
            console.log(description);
            temperatureElement.innerHTML = `${temperature}&deg;${temperatureUnit}`;
            setWeatherIcon(description);
          })
          .catch((err) => {
            temperatureElement.innerHTML =
              "There exists some error while fetching data";
          });
      })
      .catch((err) => {
        temperatureElement.innerHTML =
          "There exists some error while fetching data";
      });

    function setWeatherIcon(weatherDescription) {
      if (weatherDescription.includes("Sunny")) {
        weatherIconElement.src = "icons/sunny.png";
      } else if (weatherDescription.includes("Partly Sunny")) {
        weatherIconElement.src = "icons/partly-sunny.png";
      } else if (weatherDescription.includes("Cloudy")) {
        weatherIconElement.src = "icons/cloudy.png";
      } else if (weatherDescription.includes("Partly Cloudy")) {
        weatherIconElement.src = "icons/partly-sunny.png";
      } else if (weatherDescription.includes("Rainy")) {
        weatherIconElement.src = "icons/rainy.png";
      } else if (weatherDescription.includes("Drizzle")) {
        weatherIconElement.src = "icons/rainy.png";
      } else if (weatherDescription.includes("Snowy")) {
        weatherIconElement.src = "icons/snowy.png";
      }
    }
  }
}

customElements.define("weather-widget", WeatherWidget);
