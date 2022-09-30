import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {

    const resetWeatherValue = () => {
        SetQuery('');
    }
    const [query, SetQuery] = useState('');

    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query)
            setWeather(data);
            resetWeatherValue();
        }
    }

    const searchBtn = async () => {
        const data = await fetchWeather(query)
        setWeather(data);
        resetWeatherValue();
    }
    return (

        <div className="main-container">
            <input
                type="text" className="search" placeholder="Type city name..." value={query}
                onChange={(e) => SetQuery(e.target.value)}
                onKeyPress={search}
                
            />
            <div><button className='search-btn' onClick={searchBtn}>Search</button></div>
            
            {
                weather.main && (
                    <div className='city'>
                        <h2 className='city-name'>
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                        </h2>

                        <div className='city-temp'>{Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className='info'>
                            <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>

                )
            }
        </div>
    );
}

export default App;