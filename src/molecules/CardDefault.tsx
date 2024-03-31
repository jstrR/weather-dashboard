import { Show, children } from "solid-js";

type CardDefaultProps = {
  children?: Element;
  title?: string;
  description?: string;
};

export const CardDefault = (props: CardDefaultProps) => {
  const safeChildren = children(() => props.children);
  return (
    <div class="flex flex-col rounded-lg bg-primaryLight p-4 text-textLight">
      <Show when={props.title}>
        <h6 class="text-xl">{props.title}</h6>
      </Show>
      <div>{safeChildren() || null}</div>
      <Show when={props.description}>
        <div class="flex justify-center">
          <h6 class="text-xl">{props.description}</h6>
        </div>
      </Show>
    </div>
  );
};
