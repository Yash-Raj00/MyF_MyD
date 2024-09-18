// import React from 'react'

import { GoStar, GoStarFill } from "react-icons/go";
import { Writing } from "../types/writing";
import { FaEdit, FaTrash } from "react-icons/fa";

export type WritingCardProps = {
  data: Writing;
  toggleSpecial: (id: number, isSpecial: boolean) => void;
  deleteStory: (id: number) => void;
};

function WritingCard({ data, toggleSpecial, deleteStory }: WritingCardProps) {
  return (
    <div
      className={`card max-w-[500px] max-h-72 bg-[#1a1a1a]/80 border-2 ${
        data.isSpecial ? "border-yellow-500/50" : "border-gray-700"
      } shadow-lg shadow-black/80 px-4 py-3 rounded-xl flex flex-col justify-between gap-5 transition-colors`}
    >
      <div className="content flex flex-col gap-5">
        <div className="banner-edits flex items-center justify-between">
          <span className="flex gap-2 items-center border-b-2 border-gray-600/80 pb-1">
            <span
              className="py-1 px-1 border border-yellow-500/50 rounded-t-md flex items-center cursor-pointer"
              onClick={() => toggleSpecial(data.id, data.isSpecial)}
            >
              {data.isSpecial ? (
                <GoStarFill className={`w-4 h-4  text-yellow-500/80`} />
              ) : (
                <GoStar className="w-4 h-4 text-yellow-500/90" />
              )}
            </span>
            <h2 className="text-lg md:text-xl w-fit font-semibold">
              {data.title}
            </h2>
          </span>
          <span className="controls flex items-center gap-2">
            <span
              className="cursor-pointer text-gray-500"
              onClick={() => deleteStory(data.id)}
            >
              <FaEdit className="w-4 h-4 transition-colors hover:text-gray-400/90" />
            </span>
            <span
              className="cursor-pointer text-gray-500"
              onClick={() => deleteStory(data.id)}
            >
              <FaTrash className="w-4 h-4 transition-colors hover:text-gray-400/90" />
            </span>
          </span>
        </div>
        <p className="text-sm">{data.content}</p>
      </div>
      <div className="meta flex items-end justify-between">
        <span className="text-xs text-gray-400/80">
          # Tags: {data.tags.join(", ")}
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
