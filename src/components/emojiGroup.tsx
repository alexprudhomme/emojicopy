import { component$ } from "@builder.io/qwik";
import { Emoji } from "./emoji";
import type { EmojiState } from "~/interfaces/emoji";

export const EmojiBody = component$((props: { emojis: EmojiState }) => {
  return (
    <div class="flex justify-center items-center">
      <div class="column">
        {Object.entries(props.emojis).map(([group, emojisInGroup]) => (
          <div key={group}>
            <h1 class="text-center" id={group}>
              {getTitle(group)}
            </h1>
            <div class="flex flex-wrap justify-start gap-3 max-w-screen-lg">
              {emojisInGroup.emojis.map(({ character, slug }) => (
                <Emoji key={slug} character={character} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

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
