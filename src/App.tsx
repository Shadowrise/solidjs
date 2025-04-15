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

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const fetchWeatherForecast = async () => {
  const response = await fetch(`${fetchUrl}/weatherForecast`);
  const result = await response.json();
  return result as WeatherForecast[];
}

const fetchUsers = async () => {
  const response = await fetch(`${fetchUrl}/users`);
  const result = await response.json();
  return result as User[];
};

const App: Component = () => {
  const [users] = createResource(fetchUsers);
  
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {users.loading && <p>Loading...</p>}
        {users.error && <p>Error: {users.error.message}</p>}
        <ul>
          <For each={users()}>
            {(user) => (
              <li>
                <span>Name: {user.name}; Email: {user.email}</span>
              </li>
            )}
          </For>
        </ul>
      </header>
    </div>
  );
};

export default App;
