import { Show, children } from "solid-js";

type CardProgressBarProps = {
  children?: Element;
  title?: string;
  description?: string;
  value?: number;
};

export const CardProgressBar = (props: CardProgressBarProps) => {
  const safeChildren = children(() => props.children);

  return (
    <div class="flex flex-col rounded-lg bg-primaryLight p-4 text-textLight">
      <Show when={Number(props.value) >= 0}>
        <div class="relative flex flex-col items-center justify-center pb-10">
          <div class="relative -mb-10 h-24 w-48 overflow-hidden">
            <div
              class="absolute left-0 top-0 h-48 w-48 rounded-[50%] border-[16px] border-gray-400 border-b-cyan-400 border-r-cyan-400"
              style={{
                transform: `rotate(${45 + props.value! * 10 * 1.5}deg)`,
              }}
            ></div>
          </div>
          <span class="text-2xl">{props.value}</span>
        </div>
      </Show>
    </div>
  );
};
