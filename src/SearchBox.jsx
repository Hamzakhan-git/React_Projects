import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "80fa32e414e1cb2c7c1aa7b8daf695ca";
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let getWeatherInfo = async () => {
        
       let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jasonResponse = await response.json();
       console.log(jasonResponse);

       // Check if city is found
    if (response.ok === false || !jasonResponse.main) {
        throw new Error("City not found");
    }
       let result = {
        city: city,
        temp: jasonResponse.main.temp,
        tempMin: jasonResponse.main.temp_min,
        tempMax: jasonResponse.main.temp_max,
        humidity: jasonResponse.main.humidity,
        feelsLike: jasonResponse.main.feels_like, 
        weather: jasonResponse.weather[0].description,

       };
       console.log(result);
       return result;
    };

    let handleCity = (event) => {
        setCity(event.target.value);
    }
    let handleSubmit = async(evt) =>{
        evt.preventDefault();
        try {
        console.log(city);
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        setCity("");
        setError(false);
        }
        catch(err){
            setError(true);
        }
    }; 
    return (
        <div className='SearchBox'>
            <form action="">
                <TextField id="city" 
                label="City Name" 
                variant="outlined" 
                required value={city}
                onChange={handleCity} />
                <br /><br />
                <Button onClick={handleSubmit} variant="contained" type='submit'>Search</Button>
                {error && <p style={{color:"red"}}>No such place exists!</p>}
            </form>
        </div>
    )
}