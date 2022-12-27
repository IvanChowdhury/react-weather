import React, {useState} from "react";
import axios from 'axios';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const api = '484e61bd085330a9485dd8587e04557f'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className={
      (typeof data.main != "undefined")
      ? ((data.main.temp > 8)
       ? 'app warm'
       : 'app cold')
       : 'app warm'}>
      <div className="search">
        <input
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder= 'Enter location'
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°c</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

       {data.name !== undefined && 
       <div className="bottom">
         <div className="feels">
           {data.main ? <p className="bold">{data.main.feels_like}°c</p> : null}
           <p>Feels Like</p>
         </div>
         <div className="humidity">
           {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
           <p>Humidity</p>
         </div>
         <div className="wind">
           {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
           <p>Wind Speed</p>
         </div>
       </div>
       }
      </div>
    </div>
  );
}

export default App;
