import { useState } from "react";
import { GoStar } from "react-icons/go";
import { MdMovieEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import EmojiPicker, { Theme } from "emoji-picker-react";
import BottomButtons from "./BottomButtons";
import { IoBackspaceSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Writing } from "../types/writing";

export type AddStoryPanelProps = {
  stories: Writing[];
  setStories: (stories: Writing[]) => void;
  showAddStoryPanel: boolean;
  togglePanel: () => void;
};

function AddStoryPanel({
  stories,
  setStories,
  showAddStoryPanel,
  togglePanel,
}: AddStoryPanelProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [story, setStory] = useState({
    id: 0,
    title: "",
    content: "",
    date: new Date().toLocaleDateString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    emojis: Array<string>(),
    tags: Array<string>(),
    isSpecial: false,
  });

  //   const handleClickOutside = (event) => {
  //     if (buttonRef.current && !buttonRef.current.contains(event.target)) {
  //       setShowEmojiPicker(false);
  //     }
  //   };

  function handleTitleChange(newTitle: string) {
    if (newTitle.length < 40) {
      setStory((prev) => ({ ...prev, title: newTitle }));
    }
  }
  function emptyStory() {
    setStory({
      id: 0,
      title: "",
      content: "",
      date: new Date().toLocaleDateString("en-UK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      emojis: Array<string>(),
      tags: Array<string>(),
      isSpecial: false,
    });
  }
  function handleStorySubmit() {
    if (story.title.length < 5 || story.content.length < 10) {
      alert(
        "Title must be atleast 5 characters and Content must be atleast 10 characters long."
      );
      return;
    }
    story.id = stories.length;
    let newStories = stories;
    newStories.push(story);
    setStories(newStories);
    console.log(story);
    emptyStory();
    setShowEmojiPicker(false);
    togglePanel();
  }
  return (
    <>
      <BottomButtons
        togglePanel={togglePanel}
        // showAddStoryPanel={showAddStoryPanel}
      />
      <div
        className={`fixed bottom-0 w-full pointer-events-none ${
          showAddStoryPanel ? "" : "translate-y-full"
        } transition-transform duration-200`}
      >
        <div
          className={`card w-[500px] min-h-96 masx-h-[500px] mx-auto pointer-events-auto bg-[#1a1a1a]/80 backdrop-blur-sm border-2 border-gray-700 shadow-lg shadow-black/80 px-4 py-3 rounded-t-xl flex flex-col justify-between gap-5 transition-colors`}
        >
          <span
            className={`absolute -top-[31px] right-1 bg-[#1a1a1a] backdrop-blur-sm border-t-2 border-x-2 px-3 py-2 rounded-t-md border-red-900 text-red-700 hover:text-red-600 hover:border-red-700 transition-all ${
              showAddStoryPanel ? "" : "hidden"
            } `}
            onClick={() => {
              togglePanel();
              emptyStory();
              setShowEmojiPicker(false);
            }}
          >
            <ImCross className="w-3 h-3" />
          </span>
          <div className="content flex flex-col gap-5">
            <div className="banner-edits flex items-center justify-between gap-3">
              <span className="flex w-full gap-2 items-center border-b-2 border-gray-600/80 pb-1">
                <span className="py-1 px-1 border border-yellow-500/30 rounded-t-md flex items-center">
                  <GoStar className="w-4 h-4 text-yellow-500/40" />
                </span>
                <span className="text-lg md:text-xl w-full font-semibold">
                  <input
                    type="text"
                    placeholder="Enter Title.."
                    value={story.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="px-1 text-lg md:text-xl w-full font-semibold focus:outline-none rounded-sm"
                  />
                </span>
              </span>
              <span className="controls flex items-center gap-2 text-gray-700">
                <span className="">
                  <MdMovieEdit className="w-[22px] h-[22px] transition-colors" />
                </span>
                <span className="">
                  <FaTrash className="w-4 h-4 transition-colors" />
                </span>
              </span>
            </div>
            <span className="text-sm mx-2">
              <textarea
                value={story.content}
                onChange={(e) =>
                  setStory((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Let's hear your story.."
                className="px-2 py-1 w-full max-h-[500px] focus:outline-none rounded-md"
              />
            </span>
            <div className="text-sm w-full mx-2 flex items-start">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`bg-black w-24 p-1.5 rounded-l-md outline-gray-400 hover:outline-gray-500 hover:text-gray-500 ${
                  showEmojiPicker && "outline-gray-500 text-gray-500"
                }`}
              >
                Add emojis:
              </button>
              <span className="">
                <input
                  type="text"
                  disabled
                  value={story.emojis.join("")}
                  onChange={(e) => {
                    setStory((prev) => ({
                      ...prev,
                      emojis: e.target.value.split(""),
                    }));
                  }}
                  placeholder="Suitable for story.. (max 3)"
                  className="px-2 py-1.5 w-[290px] max-h-[500px] focus:outline-none"
                />
                <EmojiPicker
                  open={showEmojiPicker}
                  width={"100%"}
                  height={"370px"}
                  theme={Theme.DARK}
                  previewConfig={{
                    showPreview: false,
                  }}
                  onEmojiClick={(emoji, event) => {
                    let newEmojis = story.emojis;
                    if (
                      newEmojis.length === 3 ||
                      newEmojis.includes(emoji.emoji)
                    )
                      return;
                    newEmojis.push(emoji.emoji);
                    setStory((prev) => ({
                      ...prev,
                      emojis: newEmojis,
                    }));
                  }}
                />
              </span>
              <span
                className="bg-black p-1.5 rounded-r-md text-gray-400 hover:text-gray-500 active:text-gray-100 transition-all"
                onClick={() => {
                  let newEmojis = story.emojis;
                  newEmojis.pop();
                  setStory((prev) => ({ ...prev, emojis: newEmojis }));
                }}
              >
                <IoBackspaceSharp className="w-5 h-5" />
              </span>
            </div>
            <button
              className={`bg-black w-24 p-1 ${
                showEmojiPicker ? "mt-4" : "mt-24"
              } mx-auto rounded-md transition-all outline outline-2 outline-gray-400 hover:outline-gray-300 hover:text-gray-100`}
              onClick={handleStorySubmit}
            >
              Done
            </button>
          </div>
          <div className="meta flex items-end justify-between">
            <span className="text-xs text-gray-400/80">
              # Tags:{" "}
              <input
                type="text"
                value={story.tags.join(",")}
                onChange={(e) => {
                  setStory((prev) => ({
                    ...prev,
                    tags: e.target.value.split(","),
                  }));
                }}
                placeholder="Tags or Keywords ( , )"
                className="px-1 py-0.5 text-xs text-gray-400 focus:outline-none rounded-sm"
              />
            </span>
            <span className="text-xs font-semibold text-gray-500/80 pr-2">
              [{story.date}]
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStoryPanel;
