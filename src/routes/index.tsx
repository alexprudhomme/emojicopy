import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/ordered-emojis.json";
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
  const emojis = useSignal<EmojiGroup[]>();

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
      <div class="flex justify-center items-center"></div>
      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {emojis.value?.map(({ group, title, emojis }) => (
            <EmojiGroup key={group} title={title} emojis={emojis} />
          ))}
        </div>
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
