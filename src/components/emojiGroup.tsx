import { component$ } from "@builder.io/qwik";
import type { EmojiValues } from "~/routes";
import Emoji from "./emoji";

export default component$((props: { title: string; emojis: EmojiValues[] }) => {
  return (
    <div>
      <h1 class="text-center">{props.title}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
        {props.emojis.map(({ character, slug }) => (
          <Emoji key={slug} character={character} />
        ))}
      </div>
    </div>
  );
});
