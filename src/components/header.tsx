import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { MagnifyingGlassIcon } from "./icons/magnifyingGlassIcon";
import { findTitle } from "~/utils/findTitle";
import type { EmojiState } from "~/interfaces/emoji";

export const Header = component$(
  (props: { query: Signal<string>; emojis: EmojiState }) => {
    const keyboardShortcut = useSignal<string>("⌘ K");
    const setQuery = $((e: any) => {
      console.log(props.query);
      props.query.value = e.target.value;
    });

    const moveToGroup = $((group: string) => {
      const yOffset = -72;
      const element = document.getElementById(group);
      const y = element
        ? element.getBoundingClientRect().top + window.scrollY + yOffset
        : 0;
      window.scrollTo({ top: y, behavior: "smooth" });
    });

    return (
      <div class="w-full bg-neon-carrot rounded-b-md flex sticky top-0 z-10">
        <div class="grow w-20 flex justify-center items-center">
          <div class="p-2 bg-atomic-tangerine h-8 rounded-md flex justify-center items-center shadow-lg h-10">
            <MagnifyingGlassIcon></MagnifyingGlassIcon>
            <input
              class="bg-transparent outline-none ml-2"
              onInput$={setQuery}
            ></input>
          </div>
        </div>
        <div class="grow-0 ">
          <h1 class="text-4xl mt-4 mb-4">Emojis 😃</h1>
        </div>
        <div class="grow w-20 flex flex-wrap m-2 justify-center items-center">
          {Object.keys(props.emojis).map((key) => (
            <div
              key={key}
              class="text-xs m-0.5 p-0.5 cursor-pointer hover:bg-sky-300 rounded-md shadow-lg bg-atomic-tangerine"
              onClick$={() => moveToGroup(key)}
            >
              {findTitle(key)}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
