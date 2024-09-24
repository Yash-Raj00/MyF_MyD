import { useState } from "react";
import WritingCard from "./components/WritingCard";
import AddStoryPanel from "./components/AddStoryPanel";
import { WritingReceived } from "./types/writing";
import { useQuery } from "@tanstack/react-query";
import ENV from "./config/env.config";
function App() {
  const [stories, setStories] = useState([] as WritingReceived[]);

  // REACT QUERY
  const { isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: rqfetchStories,
  });

  if (isLoading) return "Loading...";
  if (isError) return "Error fetching stories";

  async function rqfetchStories() {
    let response = [];
    try {
      // console.log(API_URL.API_URL)
      const res = await fetch(ENV.API_URL + "/api/stories");
      response = await res.json();
      setStories(response.data ?? []);
      return response;
    } catch (error) {
      console.log("Error fetching stories", error);
    }
  }

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
        {stories
          .filter((story) => story.isSpecial)
          .concat(stories.filter((story) => !story.isSpecial))
          .map((story) => (
            <WritingCard key={story._id} data={story} />
          ))}
      </main>
      <AddStoryPanel />
    </div>
  );
}

export default App;
