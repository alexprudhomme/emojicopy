export function findTitle(group: string) {
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
