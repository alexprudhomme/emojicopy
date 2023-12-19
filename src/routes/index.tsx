import {
  $,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/emojis.json";
import { EmojiBody } from "~/components/emojiGroup";
import type { EmojiState } from "~/interfaces/emoji";
import { Header } from "~/components/header";

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
  const originalEmojis = useSignal<EmojiState>({});
  const emojis = useSignal<EmojiState>({});
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
    searchForQuery(originalEmojis.value, query.value)
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
      <Header emojis={emojis.value} query={query}></Header>
      <EmojiBody emojis={emojis.value}></EmojiBody>
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
