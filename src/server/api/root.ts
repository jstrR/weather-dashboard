import { weatherRouter } from "./routers/weather";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  weather: weatherRouter,
});

export type AppRouter = typeof appRouter;
