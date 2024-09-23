export interface WritingReceived {
  _id: string;
  title: string;
  content: string;
  date: string;
  emojis: string[];
  tags: string[];
  isSpecial: boolean;
}

export interface WritingSend {
  title: string;
  content: string;
  date: string;
  emojis: string[];
  tags: string[];
  isSpecial: boolean;
}
