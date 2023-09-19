import './App.css';
import CurrentWeather from './component/search/current-weather/current-weather';
import Search from './component/search/search';
import { WEATHER_API_URL,WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './component/search/forecast/forecast';


function App() {
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forcast,setForcast] = useState(null);

  
  const handleOnSearchChange=(searchData)=>{
   const [lat,lon]= searchData.value.split(" ");

   const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
   const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch,forecastFetch])
    .then(async (response)=>{
     const weatherResponse =await response[0].json();
     const forcastResponse =await response[1].json();

     setCurrentWeather({city: searchData.label, ...weatherResponse});
     setForcast({city:searchData.label, ...forcastResponse});
    })
    .catch ((err)=>console.log(err));
  }
  // console.log(currentWeather);
  console.log(forcast);


  return (
    
    <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
     {currentWeather && <CurrentWeather data={currentWeather}/>}
     {forcast &&<Forecast data={forcast}/>}
    </div>
  );
}

export default App;
