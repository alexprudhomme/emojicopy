import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import Emoji from "../components/emoji";
import type { DocumentHead } from "@builder.io/qwik-city";
import emojisData from "../../data/emojis.json";
interface EmojiValues {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
  variants?: Array<EmojiVariant>;
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
  // rewrite this to fetch from a local file
  // rewrite api fetch in a script

  /*
  how to center emojis
  si want the title to be centered and the input and the search bar to be beside it
  */
  return (
    <>
      <div class="w-full bg-neon-carrot rounded-b-md">
        <div class="flex justify-center items-center">
          <h1 class="text-4xl mt-4 mb-4">Emojis 😃</h1>
          <div>
            highilited buttons where you can scroll and they get highlted
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
          {emojis.value?.map(({ character, slug }) => (
            <div key={slug} class="flex justify-center items-center">
              <Emoji character={character} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Emojis",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
