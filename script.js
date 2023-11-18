var city = "";
document.querySelector(".container").style.display = "none";
document.querySelector(".first-search-container").style.display = "flex";


document.querySelector("#firstsearch").addEventListener("click", () => {
  document.querySelector(".place-holder").style.display = "none";
});
document.querySelector(".place-holder").addEventListener("click", () => {
  document.querySelector(".place-holder").style.display = "none";
});

function firstsearch() {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".first-search-container").style.display = "none";
  city = document.getElementById("firstsearch").value;
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;
      const location = data.results[0].name + ", " + data.results[0].country;
      // Call the second fetch here and pass the latitude and longitude variables
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&daily=temperature_2m_max,precipitation_probability_mean,weather_code,wind_speed_10m_max&timezone=auto"
      )
        .then((response) => response.json())
        .then((data) => {
          const temperatureMax = data.daily.temperature_2m_max;
          const precipitationProbability =
            data.daily.precipitation_probability_mean;
          const windSpeed = data.daily.wind_speed_10m_max;
          const weatherCode = data.daily.weather_code;
          const date = data.daily.time;
          const d = new Date(date[0]);
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          let day = weekday[d.getDay()];
          document.querySelector("#temp-0").textContent =
            temperatureMax[0] + "°C";
          document.querySelector("#temp-1").textContent =
            temperatureMax[1] + "°C";
          document.querySelector("#temp-2").textContent =
            temperatureMax[2] + "°C";
          document.querySelector("#temp-3").textContent =
            temperatureMax[3] + "°C";
          document.querySelector("#day-0").textContent = weekday[d.getDay()];
          document.querySelector("#day-1").textContent =
            weekday[(d.getDay() + 1) % 7];
          document.querySelector("#day-2").textContent =
            weekday[(d.getDay() + 2) % 7];
          document.querySelector("#day-3").textContent =
            weekday[(d.getDay() + 3) % 7];
          const dayname = document.querySelector(".date-dayname");
          const dateElement = document.querySelector(".date-day");
          document.querySelector(".location").textContent = location;
          dayname.textContent = day;
          dateElement.textContent = date[0];
          // Do something with the variables here
          const weatherTempElement = document.querySelector(".weather-temp");
          const preceptaionElement = document.querySelector(
            "#precipitation-value"
          );
          preceptaionElement.textContent = precipitationProbability[0] + "%";
          const WindElement = document.querySelector("#wind-value");
          WindElement.textContent = windSpeed[0] + "km/h";

          weatherTempElement.textContent = temperatureMax[0] + "°C";

          const weatherDescElement = document.querySelector(".weather-desc");
          const weatherIconElement = document.querySelector("#weather-icon");
          const day0icon = document.querySelector("#day-0-icon");
          const day1icon = document.querySelector("#day-1-icon");
          const day2icon = document.querySelector("#day-2-icon");
          const day3icon = document.querySelector("#day-3-icon");
          const day1container = document.querySelector("#day1container");
          const day2container = document.querySelector("#day2container");
          const day3container = document.querySelector("#day3container");
          if (weatherCode[0] == 1) {
            weatherDescElement.textContent = "Clear";
            weatherIconElement.classList.add("weather-icon", "sunny");
            day0icon.classList.add("weather-icon", "sunny-black");
          } else if (weatherCode[0] == 2) {
            weatherDescElement.textContent = "Partly Cloudy";
            weatherIconElement.classList.add("weather-icon", "partly-cloudy");
            day0icon.classList.add("weather-icon", "partly-cloudy-black");
          } else if (weatherCode[0] == 3) {
            weatherDescElement.textContent = "Cloudy";
            weatherIconElement.classList.add("weather-icon", "cloudy");
            day0icon.classList.add("weather-icon", "cloudy-black");
          } else if (weatherCode[0] == 45 || weatherCode[0] == 48) {
            weatherDescElement.textContent = "Fog";
            weatherIconElement.classList.add("weather-icon", "fog");
            day0icon.classList.add("weather-icon", "fog-black");
          } else if (
            weatherCode[0] == 51 ||
            weatherCode[0] == 53 ||
            weatherCode[0] == 55 ||
            weatherCode[0] == 56 ||
            weatherCode[0] == 57
          ) {
            weatherDescElement.textContent = "Drizzle";
            weatherIconElement.classList.add("weather-icon", "drizzle");
            day0icon.classList.add("weather-icon", "drizzle-black");
          } else if (
            weatherCode[0] == 61 ||
            weatherCode[0] == 63 ||
            weatherCode[0] == 65 ||
            weatherCode[0] == 66 ||
            weatherCode[0] == 67
          ) {
            weatherDescElement.textContent = "Rain";
            weatherIconElement.classList.add("weather-icon", "rain");
            day0icon.classList.add("weather-icon", "rain-black");
          } else if (
            weatherCode[0] == 71 ||
            weatherCode[0] == 73 ||
            weatherCode[0] == 75 ||
            weatherCode[0] == 77
          ) {
            weatherDescElement.textContent = "Snow";
            weatherIconElement.classList.add("weather-icon", "snow");
            day0icon.classList.add("weather-icon", "snow-black");
          } else if (
            weatherCode[0] == 80 ||
            weatherCode[0] == 81 ||
            weatherCode[0] == 82
          ) {
            weatherDescElement.textContent = "Rain";
            weatherIconElement.classList.add("weather-icon", "showers");
            day0icon.classList.add("weather-icon", "showers-black");
          } else if (weatherCode[0] == 85 || weatherCode[0] == 86) {
            weatherDescElement.textContent = "Snow Showers";
            weatherIconElement.classList.add("weather-icon", "snow");
            day0icon.classList.add("weather-icon", "snow-black");
          } else if (
            weatherCode[0] == 95 ||
            weatherCode[0] == 96 ||
            weatherCode[0] == 99
          ) {
            weatherDescElement.textContent = "Thunderstorm";
            weatherIconElement.classList.add("weather-icon", "thunderstorm");
            day0icon.classList.add("weather-icon", "thunderstorm-black");
          }
          if (weatherCode[1] ==1) {
            day1icon.classList.add("clear");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("clear");
              day1icon.classList.add("clear-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("clear-black");
              day1icon.classList.add("clear");
            });          }
          else if (weatherCode[1] == 2) {
            day1icon.classList.add("partly-cloudy");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("partly-cloudy");
              day1icon.classList.add("partly-cloudy-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("partly-cloudy-black");
              day1icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[1] == 3) {
              day1icon.classList.add("cloudy");
              day1container.addEventListener("mouseenter", function() {
                day1icon.classList.remove("cloudy");
                day1icon.classList.add("cloudy-black");
              });
              
              day1container.addEventListener("mouseleave", function() {
                day1icon.classList.remove("cloudy-black");
                day1icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[1] == 45 || weatherCode[1] == 48) {
                day1icon.classList.add("fog");
                day1container.addEventListener("mouseenter", function() {
                  day1icon.classList.remove("fog");
                  day1icon.classList.add("fog-black");
                });
                
                day1container.addEventListener("mouseleave", function() {
                  day1icon.classList.remove("fog-black");
                  day1icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[1] == 51 ||
            weatherCode[1] == 53 ||
            weatherCode[1] == 55 ||
            weatherCode[1] == 56 ||
            weatherCode[1] == 57
          ) {
            day1icon.classList.add("drizzle");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("drizzle");
              day1icon.classList.add("drizzle-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("drizzle-black");
              day1icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[1] == 61 ||
            weatherCode[1] == 63 ||
            weatherCode[1] == 65 ||
            weatherCode[1] == 66 ||
            weatherCode[1] == 67
          ) {
            day1icon.classList.add("rain");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("rain");
              day1icon.classList.add("rain-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("rain-black");
              day1icon.classList.add("rain");
            });          } else if (
            weatherCode[1] == 71 ||
            weatherCode[1] == 73 ||
            weatherCode[1] == 75 ||
            weatherCode[1] == 77
          ) {
            day1icon.classList.add("snow");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("snow");
              day1icon.classList.add("snow-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("snow-black");
              day1icon.classList.add("snow");
            });          } else if (
            weatherCode[1] == 80 ||
            weatherCode[1] == 81 ||
            weatherCode[1] == 82
          ) {
            day1icon.classList.add("showers");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("showers");
              day1icon.classList.add("showers-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("showers-black");
              day1icon.classList.add("showers");
            });          } 
            else if (weatherCode[1] == 85 || weatherCode[1] == 86) {
              day1icon.classList.add("snow");
              day1container.addEventListener("mouseenter", function() {
                day1icon.classList.remove("snow");
                day1icon.classList.add("snow-black");
              });
              
              day1container.addEventListener("mouseleave", function() {
                day1icon.classList.remove("snow-black");
                day1icon.classList.add("snow");
              });          } 
              else if (
            weatherCode[1] == 95 ||
            weatherCode[1] == 96 ||
            weatherCode[1] == 99
          ) {
            day1icon.classList.add("thunderstorm");
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("thunderstorm");
              day1icon.classList.add("thunderstorm-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("thunderstorm-black");
              day1icon.classList.add("thunderstorm");
            });          }
          if (weatherCode[2] ==1) {
            day2icon.classList.add("clear");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("clear");
              day2icon.classList.add("clear-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("clear-black");
              day2icon.classList.add("clear");
            });          }
          else if (weatherCode[2] == 2) {
            day2icon.classList.add("partly-cloudy");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("partly-cloudy");
              day2icon.classList.add("partly-cloudy-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("partly-cloudy-black");
              day2icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[2] == 3) {
              day2icon.classList.add("cloudy");

              day2container.addEventListener("mouseenter", function() {
                day2icon.classList.remove("cloudy");
                day2icon.classList.add("cloudy-black");
              });
              
              day2container.addEventListener("mouseleave", function() {
                day2icon.classList.remove("cloudy-black");
                day2icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[2] == 45 || weatherCode[2] == 48) {
                day2icon.classList.add("fog");

                day2container.addEventListener("mouseenter", function() {
                  day2icon.classList.remove("fog");
                  day2icon.classList.add("fog-black");
                });
                
                day2container.addEventListener("mouseleave", function() {
                  day2icon.classList.remove("fog-black");
                  day2icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[2] == 51 ||
            weatherCode[2] == 53 ||
            weatherCode[2] == 55 ||
            weatherCode[2] == 56 ||
            weatherCode[2] == 57
          ) {
            day2icon.classList.add("drizzle");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("drizzle");
              day2icon.classList.add("drizzle-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("drizzle-black");
              day2icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[2] == 61 ||
            weatherCode[2] == 63 ||
            weatherCode[2] == 65 ||
            weatherCode[2] == 66 ||
            weatherCode[2] == 67
          ) {
            day2icon.classList.add("rain");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("rain");
              day2icon.classList.add("rain-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("rain-black");
              day2icon.classList.add("rain");
            });          } else if (
            weatherCode[2] == 71 ||
            weatherCode[2] == 73 ||
            weatherCode[2] == 75 ||
            weatherCode[2] == 77
          ) {
            day2icon.classList.add("snow");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("snow");
              day2icon.classList.add("snow-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("snow-black");
              day2icon.classList.add("snow");
            });          } 
            else if (
            weatherCode[2] == 80 ||
            weatherCode[2] == 81 ||
            weatherCode[2] == 82
          ) {
            day2icon.classList.add("showers");
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("showers");
              day2icon.classList.add("showers-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("showers-black");
              day2icon.classList.add("showers");
            });          }
             else if (weatherCode[2] == 85 || weatherCode[2] == 86) {
              day2icon.classList.add("snow");

              day2container.addEventListener("mouseenter", function() {
                day2icon.classList.remove("snow");
                day2icon.classList.add("snow-black");
              });
              
              day2container.addEventListener("mouseleave", function() {
                day2icon.classList.remove("snow-black");
                day2icon.classList.add("snow");
              });          } else if (
            weatherCode[2] == 95 ||
            weatherCode[2] == 96 ||
            weatherCode[2] == 99
          ) {
            day2icon.classList.add("thunderstorm");

            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("thunderstorm");
              day2icon.classList.add("thunderstorm-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("thunderstorm-black");
              day2icon.classList.add("thunderstorm");
            });          }
          if (weatherCode[3] ==1) {
            day3icon.classList.add("clear");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("clear");
              day3icon.classList.add("clear-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("clear-black");
              day3icon.classList.add("clear");
            });          }
          else if (weatherCode[3] == 2) {
            day3icon.classList.add("partly-cloudy");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("partly-cloudy");
              day3icon.classList.add("partly-cloudy-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("partly-cloudy-black");
              day3icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[3] == 3) {
              day3icon.classList.add("cloudy");
              day3container.addEventListener("mouseenter", function() {
                day3icon.classList.remove("cloudy");
                day3icon.classList.add("cloudy-black");
              });
              
              day3container.addEventListener("mouseleave", function() {
                day3icon.classList.remove("cloudy-black");
                day3icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[3] == 45 || weatherCode[3] == 48) {
                day3icon.classList.add("fog");
                day3container.addEventListener("mouseenter", function() {
                  day3icon.classList.remove("fog");
                  day3icon.classList.add("fog-black");
                });
                
                day3container.addEventListener("mouseleave", function() {
                  day3icon.classList.remove("fog-black");
                  day3icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[3] == 53 ||
            weatherCode[3] == 53 ||
            weatherCode[3] == 55 ||
            weatherCode[3] == 56 ||
            weatherCode[3] == 57
          ) {
            day3icon.classList.add("drizzle");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("drizzle");
              day3icon.classList.add("drizzle-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("drizzle-black");
              day3icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[3] == 61 ||
            weatherCode[3] == 63 ||
            weatherCode[3] == 65 ||
            weatherCode[3] == 66 ||
            weatherCode[3] == 67
          ) {
            day3icon.classList.add("rain");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("rain");
              day3icon.classList.add("rain-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("rain-black");
              day3icon.classList.add("rain");
            });          } else if (
            weatherCode[3] == 71 ||
            weatherCode[3] == 73 ||
            weatherCode[3] == 75 ||
            weatherCode[3] == 77
          ) {
            day3icon.classList.add("snow");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("snow");
              day3icon.classList.add("snow-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("snow-black");
              day3icon.classList.add("snow");
            });          } else if (
            weatherCode[3] == 80 ||
            weatherCode[3] == 81 ||
            weatherCode[3] == 82
          ) {
            day3icon.classList.add("showers");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("showers");
              day3icon.classList.add("showers-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("showers-black");
              day3icon.classList.add("showers");
            });          } else if (weatherCode[0] == 85 || weatherCode[0] == 86) {
              day3icon.classList.add("snow");

              day3container.addEventListener("mouseenter", function() {
                day3icon.classList.remove("snow");
                day3icon.classList.add("snow-black");
              });
              
              day3container.addEventListener("mouseleave", function() {
                day3icon.classList.remove("snow-black");
                day3icon.classList.add("snow");
              });          } else if (
            weatherCode[3] == 95 ||
            weatherCode[3] == 96 ||
            weatherCode[3] == 99
          ) {
            day3icon.classList.add("thunderstorm");
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("thunderstorm");
              day3icon.classList.add("thunderstorm-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("thunderstorm-black");
              day3icon.classList.add("thunderstorm");
            });          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function search() {
  city = document.getElementById("search").value;
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;
      const location = data.results[0].name + ", " + data.results[0].country;
      // Call the second fetch here and pass the latitude and longitude variables
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&daily=temperature_2m_max,precipitation_probability_mean,weather_code,wind_speed_10m_max&timezone=auto"
      )
        .then((response) => response.json())
        .then((data) => {
          const temperatureMax = data.daily.temperature_2m_max;
          const precipitationProbability =
            data.daily.precipitation_probability_mean;
          const windSpeed = data.daily.wind_speed_10m_max;
          const weatherCode = data.daily.weather_code;
          const date = data.daily.time;
          const d = new Date(date[0]);
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          let day = weekday[d.getDay()];
          document.querySelector("#temp-0").textContent =
            temperatureMax[0] + "°C";
          document.querySelector("#temp-1").textContent =
            temperatureMax[1] + "°C";
          document.querySelector("#temp-2").textContent =
            temperatureMax[2] + "°C";
          document.querySelector("#temp-3").textContent =
            temperatureMax[3] + "°C";
          document.querySelector("#day-0").textContent = weekday[d.getDay()];
          document.querySelector("#day-1").textContent =
            weekday[(d.getDay() + 1) % 7];
          document.querySelector("#day-2").textContent =
            weekday[(d.getDay() + 2) % 7];
          document.querySelector("#day-3").textContent =
            weekday[(d.getDay() + 3) % 7];
          const dayname = document.querySelector(".date-dayname");
          const dateElement = document.querySelector(".date-day");
          document.querySelector(".location").textContent = location;
          dayname.textContent = day;
          dateElement.textContent = date[0];
          // Do something with the variables here
          const weatherTempElement = document.querySelector(".weather-temp");
          const preceptaionElement = document.querySelector(
            "#precipitation-value"
          );
          preceptaionElement.textContent = precipitationProbability[0] + "%";
          const WindElement = document.querySelector("#wind-value");
          WindElement.textContent = windSpeed[0] + "km/h";

          weatherTempElement.textContent = temperatureMax[0] + "°C";

          const weatherDescElement = document.querySelector(".weather-desc");
          const weatherIconElement = document.querySelector("#weather-icon");
          const day0icon = document.querySelector("#day-0-icon");
          const day1icon = document.querySelector("#day-1-icon");
          const day2icon = document.querySelector("#day-2-icon");
          const day3icon = document.querySelector("#day-3-icon");
          const day1container = document.querySelector("#day1container");
          const day2container = document.querySelector("#day2container");
          const day3container = document.querySelector("#day3container");
          if (weatherCode[0] == 1) {
            weatherDescElement.textContent = "Clear";
            weatherIconElement.classList.add("weather-icon", "sunny");
            day0icon.classList.add("weather-icon", "sunny-black");
          } else if (weatherCode[0] == 2) {
            weatherDescElement.textContent = "Partly Cloudy";
            weatherIconElement.classList.add("weather-icon", "partly-cloudy");
            day0icon.classList.add("weather-icon", "partly-cloudy-black");
          } else if (weatherCode[0] == 3) {
            weatherDescElement.textContent = "Cloudy";
            weatherIconElement.classList.add("weather-icon", "cloudy");
            day0icon.classList.add("weather-icon", "cloudy-black");
          } else if (weatherCode[0] == 45 || weatherCode[0] == 48) {
            weatherDescElement.textContent = "Fog";
            weatherIconElement.classList.add("weather-icon", "fog");
            day0icon.classList.add("weather-icon", "fog-black");
          } else if (
            weatherCode[0] == 51 ||
            weatherCode[0] == 53 ||
            weatherCode[0] == 55 ||
            weatherCode[0] == 56 ||
            weatherCode[0] == 57
          ) {
            weatherDescElement.textContent = "Drizzle";
            weatherIconElement.classList.add("weather-icon", "drizzle");
            day0icon.classList.add("weather-icon", "drizzle-black");
          } else if (
            weatherCode[0] == 61 ||
            weatherCode[0] == 63 ||
            weatherCode[0] == 65 ||
            weatherCode[0] == 66 ||
            weatherCode[0] == 67
          ) {
            weatherDescElement.textContent = "Rain";
            weatherIconElement.classList.add("weather-icon", "rain");
            day0icon.classList.add("weather-icon", "rain-black");
          } else if (
            weatherCode[0] == 71 ||
            weatherCode[0] == 73 ||
            weatherCode[0] == 75 ||
            weatherCode[0] == 77
          ) {
            weatherDescElement.textContent = "Snow";
            weatherIconElement.classList.add("weather-icon", "snow");
            day0icon.classList.add("weather-icon", "snow-black");
          } else if (
            weatherCode[0] == 80 ||
            weatherCode[0] == 81 ||
            weatherCode[0] == 82
          ) {
            weatherDescElement.textContent = "Rain";
            weatherIconElement.classList.add("weather-icon", "showers");
            day0icon.classList.add("weather-icon", "showers-black");
          } else if (weatherCode[0] == 85 || weatherCode[0] == 86) {
            weatherDescElement.textContent = "Snow Showers";
            weatherIconElement.classList.add("weather-icon", "snow");
            day0icon.classList.add("weather-icon", "snow-black");
          } else if (
            weatherCode[0] == 95 ||
            weatherCode[0] == 96 ||
            weatherCode[0] == 99
          ) {
            weatherDescElement.textContent = "Thunderstorm";
            weatherIconElement.classList.add("weather-icon", "thunderstorm");
            day0icon.classList.add("weather-icon", "thunderstorm-black");
          }
          if (weatherCode[1] ==1) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("clear");
              day1icon.classList.add("clear-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("clear-black");
              day1icon.classList.add("clear");
            });          }
          else if (weatherCode[1] == 2) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("partly-cloudy");
              day1icon.classList.add("partly-cloudy-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("partly-cloudy-black");
              day1icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[1] == 3) {
              day1container.addEventListener("mouseenter", function() {
                day1icon.classList.remove("cloudy");
                day1icon.classList.add("cloudy-black");
              });
              
              day1container.addEventListener("mouseleave", function() {
                day1icon.classList.remove("cloudy-black");
                day1icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[1] == 45 || weatherCode[1] == 48) {
                day1container.addEventListener("mouseenter", function() {
                  day1icon.classList.remove("fog");
                  day1icon.classList.add("fog-black");
                });
                
                day1container.addEventListener("mouseleave", function() {
                  day1icon.classList.remove("fog-black");
                  day1icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[1] == 51 ||
            weatherCode[1] == 53 ||
            weatherCode[1] == 55 ||
            weatherCode[1] == 56 ||
            weatherCode[1] == 57
          ) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("drizzle");
              day1icon.classList.add("drizzle-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("drizzle-black");
              day1icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[1] == 61 ||
            weatherCode[1] == 63 ||
            weatherCode[1] == 65 ||
            weatherCode[1] == 66 ||
            weatherCode[1] == 67
          ) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("rain");
              day1icon.classList.add("rain-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("rain-black");
              day1icon.classList.add("rain");
            });          } else if (
            weatherCode[1] == 71 ||
            weatherCode[1] == 73 ||
            weatherCode[1] == 75 ||
            weatherCode[1] == 77
          ) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("snow");
              day1icon.classList.add("snow-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("snow-black");
              day1icon.classList.add("snow");
            });          } else if (
            weatherCode[1] == 80 ||
            weatherCode[1] == 81 ||
            weatherCode[1] == 82
          ) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("showers");
              day1icon.classList.add("showers-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("showers-black");
              day1icon.classList.add("showers");
            });          } else if (weatherCode[1] == 85 || weatherCode[1] == 86) {
              day1container.addEventListener("mouseenter", function() {
                day1icon.classList.remove("snow");
                day1icon.classList.add("snow-black");
              });
              
              day1container.addEventListener("mouseleave", function() {
                day1icon.classList.remove("snow-black");
                day1icon.classList.add("snow");
              });          } else if (
            weatherCode[1] == 95 ||
            weatherCode[1] == 96 ||
            weatherCode[1] == 99
          ) {
            day1container.addEventListener("mouseenter", function() {
              day1icon.classList.remove("thunderstorm");
              day1icon.classList.add("thunderstorm-black");
            });
            
            day1container.addEventListener("mouseleave", function() {
              day1icon.classList.remove("thunderstorm-black");
              day1icon.classList.add("thunderstorm");
            });          }
          if (weatherCode[2] ==1) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("clear");
              day2icon.classList.add("clear-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("clear-black");
              day2icon.classList.add("clear");
            });          }
          else if (weatherCode[2] == 2) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("partly-cloudy");
              day2icon.classList.add("partly-cloudy-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("partly-cloudy-black");
              day2icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[2] == 3) {
              day2container.addEventListener("mouseenter", function() {
                day2icon.classList.remove("cloudy");
                day2icon.classList.add("cloudy-black");
              });
              
              day2container.addEventListener("mouseleave", function() {
                day2icon.classList.remove("cloudy-black");
                day2icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[2] == 45 || weatherCode[2] == 48) {
                day2container.addEventListener("mouseenter", function() {
                  day2icon.classList.remove("fog");
                  day2icon.classList.add("fog-black");
                });
                
                day2container.addEventListener("mouseleave", function() {
                  day2icon.classList.remove("fog-black");
                  day2icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[2] == 51 ||
            weatherCode[2] == 53 ||
            weatherCode[2] == 55 ||
            weatherCode[2] == 56 ||
            weatherCode[2] == 57
          ) {
            day1container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("drizzle");
              day2icon.classList.add("drizzle-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("drizzle-black");
              day2icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[2] == 61 ||
            weatherCode[2] == 63 ||
            weatherCode[2] == 65 ||
            weatherCode[2] == 66 ||
            weatherCode[2] == 67
          ) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("rain");
              day2icon.classList.add("rain-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("rain-black");
              day2icon.classList.add("rain");
            });          } else if (
            weatherCode[2] == 71 ||
            weatherCode[2] == 73 ||
            weatherCode[2] == 75 ||
            weatherCode[2] == 77
          ) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("snow");
              day2icon.classList.add("snow-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("snow-black");
              day2icon.classList.add("snow");
            });          } else if (
            weatherCode[2] == 80 ||
            weatherCode[2] == 81 ||
            weatherCode[2] == 82
          ) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("showers");
              day2icon.classList.add("showers-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("showers-black");
              day2icon.classList.add("showers");
            });          } else if (weatherCode[2] == 85 || weatherCode[2] == 86) {
              day2container.addEventListener("mouseenter", function() {
                day2icon.classList.remove("snow");
                day2icon.classList.add("snow-black");
              });
              
              day2container.addEventListener("mouseleave", function() {
                day2icon.classList.remove("snow-black");
                day2icon.classList.add("snow");
              });          } else if (
            weatherCode[2] == 95 ||
            weatherCode[2] == 96 ||
            weatherCode[2] == 99
          ) {
            day2container.addEventListener("mouseenter", function() {
              day2icon.classList.remove("thunderstorm");
              day2icon.classList.add("thunderstorm-black");
            });
            
            day2container.addEventListener("mouseleave", function() {
              day2icon.classList.remove("thunderstorm-black");
              day2icon.classList.add("thunderstorm");
            });          }
          if (weatherCode[3] ==1) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("clear");
              day3icon.classList.add("clear-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("clear-black");
              day3icon.classList.add("clear");
            });          }
          else if (weatherCode[3] == 2) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("partly-cloudy");
              day3icon.classList.add("partly-cloudy-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("partly-cloudy-black");
              day3icon.classList.add("partly-cloudy");
            });          }
             else if (weatherCode[3] == 3) {
              day3container.addEventListener("mouseenter", function() {
                day3icon.classList.remove("cloudy");
                day3icon.classList.add("cloudy-black");
              });
              
              day3container.addEventListener("mouseleave", function() {
                day3icon.classList.remove("cloudy-black");
                day3icon.classList.add("cloudy");
              });
              } 
              else if (weatherCode[3] == 45 || weatherCode[3] == 48) {
                day3container.addEventListener("mouseenter", function() {
                  day3icon.classList.remove("fog");
                  day3icon.classList.add("fog-black");
                });
                
                day3container.addEventListener("mouseleave", function() {
                  day3icon.classList.remove("fog-black");
                  day3icon.classList.add("fog");
                });
                }
                 else if (
            weatherCode[3] == 53 ||
            weatherCode[3] == 53 ||
            weatherCode[3] == 55 ||
            weatherCode[3] == 56 ||
            weatherCode[3] == 57
          ) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("drizzle");
              day3icon.classList.add("drizzle-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("drizzle-black");
              day3icon.classList.add("drizzle");
            });
              } 
              else if (
            weatherCode[3] == 61 ||
            weatherCode[3] == 63 ||
            weatherCode[3] == 65 ||
            weatherCode[3] == 66 ||
            weatherCode[3] == 67
          ) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("rain");
              day3icon.classList.add("rain-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("rain-black");
              day3icon.classList.add("rain");
            });          } else if (
            weatherCode[3] == 71 ||
            weatherCode[3] == 73 ||
            weatherCode[3] == 75 ||
            weatherCode[3] == 77
          ) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("snow");
              day3icon.classList.add("snow-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("snow-black");
              day3icon.classList.add("snow");
            });          } else if (
            weatherCode[3] == 80 ||
            weatherCode[3] == 81 ||
            weatherCode[3] == 82
          ) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("showers");
              day3icon.classList.add("showers-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("showers-black");
              day3icon.classList.add("showers");
            });          } else if (weatherCode[0] == 85 || weatherCode[0] == 86) {
              day3container.addEventListener("mouseenter", function() {
                day3icon.classList.remove("snow");
                day3icon.classList.add("snow-black");
              });
              
              day3container.addEventListener("mouseleave", function() {
                day3icon.classList.remove("snow-black");
                day3icon.classList.add("snow");
              });          } else if (
            weatherCode[3] == 95 ||
            weatherCode[3] == 96 ||
            weatherCode[3] == 99
          ) {
            day3container.addEventListener("mouseenter", function() {
              day3icon.classList.remove("thunderstorm");
              day3icon.classList.add("thunderstorm-black");
            });
            
            day3container.addEventListener("mouseleave", function() {
              day3icon.classList.remove("thunderstorm-black");
              day3icon.classList.add("thunderstorm");
            });          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
