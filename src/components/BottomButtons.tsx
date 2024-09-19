// import React from "react";

import { Writing } from "../types/writing";

export type BottomPanelProps = {
  togglePanel: () => void;
  // showAddStoryPanel: boolean;
}

function BottomPanel({ togglePanel }: BottomPanelProps) {
  return (
    <div className="panel fixed bottom-0 w-full">
      <div className="max-w-[500px] mx-auto rounded-t-xl transition-colors flex justify-center">
        <button className={`bg-[#1a1a1a]/80 relative border-t-2 border-x-2 border-gray-700 px-2 pt-1 pb-3 rounded-t-md mx-1 hover:border-gray-500 translate-y-2 hover:translate-y-1 transition-all text-gray-400/80 hover:text-gray-300`}
        onClick={togglePanel}
        >
          Add Story
        </button>
       
      </div>
    </div>
  );
}

export default BottomPanel;
