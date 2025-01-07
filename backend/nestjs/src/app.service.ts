import { HttpStatus, Injectable } from '@nestjs/common';
import { CurrentWeatherModel, ForcastWeatherModel } from './utils/weather-models';

@Injectable()
export class AppService {
  private API_KEY="8e7a3e658b8f4897a65103340250701"
  private realtimeWeatherCache = new Map<string, CurrentWeatherModel>();
  private forecastWeatherCache = new Map<string, ForcastWeatherModel[]>();

  getHello() {
    return "Hello World!";
  }

  async getRealtimeWeather() {
    const cities = ['Gliwice', 'Hamburg'];
    const results = {};
    for (const city of cities) {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${city}`);

      if (response.status !== HttpStatus.OK)
        throw new Error(`Error fetching weather for ${city}: ${response.status}`);

      const data = await response.json();

      const weather = {
        location: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
      };

      this.realtimeWeatherCache.set(city, weather);

      results[city] = this.realtimeWeatherCache.get(city);
    }

    return results;
  }


  async getForecastWeather() {
    const cities = ['Gliwice', 'Hamburg'];
    const results = {};

    for (const city of cities) {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.API_KEY}&q=Gliwice&days=7`);

      if (res.status !== HttpStatus.OK)
        throw new Error(`Error fetching ${city} weather: ${res.status}`);

      const data = await res.json();

      const weather = data.forecast.forecastday.map(day => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        avgTemp: day.day.avgtemp_c,
        condition: day.day.condition.text,
        chanceOfRain: day.day.daily_chance_of_rain,
        chanceOfSnow: day.day.daily_chance_of_snow,
      }))

      this.forecastWeatherCache.set(city, weather)

      results[city] = this.forecastWeatherCache.get(city);
    }

    return results
  }
}
