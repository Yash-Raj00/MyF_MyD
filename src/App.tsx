import { useState } from "react";
import WritingCard from "./components/WritingCard";
import AddStoryPanel from "./components/AddStoryPanel";
import { WritingReceived, WritingSend } from "./types/writing";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const [stories, setStories] = useState([] as WritingReceived[]);
  const [showAddStoryPanel, setShowAddStoryPanel] = useState(false);

  const { isLoading, isError, } = useQuery({
    queryKey: ["stories"],
    queryFn: rqfetchStories,
  });

  // REACT QUERY
  async function rqfetchStories() {
    let response = [];
    try {
      const res = await fetch("http://localhost:3000/api/stories");
      response = await res.json();
      setStories(response.data ?? []);
      return response;
    } catch (error) {
      console.log("Error fetching stories", error);
    }
  }

  if (isLoading) return "Loading...";
  if (isError) return "Error fetching stories";

  // const fetchStories = () => {
  //   try {
  //     fetch("http://localhost:3000/api/stories")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === "empty") return;
  //         console.log(data);
  //         setStories(data.data);
  //       });
  //   } catch (error) {
  //     console.log("Error fetching stories", error);
  //   }
  // };

  async function deleteStory(id: string) {
    try {
      const response = await fetch("http://localhost:3000/api/story/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setStories((prevStories) =>
          prevStories.filter((story) => story._id !== id)
        );
      }
      console.log("Story deleted from DB successfully", response);
    } catch (error) {
      console.error("Error deleting story from DB", error);
    }
  }

  const handleSpecial = async (id: string, isSpecial: boolean) => {
    // try {
    //   const response = await fetch("http://localhost:3000/api/story/toggleSpecial", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id }),
    //   });
    //   if (response.ok) {
    //     setStories((prevStories) =>
    //       prevStories.filter((story) => story._id !== id)
    //     );
    //   }
    //   console.log("Story deleted from DB successfully", response);
    // } catch (error) {
    //   console.error("Error deleting story from DB", error);
    // }

    const story = stories.find((story) => story._id === id);
    if (story) {
      udpateStory({ ...story, isSpecial: !isSpecial });
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === id ? { ...story, isSpecial: !isSpecial } : story
        )
      );
    }
  };
  const handleAddStoryPanel = () => {
    setShowAddStoryPanel((prev) => !prev);
  };

  async function addStory(story: WritingSend) {
    try {
      const response = await fetch("http://localhost:3000/api/story/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["stories"] });
        console.log("Story added to DB successfully");
        // fetchStories();
      }
    } catch (error) {
      console.log("Error adding story to DB", error);
    }
  }
  async function udpateStory(story: WritingReceived) {
    try {
      const response = await fetch("http://localhost:3000/api/story/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });
      if (response.ok) {
        // queryClient.invalidateQueries({queryKey: ["stories"]});
        console.log("Story updated successfully");
      }
    } catch (error) {
      console.log("Error updating story in DB", error);
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
        {stories.map((writing) => (
          <WritingCard
            key={writing._id}
            data={writing}
            toggleSpecial={handleSpecial}
            deleteStory={deleteStory}
            updateStory={udpateStory}
          />
        ))}
        {/* {stories.map((writing) => (
          <WritingCard
            key={writing._id}
            data={writing}
            toggleSpecial={handleSpecial}
            deleteStory={deleteStory}
          />
        ))} */}
      </main>
      <AddStoryPanel
        showAddStoryPanel={showAddStoryPanel}
        togglePanel={handleAddStoryPanel}
        handleAddStory={addStory}
      />
    </div>
  );
}

// before:bg-gradient-to-r from-red-600 to-yellow-300 before:content-[''] before:w-96 before:h-96 before:absolute before:blur-sm

export default App;
