import axios from "axios";
import { wrap } from "@decs/typeschema";
import { number, object, optional, string } from "valibot";

import { createTRPCRouter, publicProcedure } from "../utils";
import type { GeocoderCity, Weather } from './types';
import { TRPCError } from "@trpc/server";

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
  getCityCoords: publicProcedure
    .input(wrap(object({ city: string(), limit: optional(number()) })))
    .query(async ({ input }) => {
      try {
        const { city, limit } = input;
        if (!city) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'City is required.',
          });
        }
        const resp = await getCityLatLon(city, limit);
        return resp;
      } catch (error: any) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: error,
        });
      }
    }),
  getWeather: publicProcedure.input(wrap(object({
    city: string(), exclude: optional(string()), limit: optional(number())
  }))).query(async ({ input }) => {
    const { city, exclude, limit } = input;
    if (!city) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'City is required.',
      });
    }
    const cityCoords = await getCityLatLon(city, limit);
    // If cityCoords is a string, it means it's an error message
    if (typeof cityCoords === 'string') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: cityCoords,
      });
    }
    const { data } = await weatherAPI.get<Weather>(`/onecall?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${process.env.WEATHER_API_KEY}`);
    return data;
  }),
});
