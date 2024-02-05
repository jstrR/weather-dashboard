import axios from 'axios';
import { wrap } from "@decs/typeschema";
import { number, object, optional, string } from "valibot";

import { createTRPCRouter, publicProcedure } from "../utils";
import type { GeocoderCity, Weather } from './types';

const weatherAPI = axios.create({
  baseURL: process.env.WEATHER_API_URL,
});

const getCityLatLon = async (city: string, limit?: number) => {
  try {
    const { data } = await axios.get<GeocoderCity[]>(`${process.env.WEATHER_GEOCODING_API_URL}/direct?q=${city}&limit=${limit || 1}&appid=${process.env.WEATHER_API_KEY}`);
    if (!data || data.length === 0) {
      return `City ${city} not found`;
    }
    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error: any) {
    console.error(error);
    return `Error: ${error?.message}`;
  }
}

export const weatherRouter = createTRPCRouter({
  getCity: publicProcedure.input(wrap(object({ city: string(), limit: optional(number()) }))).query(async ({ input }) => {
    try {
      const { city, limit } = input;
      const resp = await getCityLatLon(city, limit);
      return resp;
    } catch (error: any) {
      console.error(error);
      return `Error: ${error?.message}`;
    }
  }),
  getWeather: publicProcedure.input(wrap(object({
    city: string(), exclude: optional(string()), limit: optional(number())
  }))).query(async ({ input }) => {
    try {
      const { city, exclude, limit } = input;
      const cityCoords = await getCityLatLon(city, limit);
      if (typeof cityCoords === 'string') {
        return cityCoords;
      }
      const { data } = await weatherAPI.get<Weather>(`lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${process.env.WEATHER_API_KEY}`);
      return data;
    } catch (error: any) {
      console.error(error);
      return `Error: ${error?.message}`;
    }
  }),
});
