import { component$, useSignal, $ } from "@builder.io/qwik";
import { CopyIcon } from "./icons/copyIcon";

export const Emoji = component$((props: { character: string }) => {
  const copyEmoji = $(() => {
    navigator.clipboard.writeText(props.character);
  });

  const isHovering = useSignal(false);
  const handleMouseEnter = $(() => {
    isHovering.value = true;
  });
  const handleMouseLeave = $(() => {
    isHovering.value = false;
  });

  return (
    <div
      onClick$={copyEmoji}
      onMouseEnter$={handleMouseEnter}
      onMouseLeave$={handleMouseLeave}
      class="relative bg-metallic-blue hover:bg-sky-700 rounded-md w-32 h-32 cursor-pointer"
    >
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
        {props.character}
      </div>
      {isHovering.value && (
        <div class="absolute top-0 right-0 mt-2 mr-2">
          <CopyIcon></CopyIcon>
        </div>
      )}
    </div>
  );
});
