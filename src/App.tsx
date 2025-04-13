import {Component, createResource, createSignal, For} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const fetchUrl = 'https://solidjs-backend-fmgvh0adhtfgfyh4.westeurope-01.azurewebsites.net';

type WeatherForecast = {
  date: string;         
  temperatureC: number; 
  summary: string;      
  temperatureF: number; 
}; 

const fetchWeatherForecast = async () => {
  const response = await fetch(`${fetchUrl}/weatherForecast`);
  const result = await response.json();
  return result as WeatherForecast[];
}

const App: Component = () => {
  const [weatherForecast] = createResource(fetchWeatherForecast);
  
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {weatherForecast.loading && <p>Loading...</p>}
        {weatherForecast.error && <p>Error: {weatherForecast.error.message}</p>}
        <ul>
          <For each={weatherForecast()}>
            {(forecast) => (
              <li style={{margin: 0, padding: 0}}>
                <span>{forecast.date} {forecast.temperatureC}°C, {forecast.summary}</span>
              </li>
            )}
          </For>
        </ul>
      </header>
    </div>
  );
};

export default App;
