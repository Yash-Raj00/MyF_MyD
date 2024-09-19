import { useEffect, useState } from "react";
import WritingCard from "./components/WritingCard";
// import { dummyWritings } from "./data/writingsData";
import AddStoryPanel from "./components/AddStoryPanel";
import { Writing } from "./types/writing";

function App() {
  const [stories, setStories] = useState([] as Writing[]);

  const fetchStories = async () => {
    try {
      fetch("http://localhost:3000/api/stories")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStories(data);
        });
    } catch (error) {
      console.log("Error fetching stories", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleSpecial = (id: number, isSpecial: boolean) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, isSpecial: !isSpecial } : story
      )
    );
  };
  const handleDeleteStory = (id: number) => {
    setStories((prevStories) => prevStories.filter((story) => story.id !== id));
  };
  const [showAddStoryPanel, setShowAddStoryPanel] = useState(false);
  const handleAddStoryPanel = () => {
    setShowAddStoryPanel((prev) => !prev);
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
      <AddStoryPanel
        stories={stories}
        setStories={setStories}
        showAddStoryPanel={showAddStoryPanel}
        togglePanel={handleAddStoryPanel}
      />
    </div>
  );
}

// before:bg-gradient-to-r from-red-600 to-yellow-300 before:content-[''] before:w-96 before:h-96 before:absolute before:blur-sm

export default App;
