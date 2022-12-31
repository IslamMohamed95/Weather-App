import React, { useEffect, useState } from "react";
import axios from "axios";

import clearSky from "./assets/clear-sky.png";
import Sunny from "./assets/Sunny.png";
import Mist from "./assets/Mist.png";
function App() {
  var [width, setWidth] = useState(null);
  var [main, setMain] = useState(null);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=d56a7dfa66a1de42dc52dceb129d8ab8`;

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      " December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const result = await axios.get(api);
      setWeather(result.data);
      setQuery("");
      console.log(result.data.weather[0].main);
      if (result.data.weather[0].main === "Clear") {
        setMain(<img id="clear" src={Sunny} alt={Sunny} />);
      } else if (result.data.weather[0].main === "Clouds") {
        setMain(<img id="cloud" src={clearSky} alt={clearSky} />);
      } else if (result.data.weather[0].main === "Mist") {
        setMain(<img id="mist" src={Mist} alt={clearSky} />);
      }
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].main === "Clear"
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <div id="Default">
        <nav>
          <h1>LoOma</h1>
          <h1>Demo</h1>
        </nav>
        <main>
          <div className="search-box">
            <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            width >= 768 ? (
              <React.Fragment>
                <div className="tabSize">
                  <div className="details">
                    <h1>
                      {weather.sys.country}, {weather.name}
                    </h1>
                    <hr />
                    <h4>{dateBuilder(new Date())}</h4>
                    <hr />
                    <p className="temp">
                      <span className="sp1">Temperature :</span>{" "}
                      {Math.round(weather.main.temp)}
                      <span>&#8451;</span>
                    </p>
                    <hr />
                    <p className="cond"> {weather.weather[0].description}</p>
                  </div>
                  <div className="weather">{main}</div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="mobSize">
                  <div className="location-box">
                    <div className="location">
                      {weather.sys.country}, {weather.name}
                    </div>
                    <hr />
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <hr />

                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main.temp)}
                      <span>&#8451;</span>
                    </div>
                    <hr />
                    <div className="weather">
                      {weather.weather[0].description}
                    </div>
                    <hr />
                    <div>{main}</div>
                  </div>
                </div>
              </React.Fragment>
            )
          ) : (
            ""
          )}
          <footer>Made with ❤️ by LoOMa</footer>
        </main>
      </div>
    </div>
  );
}

export default App;
