import fs from "fs";
import { findTitle } from "~/utils/findTitle";

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
