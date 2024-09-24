import { GoStar, GoStarFill } from "react-icons/go";
import { WritingReceived } from "../types/writing";
import { FaTrash } from "react-icons/fa";
import { MdDoneOutline, MdMovieEdit } from "react-icons/md";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ENV from "../config/env.config";

export type WritingCardProps = {
  data: WritingReceived;
};

function WritingCard({ data }: WritingCardProps) {
  const [storyForm, setStoryForm] = useState(data);
  const [editingStory, setEditingStory] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateFunc } = useMutation({
    mutationFn: udpateStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
  const { mutateAsync: deleteFunc } = useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  async function deleteStory(id: string) {
    try {
      const response = await fetch(ENV.API_URL+"/api/story/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        // console.log("Story deleted successfully");
      }
      // console.log("Story deleted from DB successfully");
    } catch (error) {
      console.error("Error deleting story from DB", error);
    }
  }

  async function udpateStory(story: WritingReceived) {
    try {
      const response = await fetch(ENV.API_URL+"/api/story/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });
      if (response.ok) {
        // console.log("Story updated successfully");
      }
    } catch (error) {
      console.log("Error updating story in DB", error);
    }
  }

  return (
    <div
      className={`card relative w-[500px] max-h-96 bg-[#1a1a1a]/80 border-2 ${
        data.isSpecial ? "border-yellow-500/50" : "border-gray-700/50"
      } shadow-lg shadow-black/80 px-4 py-3 rounded-xl flex flex-col justify-between gap-5 transition-colors duration-100`}
    >
      <div className="content flex flex-col gap-5">
        <div className="banner-edits flex items-center justify-between">
          <span className="flex gap-2 items-center border-b-2 border-gray-600/80 pb-1">
            <span
              className="py-1 px-1 border border-yellow-500/50 rounded-t-md flex items-center cursor-pointer"
              onClick={() => updateFunc({...data, isSpecial: !data.isSpecial})}
            >
              {data.isSpecial ? (
                <GoStarFill className={`w-4 h-4  text-yellow-500/80`} />
              ) : (
                <GoStar className="w-4 h-4 text-yellow-500/90" />
              )}
            </span>
            <span className="text-lg md:text-xl w-fit font-semibold">
              {editingStory ? (
                <input
                  name="title"
                  type="text"
                  placeholder="Enter Title.."
                  value={storyForm.title}
                  onChange={(e) =>
                    setStoryForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="pl-1 w-full focus:outline-none rounded-sm"
                />
              ) : (
                <h2 className="">{storyForm.title}</h2>
              )}
            </span>
          </span>
          <span className="controls flex items-center gap-2 text-gray-500">
            <span
              className="cursor-pointer "
              onClick={() => setEditingStory(!editingStory)}
            >
              {editingStory ? (
                <MdDoneOutline
                  className="w-[22px] h-[22px] transition-all hover:text-gray-400/90"
                  onClick={() => {
                    updateFunc(storyForm);
                    setEditingStory(false);
                  }}
                />
              ) : (
                <MdMovieEdit className="w-[22px] h-[22px] transition-all hover:text-gray-400/90" />
              )}
            </span>
            <span
              className="cursor-pointer "
              onClick={() => deleteFunc(data._id)}
            >
              <FaTrash className="w-4 h-4 transition-colors hover:text-gray-400/90" />
            </span>
          </span>
        </div>
        <span className="text-sm mx-2">
          {editingStory ? (
            <textarea
              name="content"
              value={storyForm.content}
              onChange={(e) =>
                setStoryForm((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Let's hear your story.."
              className="px-2 py-1 w-full h-32 max-h-60 focus:outline-none rounded-md"
            />
          ) : (
            <p>{storyForm.content}</p>
          )}
        </span>
      </div>
      <div className="meta flex items-end justify-between">
        <span className="text-xs text-gray-400/80">
          # Tags:{" "}
          {editingStory ? (
            <input
              name="tags"
              type="text"
              value={storyForm.tags.join(",")}
              onChange={(e) => {
                setStoryForm((prev) => ({
                  ...prev,
                  tags: e.target.value.split(","),
                }));
              }}
              placeholder="Tags or Keywords ( , )"
              className="px-1 py-0.5 text-xs text-gray-400 focus:outline-none rounded-sm"
            />
          ) : (
            storyForm.tags.join(", ")
          )}
        </span>
        <span className="text-xs font-semibold text-gray-500/80 pr-2">
          [{data.date}]
        </span>
      </div>
    </div>
  );
}

export default WritingCard;
