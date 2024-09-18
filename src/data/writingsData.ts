import { Writing } from "../types/writing";

export const dummyWritings: Writing[] = [
  {
    id: 0,
    title: "First blog",
    content:
      "This is my first blog. I am so excited to write my first blog. I hope you enjoy reading it.This is my first blog. I am so excited to write my first blog. I hope you enjoy reading it.This is my first blog. I am so excited to write my first blog. I hope you enjoy reading it.",
    date: "17-09-2024",
    emojis: ["🚀", "🎉", " 🥳"],
    tags: ["first", "blog"],
    isSpecial: false,
  },
  {
    id: 1,
    title: "I played Cricket today",
    content:
    "I played cricket today. I hit a six and a four. I also took 2 wickets. It was a great day.",
    date: "18-09-2024",
    emojis: ["🏏", "🏆", "🎖"],
    tags: ["cricket", "sports"],
    isSpecial: true,
  },
  {
    id: 2,
    title: "I cooked for the first time",
    content:
    "I cooked for the first time today. I made a sandwich. It was delicious. I am proud of myself.",
    date: "19-09-2024",
    emojis: ["🥪", "👨‍🍳", "🍽"],
    tags: ["cooking", "food"],
    isSpecial: false,
  },
];
