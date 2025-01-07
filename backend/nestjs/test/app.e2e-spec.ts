import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/realtime-weather (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/realtime-weather');
    expect(response.status).toBe(200);

    const gliwiceWeather = response.body.Gliwice;
    expect(gliwiceWeather).toHaveProperty('location');
    expect(gliwiceWeather).toHaveProperty('country');
    expect(gliwiceWeather).toHaveProperty('temperature');
    expect(gliwiceWeather).toHaveProperty('condition');
    expect(gliwiceWeather).toHaveProperty('humidity');
    expect(typeof gliwiceWeather.location).toBe('string');
    expect(typeof gliwiceWeather.country).toBe('string');
    expect(typeof gliwiceWeather.temperature).toBe('number');
    expect(typeof gliwiceWeather.condition).toBe('string');
    expect(typeof gliwiceWeather.humidity).toBe('number');

    const hamburgWeather = response.body.Hamburg;
    expect(hamburgWeather).toHaveProperty('location');
    expect(hamburgWeather).toHaveProperty('country');
    expect(hamburgWeather).toHaveProperty('temperature');
    expect(hamburgWeather).toHaveProperty('condition');
    expect(hamburgWeather).toHaveProperty('humidity');
    expect(typeof hamburgWeather.location).toBe('string');
    expect(typeof hamburgWeather.country).toBe('string');
    expect(typeof hamburgWeather.temperature).toBe('number');
    expect(typeof hamburgWeather.condition).toBe('string');
    expect(typeof hamburgWeather.humidity).toBe('number');
  });

  it('/forecast-weather (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/forecast-weather');
    expect(response.status).toBe(200);

    const gliwiceForecast = response.body.Gliwice;
    expect(Array.isArray(gliwiceForecast)).toBe(true);
    gliwiceForecast.forEach((day) => {
      expect(day).toHaveProperty('date');
      expect(day).toHaveProperty('maxTemp');
      expect(day).toHaveProperty('minTemp');
      expect(day).toHaveProperty('avgTemp');
      expect(day).toHaveProperty('condition');
      expect(day).toHaveProperty('chanceOfRain');
      expect(day).toHaveProperty('chanceOfSnow');
      expect(typeof day.date).toBe('string');
      expect(typeof day.maxTemp).toBe('number');
      expect(typeof day.minTemp).toBe('number');
      expect(typeof day.avgTemp).toBe('number');
      expect(typeof day.condition).toBe('string');
      expect(typeof day.chanceOfRain).toBe('number');
      expect(typeof day.chanceOfSnow).toBe('number');
    });

    const hamburgForecast = response.body.Hamburg;
    expect(Array.isArray(hamburgForecast)).toBe(true);
    hamburgForecast.forEach((day) => {
      expect(day).toHaveProperty('date');
      expect(day).toHaveProperty('maxTemp');
      expect(day).toHaveProperty('minTemp');
      expect(day).toHaveProperty('avgTemp');
      expect(day).toHaveProperty('condition');
      expect(day).toHaveProperty('chanceOfRain');
      expect(day).toHaveProperty('chanceOfSnow');
      expect(typeof day.date).toBe('string');
      expect(typeof day.maxTemp).toBe('number');
      expect(typeof day.minTemp).toBe('number');
      expect(typeof day.avgTemp).toBe('number');
      expect(typeof day.condition).toBe('string');
      expect(typeof day.chanceOfRain).toBe('number');
      expect(typeof day.chanceOfSnow).toBe('number');
    });
  });
});
