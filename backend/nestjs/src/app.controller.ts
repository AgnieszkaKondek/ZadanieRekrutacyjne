import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get(`/realtime-weather`)
  async getRealtimeWeather() {
    return await this.appService.getRealtimeWeather();
  }

  @Get(`/forecast-weather`)
  async getForecastWeather() {
    return await this.appService.getForecastWeather();
  }
}
