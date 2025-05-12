import React from "react";
import type { FileData } from "../types";
import DownloadButton from "./DownloadButton";

interface FileTableProps {
  data: FileData[];
}

export const FileTable: React.FC<FileTableProps> = ({ data }) => {

  const handleDownload = () => {
    //TODO
  };
  return (
    <div className="p-3">
      <div className="flex items-center m-3 text-lg">
        <span className="w-4">
          <input type="checkbox" className="w-4 h-4" />
        </span>
        <span className="w-38 p-3">Selected</span>
        <span>
          <DownloadButton onClick={handleDownload} isDisabled={false} />
        </span>
      </div>
    </div>
  );
};
