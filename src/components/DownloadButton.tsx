import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface DownloadButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex bg-white px-4 py-2 rounded disabled:opacity-50 ${
        isDisabled ? "bg-gray-300" : "bg-white"
      }`}
      aria-label="Download selected files"
      aria-disabled={isDisabled}
    >
      <ArrowDownTrayIcon className="mr-2 size-6" aria-hidden="true" />
      Download Selected
    </button>
  );
};

export default DownloadButton;
