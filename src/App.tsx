import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WritingCard from "./components/WritingCard";
import { dummyWritings } from "./data/writingsData";
import random_emoji from "./assets/rand_emojis.svg";
import Footer from "./components/Footer";

function App() {
  const [stories, setStories] = useState(dummyWritings);
  const handleSpecial = (id: number, isSpecial: boolean) => {
    // console.log("Clicked on", id, "is", isSpecial);
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, isSpecial: !isSpecial } : story
      )
    );
  };
  const handleDeleteStory = (id: number) => {
    setStories((prevStories) => prevStories.filter((story) => story.id !== id));
  };
  return (
    <div className="container mx-auto px-4 md:px-0">
      <header
        id="header"
        className="container relative mx-auto flex flex-col items-center gap-4 my-20 md:my-16 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold">
          My <span className="text-orange-200">Friend</span>, My{" "}
          <span className="text-green-200">Diary</span>
        </h1>
        <p className="tagline text-xs font-medium">
          A place to keep your thoughts, special moments which you want to never
          forget!
        </p>
      </header>
      <main className="container pb-14 md:pb-20 max-w-6xl mx-auto flex flex-wrap justify-center items-centser gap-x-3 gap-y-6">
        {stories.map((writing) => (
          <WritingCard
            key={writing.id}
            data={writing}
            toggleSpecial={handleSpecial}
            deleteStory={handleDeleteStory}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

// before:bg-gradient-to-r from-red-600 to-yellow-300 before:content-[''] before:w-96 before:h-96 before:absolute before:blur-sm

export default App;
