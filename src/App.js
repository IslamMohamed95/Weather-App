import React, {useState} from 'react';
import axios from 'axios';



function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=d56a7dfa66a1de42dc52dceb129d8ab8`

  const dateBuilder = (d) => {
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", " December"]
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const search = async evt => {
    if(evt.key === "Enter") {
      const result = await axios.get(api)
      setWeather(result.data)
      setQuery('')
      console.log(result.data)
    }
  }

  return (
    <div className={ (typeof weather.main != "undefined") ? ( (weather.main.temp > 16) ? 'App warm' : 'App' ) : 'App'}>
        <main>
          <div className='search-box'>
            <input
            className='search-bar'
            type="text"
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}/>
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.sys.country}, {weather.name}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
          

            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}&#8451;
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
          ): ('')}
        </main>
    </div>
  );
}

export default App;
