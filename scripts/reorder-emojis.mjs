import fs from "fs";

function findTitle(group) {
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

function reorderEmojis() {
  const emojisData = fs.readFileSync("./data/emojis.json", "utf8");
  const emojis = JSON.parse(emojisData);

  const groups = [];
  emojis.forEach((emoji) => {
    if (!groups.includes(emoji.group)) {
      groups.push(emoji.group);
    }
  });

  const orderedEmojis = [];
  groups.forEach((group) => {
    const groupEmojis = emojis.filter((emoji) => emoji.group === group);
    const groupObj = {
      group: group,
      title: findTitle(group),
      emojis: groupEmojis,
    };
    orderedEmojis.push(groupObj);
    console.log(groupObj.group, groupObj.title, groupObj.emojis.length);
  });

  fs.writeFileSync(
    "./data/ordered-emojis.json",
    JSON.stringify(orderedEmojis, null, 2)
  );
}

reorderEmojis();
