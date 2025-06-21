import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react';
export default function WeatherApp() {
    const [ weatherInfo, setWeatherInfo] = useState({
        city: "Agra",
        feelslike: 40.35,
        temp: 35.83,
        tempMin:35.65,
        tempMax:35.65,
        humidity:46,
        weather: "Rainy",
    });
    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);

    }
    return (
        <div style={{textAlign: "center"}}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}