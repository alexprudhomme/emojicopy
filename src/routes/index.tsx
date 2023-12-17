import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/emojis.json";
import EmojiGroup from "~/components/emojiGroup";
export interface EmojiValues {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
  variants?: Array<EmojiVariant>;
}

interface EmojiGroup {
  group: string;
  title: string;
  emojis: EmojiValues[];
}

interface EmojiVariant {
  slug: string;
  character: string;
}

export default component$(() => {
  const emojis = useSignal<EmojiValues[]>();

  useTask$(() => {
    emojis.value = emojisData;
  });

  return (
    <>
      <div class="w-full bg-neon-carrot rounded-b-md flex">
        <div class="grow w-20 flex justify-center items-center">
          <input></input>
        </div>
        <div class="grow-0 ">
          <h1 class="text-4xl mt-4 mb-4">Emojis 😃</h1>
        </div>
        <div class="grow w-20 flex justify-center items-center">
          <div>01</div>
          <div>02</div>
        </div>
      </div>
      {renderEmojiGroups(emojis.value!)}
      {/* <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {emojis.value?.map(({ group, title, emojis }) => (
            <EmojiGroup key={group} title={title} emojis={emojis} />
          ))}
        </div> */}
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

function getTitle(group: string) {
  switch (group) {
    case "smileys-emotion":
      return "Smileys & Emotion";
    case "people-body":
      return "People & Body";
    case "animals-nature":
      return "Animals & Nature";
    case "food-drink":
      return "Food & Drink";
    case "travel-places":
      return "Travel & Places";
    case "activities":
      return "Activities";
    case "objects":
      return "Objects";
    case "symbols":
      return "Symbols";
    case "flags":
      return "Flags";
    default:
      return "Other";
  }
}

function renderEmojiGroups(emojis: EmojiValues[]) {
  const emojieGroupedMap: { [key: string]: EmojiGroup } = {};

  emojis.forEach((emoji) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!emojieGroupedMap[emoji.group]) {
      emojieGroupedMap[emoji.group] = {
        group: emoji.group,
        title: emoji.group,
        emojis: [],
      };
    }

    emojieGroupedMap[emoji.group].emojis.push(emoji);
  });
  return (
    <div class="flex justify-center items-center">
      <div class="column">
        {Object.entries(emojieGroupedMap).map(([title, emojisInGroup]) => (
          <EmojiGroup
            key={title}
            title={getTitle(title)}
            emojis={emojisInGroup.emojis}
          ></EmojiGroup>
        ))}
      </div>
    </div>
  );
}
