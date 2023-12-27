import { $, component$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { MagnifyingGlassIcon } from "./icons/magnifying-glass-icon";
import type { EmojiState } from "~/interfaces/emoji";
import { SmileIcon } from "./icons/smile-icon";
import { HandIcon } from "./icons/hand-icon";
import { FrogIcon } from "./icons/frog-icon";
import { IceCreamIcon } from "./icons/ice-cream-icon";
import { PlaneIcon } from "./icons/plane-icon";
import { FutbolIcon } from "./icons/futbol-icon";
import { SymbolIcon } from "./icons/symbol-icon";
import { FlagIcon } from "./icons/flag-icon";
import { CrownIcon } from "./icons/crown-icon";

export const Header = component$(
  (props: { query: Signal<string>; emojis: EmojiState }) => {
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
      <div
        class="w-full rounded-b-md flex sticky top-0 z-10 border-2 border-[#85B7FF]"
        style="background-color: hsl(215, 100%, 76%, 0.3);"
      >
        <div class="grow w-20 flex justify-center items-center">
          <div class="p-2 bg-white border-2 border-[#85B7FF] h-8 rounded-md flex justify-center items-center h-10 drop-shadow-2xl white-container">
            <MagnifyingGlassIcon></MagnifyingGlassIcon>
            <input
              class="bg-transparent outline-none ml-2"
              onInput$={setQuery}
            ></input>
          </div>
        </div>
        <div class="grow-0 ">
          <h1 class="text-4xl mt-4 mb-4 text-[#A33077]">Emojis 🦆</h1>
        </div>
        <div class="grow w-20 flex flex-wrap justify-center items-center">
          <div class="flex justify-between w-3/6">
            {Object.keys(props.emojis).map((key) => (
              <div
                key={key}
                class="m-0.5 p-0.5 cursor-pointer rounded-md shadow-lg border-2 border-[#85B7FF] drop-shadow-2xl white-container"
                onClick$={() => moveToGroup(key)}
              >
                {findIconFromGroup(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export const findIconFromGroup = (group: string) => {
  switch (group) {
    case "smileys-emotion":
      return <SmileIcon></SmileIcon>;
    case "people-body":
      return <HandIcon></HandIcon>;
    case "animals-nature":
      return <FrogIcon></FrogIcon>;
    case "food-drink":
      return <IceCreamIcon></IceCreamIcon>;
    case "travel-places":
      return <PlaneIcon></PlaneIcon>;
    case "activities":
      return <FutbolIcon></FutbolIcon>;
    case "objects":
      return <CrownIcon></CrownIcon>;
    case "symbols":
      return <SymbolIcon></SymbolIcon>;
    case "flags":
      return <FlagIcon></FlagIcon>;
    default:
      return "Other";
  }
};
