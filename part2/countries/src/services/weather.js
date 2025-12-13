import axios from 'axios'

const url = 'https://api.open-meteo.com/v1/forecast'

const getWeather = (lat, lon) => {
  const params = {
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,wind_speed_10m',
    forecast_days: 1
  }

  const request = axios.get(url, {params})
  return request.then(response => response.data)
}

export default { getWeather }