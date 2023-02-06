import React, { useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ef6b9e510f8bccbbb9312f9dfe03f6df`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setWeatherData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          value={location}
          placeholder="Search Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()} °C</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.main ? (
              <p>{weatherData.weather[0].description}</p>
            ) : null}
          </div>
        </div>

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p>{weatherData.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p>Feel Like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
              <p>humidity</p>
            </div>
            <div className="wind">
              {weatherData.main ? (
                <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
