import "./App.css";
import search from "./assets/images/search.png";
import clear from "./assets/images/sun.png";
import snow from "./assets/images/snow.png";
import wave from "./assets/images/wave.png";
import wind from "./assets/images/wind.png";
import scatteredClouds from "./assets/images/Clouds.png";
import rain from "./assets/images/rain.png";
import fewcloud from "./assets/images/partly-cloudy.png";
import storm from "./assets/images/storm.png";
import mist from "./assets/images/fog.png";
import brokenclouds from "./assets/images/cloudy.png";
import { useEffect, useState } from "react";
import video from"./assets/images/video (2160p).mp4"
const Weatherdetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  air,
}) => {
  return (
    <>
      <div className="del-img">
        <img src={icon} alt="img" width={250} height={250}></img>
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img
            src={wave}
            alt="wave"
            className="icon"
            width={100}
            height={100}
          />
          <div className="data">
            <div className="percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img
            src={wind}
            alt="wind"
            className="icon"
            width={100}
            height={100}
          />
          <div className="data">
            <div className="percent">{air}km/hr</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {

  const [text, setText] = useState("puducherry");
  const [icon, setIcon] = useState(clear);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  //error message
  const [citynotfound, setcitynotfound] = useState(false);
  const [loading, setloading] = useState(false);
  const [errorr, seterrorr] = useState(null);

  const wetherconditon = {
    "01d": clear,
    "02d": fewcloud,
    "03d": scatteredClouds,
    "04d": brokenclouds,
    "09d": rain,
    "10d": rain,
    "11d": storm,
    "13d": snow,
    "50d": mist,
    "01n": clear,
    "02n": fewcloud,
    "03n": scatteredClouds,
    "04n": brokenclouds,
    "09n": rain,
    "10n": rain,
    "11n": storm,
    "13n": snow,
    "50n": mist,
  };

  const api = async () => {
    setloading(true);
    let api_key = "00337878728d40dd4a4c36de2555cd1c";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=
  ${text}&appid=${api_key}&units=Metric`;

    try {
      let result = await fetch(apiurl);
      let data = await result.json();
      // console.log(data)
      //for error
      if (data.cod === "404") {
        console.error("error.message");
        setcitynotfound(true);
        setloading(false);
        return;
      }
      let gethumidity = data.main.humidity;
      let getwindspeed = data.wind.speed;
      let gettemp = data.main.temp;
      let getcity = data.name;
      let getlon = data.coord.lon;
      let getlat = data.coord.lat;
      let getcounttry = data.sys.country;
      
      let geticon=data.weather[0].icon

      
      // let geticon=data.weather[main]
      setCity(getcity);
      setHumidity(gethumidity);
      setCountry(getcounttry);
      setLog(getlon);
      setLat(getlat);
      setWind(getwindspeed);
      setTemp(Math.floor(gettemp));
      setIcon(wetherconditon[geticon] );
      setcitynotfound(false);

    } 
    catch (error) {
      console.log(error.message);
      seterrorr("an error occured while feltching weather data");
    } finally {
      setloading(false);
    }
  };

  useEffect(function(){
api();
  },[]);
  const handlecity = (e) => {
    setText(e.target.value);
  };

  const keyboard = (e) => {
    if (e.key === "Enter") {
      api();
    }
  };

  return (
    <>
    <div className="copyright">
<h1>WEATHER APP</h1>
    </div>
      <div className="container">
      <video muted autoPlay loop>
  <source src={video} type="video/mp4" />
</video>
       <div className="input-container">
          <input
            type="text"
            className="cityinput"
            onKeyDown={keyboard}
            onChange={handlecity}
            placeholder="search city"
          />
          <div className="search-bar">
            <img src={search} alt="image" className="src" onClick={api} />
          </div>
        </div>
       { !citynotfound && !errorr&&!loading && <Weatherdetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          air={wind}
        /> }
     { loading &&  <div className="loading"> Loading....</div>}
     { errorr &&  <div className="err-mess"> {errorr}</div>}
{  citynotfound && <div className="citynotfound"> city not found</div>}

        <p className="copyright">Created By <span>suriyatechjs</span></p>
      </div>
    </>
  );
}

export default App;
