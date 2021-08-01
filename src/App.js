import React, { useState, useEffect } from 'react'
import './App.css';
import WeatherCard from './components/WeatherCard';
function App() {
  const [searchValue, setSearchValue] = useState("New Delhi");
  const [tempInfo, setTempInfo] = useState({});
  const getData = async ()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0a4838bbf74b6c7f1e171570a5c1d961`;
      const res = await fetch(url);
      const data = await res.json();
      const{lon, lat} = data.coord;
      const {timezone} = data;
      const {temp, humidity, pressure} = data.main;
      const {main:weatherMood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const weatherInfo ={
        timezone, lon,lat, temp, humidity, pressure, weatherMood, name, speed, country, sunset
      }
      setTempInfo(weatherInfo);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search"
          placeholder="search..."
          autoFocus
          id="search"
          className="searchTerm"
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getData}>
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
}
export default App;