import { component$ } from "@builder.io/qwik";
import type { EmojiValues } from "~/routes";
import Emoji from "./emoji";

export default component$((props: { title: string; emojis: EmojiValues[] }) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.emojis.map(({ character, slug }) => (
        <Emoji key={slug} character={character} />
      ))}
    </div>
  );
});
