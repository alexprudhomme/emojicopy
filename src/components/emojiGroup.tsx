import { component$ } from "@builder.io/qwik";
import type { EmojiGroup } from "~/routes";
import { Emoji } from "./emoji";

export const EmojiBody = component$(
  (props: { emojis: { [key: string]: EmojiGroup } }) => {
    return (
      <div class="column">
        {Object.entries(props.emojis).map(([group, emojisInGroup]) => (
          <div key={group}>
            <h1 class="text-center">{getTitle(group)}</h1>
            <div
              class="display: flex;
  flex-wrap: wrap;
  justify-content: center;"
            >
              {emojisInGroup.emojis.map(({ character, slug }) => (
                <Emoji key={slug} character={character} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

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
