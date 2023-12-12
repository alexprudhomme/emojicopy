import { writeFileSync } from "fs";

async function downloadEmojisData() {
  const url =
    "https://emoji-api.com/emojis?access_key=3d324c33630735bbc10547cfae2c676fd96e840a";

  const response = await fetch(url);
  const data = await response.json();
  writeFileSync("./data/emojis.json", JSON.stringify(data, null, 2));
}

downloadEmojisData();
