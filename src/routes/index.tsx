import { Icon } from "solid-heroicons";
import { mapPin } from "solid-heroicons/solid";

import { locationName } from "~/lib/store";

import { SearchLocation } from "~/molecules/SearchLocation";
import { CardDefault } from "~/molecules/CardDefault";
import { CardProgressBar } from "~/molecules/CardProgressBar";

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
        <CardDefault title="test" description="test2" />
        <CardProgressBar title="test" description="test2" value={6} />
      </main>
    </>
  );
}
