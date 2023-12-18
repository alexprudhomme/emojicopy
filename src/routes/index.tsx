import {
  $,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/emojis.json";
import EmojiGroup from "~/components/emojiGroup";
interface EmojiValues {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
  variants?: Array<EmojiVariant>;
}
export interface EmojiGroup {
  group: string;
  title: string;
  emojis: EmojiValues[];
}

interface EmojiVariant {
  slug: string;
  character: string;
}

export default component$(() => {
  const originalEmojis = useSignal<{ [key: string]: EmojiGroup }>();
  const emojis = useSignal<{ [key: string]: EmojiGroup }>();

  const query = useSignal<string>("");

  useTask$(() => {
    const emojiGroupedMap: { [key: string]: EmojiGroup } = {};

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

  const setQuery = $((e: any) => {
    query.value = e.target.value;
  });

  return (
    <>
      <div class="w-full bg-neon-carrot rounded-b-md flex">
        <div class="grow w-20 flex justify-center items-center">
          <input onInput$={setQuery} placeholder="Search"></input>
        </div>
        <div class="grow-0 ">
          <h1 class="text-4xl mt-4 mb-4">Emojis 😃</h1>
        </div>
        <div class="grow w-20 flex justify-center items-center">
          <div>01 {query}</div>
          <div>02</div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <EmojiGroup emojis={emojis.value ?? {}}></EmojiGroup>
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

function searchForQuery(emojis: { [key: string]: EmojiGroup }, query: string) {
  const searchedEmojis: { [key: string]: EmojiGroup } = {};
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
