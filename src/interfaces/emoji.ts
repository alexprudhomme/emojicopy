interface EmojiVariant {
  slug: string;
  character: string;
}

interface EmojiValues {
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

export type EmojiState = Record<string, EmojiGroup>;
