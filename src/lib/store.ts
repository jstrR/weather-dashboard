import { createSignal, createMemo, createResource } from "solid-js";
import { useDebounce } from "./useDebounce";

import { api } from "./api";

export const [location, changeLocation] = createSignal("");

export const locationName = createMemo(() => location());

export const getWeatherData = async (city: string) => {
  try {
    const data = await api.weather.getWeather.query({ city });

    return data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export const [cityCoordsSearch] = createResource(location, getWeatherData);

export const searchLocation = useDebounce(
  async (newLocation: string) => {
    if (!newLocation) return;

    changeLocation(newLocation);

    await getWeatherData(newLocation);
  }, 500);
