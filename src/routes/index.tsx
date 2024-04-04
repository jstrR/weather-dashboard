import { Match, Suspense, Switch } from "solid-js";
import { Icon } from "solid-heroicons";
import { mapPin } from "solid-heroicons/solid";

import { SearchLocation } from "~/molecules/SearchLocation";
import { CardDefault } from "~/molecules/CardDefault";

import { UVBar } from "~/atoms/UVBar";

import { locationName, weatherData } from "~/lib/store";

export default function Home() {
  return (
    <>
      <header class="w-full lg:w-4/5 2xl:w-8/12">
        <div class="flex items-center justify-between gap-x-16">
          <div class="flex flex-[4] items-center gap-x-4 lg:flex-[3]">
            <Icon path={mapPin} class="h-6 w-6 text-textLight" />
            <p class="pl-4 text-white">{locationName()}</p>
          </div>
          <SearchLocation class="flex-[6] lg:flex-[7]" />
        </div>
      </header>
      <main class="pt-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Match when={weatherData.error}>
              <CardDefault
                title="Error"
                description={weatherData.error?.message}
              />
            </Match>
            <Match when={!!weatherData()}>
              <CardDefault title="UV Index">
                <UVBar value={Math.floor(weatherData()!.current.uvi || 0)} />
              </CardDefault>
            </Match>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
