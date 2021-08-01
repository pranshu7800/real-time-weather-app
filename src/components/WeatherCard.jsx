import React, { useEffect } from 'react'

const WeatherCard = ({tempInfo}) => {
    const [weatherState, setWeatherState] = React.useState("");
    const {
       timezone, lon, lat, temp, humidity, pressure, weatherMood, name, speed, country, sunset
      } = tempInfo;

    useEffect(() => {
        if(weatherMood){
          switch (weatherMood) {
            case "Clouds":
              setWeatherState("wi-day-cloudy");
              break;
            case "Haze":
              setWeatherState("wi-fog");
              break;
            case "Clear":
              setWeatherState("wi-day-sunny");
              break;
            case "Mist":
              setWeatherState("wi-dust");
              break;
            case "Rain":
              setWeatherState("wi-rain");
              break;
          
            default:
              setWeatherState("wi-day-sunny");
              break;
          }
        }
    }, [weatherMood])
    //coverting the seconds into time
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset;
    let cityTime = utc + (1000 * timezone);
    let nd = new Date(cityTime).toLocaleString().replace(/:\d{2}\s/,' ');;

    return (
        <>
            <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weatherMood}</div>
            <div className="place">
              {name}, {country}</div>
          </div>
        </div>
        <div className="date">{nd}</div>
        
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p><i className={"wi wi-wind wi-towards-ne"}></i></p>
              <p className="extra-info-leftside">
                Long.:{lon} <br />
                Lat.:{lat}
              </p>
            </div>
            <div className="two-sided-section">
              <p><i className={"wi wi-humidity"}></i></p>
              <p className="extra-info-leftside">
                {humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
          <div className="two-sided-section">
              <p><i className={"wi wi-rain"}></i></p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p><i className={"wi wi-strong-wind"}></i></p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>
          </div>

        </div>
      </article>
        </>
    )
}

export default WeatherCard
