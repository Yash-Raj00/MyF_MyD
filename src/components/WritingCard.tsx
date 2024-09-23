import { GoStar, GoStarFill } from "react-icons/go";
import { WritingReceived } from "../types/writing";
import { FaTrash } from "react-icons/fa";
import { MdDoneOutline, MdMovieEdit } from "react-icons/md";
import { useState } from "react";

export type WritingCardProps = {
  data: WritingReceived;
  toggleSpecial: (id: string, isSpecial: boolean) => void;
  deleteStory: (id: string) => void;
  updateStory: (story: WritingReceived) => void;
};

function WritingCard({ data, toggleSpecial, deleteStory, updateStory }: WritingCardProps) {
  const [storyForm, setStoryForm] = useState(data);
  const [editingStory, setEditingStory] = useState(false);

  return (
    <div
      className={`card relative w-[500px] max-h-96 bg-[#1a1a1a]/80 border-2 ${
        data.isSpecial ? "border-yellow-500/50" : "border-gray-700/50"
      } shadow-lg shadow-black/80 px-4 py-3 rounded-xl flex flex-col justify-between gap-5 transition-colors`}
    >
      <div className="content flex flex-col gap-5">
        <div className="banner-edits flex items-center justify-between">
          <span className="flex gap-2 items-center border-b-2 border-gray-600/80 pb-1">
            <span
              className="py-1 px-1 border border-yellow-500/50 rounded-t-md flex items-center cursor-pointer"
              onClick={() => toggleSpecial(data._id, data.isSpecial)}
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
                <MdDoneOutline className="w-[22px] h-[22px] transition-all hover:text-gray-400/90"
                onClick={() => {
                  updateStory(storyForm);
                  setEditingStory(false);
                }}
                />
              ) : (
                <MdMovieEdit className="w-[22px] h-[22px] transition-all hover:text-gray-400/90" />
              )}
            </span>
            <span
              className="cursor-pointer "
              onClick={() => deleteStory(data._id)}
            >
              <FaTrash className="w-4 h-4 transition-colors hover:text-gray-400/90" />
            </span>
          </span>
        </div>
        <span className="text-sm mx-2">
          {editingStory ? (
            <textarea
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
      {/* <p>{data.emojis.join(" ")}</p> */}
    </div>
  );
}

export default WritingCard;
