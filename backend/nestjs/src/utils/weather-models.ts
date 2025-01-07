export interface CurrentWeatherModel {
    location: string; 
    country: string; 
    temperature: number; 
    condition: string; 
    humidity: number;
  }
  
  export interface ForcastWeatherModel {
    date: string,
    maxTemp: number,
    minTemp: number,
    avgTemp: number,
    condition: string; 
    chanceOfRain: number,
    chanceOfSnow: number
  }