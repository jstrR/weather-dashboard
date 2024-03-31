import { Icon } from "solid-heroicons";
import { magnifyingGlass } from "solid-heroicons/solid";
import { createEffect, createSignal } from "solid-js";

import { searchLocation } from "~/lib/store";

const [input, changeInput] = createSignal("");

export const SearchLocation = (props: { class?: string }) => {
  createEffect(() => {
    searchLocation(input());
  });

  return (
    <div class={`relative w-full ${props.class || ""}`}>
      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <Icon path={magnifyingGlass} class="h-5 w-5 text-textLight" />
      </div>
      <input
        class="w-full rounded-xl border-none bg-primaryLight px-4 py-2 ps-10 text-sm text-textLight placeholder-textLight focus:outline-none"
        placeholder="Search City..."
        value={input()}
        onInput={(e) => changeInput(e.currentTarget.value)}
      />
    </div>
  );
};
