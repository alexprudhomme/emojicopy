import { component$, useSignal, $ } from "@builder.io/qwik";
import { CopyIcon } from "./icons/copy-icon";

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
      class="relative border-2 border-[#85B7FF] drop-shadow-2xl rounded-md w-[117px] h-[117px] cursor-pointer emoji"
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
