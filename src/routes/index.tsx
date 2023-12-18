import {
  $,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/emojis.json";
import { findTitle } from "~/utils/findTitle";
import { EmojiBody } from "~/components/emojiGroup";
import { MagnifyingGlassIcon } from "~/components/icons/magnifyingGlassIcon";
import type { EmojiState } from "~/interfaces/emoji";

function searchForQuery(emojis: EmojiState, query: string) {
  const searchedEmojis: EmojiState = {};
  const emojiValues = Object.values(emojis);
  emojiValues.forEach((emojiGroup) => {
    const emojis = emojiGroup.emojis.filter((emoji) => {
      return emoji.unicodeName.includes(query);
    });
    if (emojis.length > 0) {
      searchedEmojis[emojiGroup.group] = {
        ...emojiGroup,
        emojis,
      };
    }
  });
  return searchedEmojis;
}

export default component$(() => {
  const originalEmojis = useSignal<EmojiState>();
  const emojis = useSignal<EmojiState>();
  const query = useSignal<string>("");

  useTask$(() => {
    const emojiGroupedMap: EmojiState = {};

    emojisData.forEach((emoji) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!emojiGroupedMap[emoji.group]) {
        emojiGroupedMap[emoji.group] = {
          group: emoji.group,
          title: emoji.group,
          emojis: [],
        };
      }

      emojiGroupedMap[emoji.group].emojis.push(emoji);
    });
    originalEmojis.value = emojiGroupedMap;
    emojis.value = emojiGroupedMap;
  });

  const searchedEmojis = $(() =>
    searchForQuery(originalEmojis.value ?? {}, query.value)
  );

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => query.value);

    searchedEmojis().then((res) => {
      emojis.value = res;
    });
  });

  return (
    <>
      <div class="w-full bg-neon-carrot rounded-b-md flex">
        <div class="grow w-20 flex justify-center items-center">
          <div class="p-2 bg-atomic-tangerine h-8 rounded-md flex justify-center items-center shadow-lg h-10">
            <MagnifyingGlassIcon></MagnifyingGlassIcon>
            <input
              class="bg-transparent outline-none ml-2"
              bind:value={query}
            ></input>
          </div>
        </div>
        <div class="grow-0 ">
          <h1 class="text-4xl mt-4 mb-4">Emojis 😃</h1>
        </div>
        <div class="grow w-20 flex justify-center items-center">
          {Object.keys(emojis.value ?? {}).map((key) => (
            <div
              key={key}
              class="text-xs m-0.5 p-0.5 rounded-md shadow-lg bg-atomic-tangerine"
              onClick$={() => document.getElementById(key)?.scrollIntoView()}
            >
              {findTitle(key)}
            </div>
          ))}
        </div>
      </div>
      <div class="flex justify-center items-center">
        <EmojiBody emojis={emojis.value ?? {}}></EmojiBody>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Emojis Copy",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
