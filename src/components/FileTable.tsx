import React from "react";
import type { FileData } from "../types";

interface FileTableProps {
  data: FileData[];
}

export const FileTable: React.FC<FileTableProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div>{item.path}</div>
      ))}
    </div>
  );
};
