import React from "react";
import type { FileData } from "../types";
import type { TableColumn } from "../types/table";
import DownloadButton from "./DownloadButton";
import { Table } from "./Table";
import { useTableSelection } from "../hooks/useTableSelection";

interface FileTableProps {
  data: FileData[];
}

export const FileTable: React.FC<FileTableProps> = ({ data }) => {
  const isItemSelectable = (item: FileData) => item.status === "available";

  const {
    selectedItems,
    isAllSelected,
    toggleSelect,
    handleSelectAll,
    selectAllRef,
  } = useTableSelection<FileData>({
    data,
    isItemSelectable,
  });

  const columns: TableColumn[] = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "device",
      header: "Device",
    },
    {
      key: "path",
      header: "Path",
    },
    {
      key: "status",
      header: "Status",
    },
  ];
  const handleDownload = () => {
    const selectedFiles = Array.from(selectedItems).map((index) => data[index]);
    const fileDetails = selectedFiles
      .map((file) => `Path: ${file.path}, Device: ${file.device}`)
      .join("\n");
    alert(fileDetails);
  };
  return (
    <div className="p-3">
      <div className="flex items-center m-3 text-lg">
        <span className="w-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={isAllSelected}
            onChange={handleSelectAll}
            ref={selectAllRef}
          />
        </span>
        <span className="w-38 p-3">
          {selectedItems.size
            ? `Selected ${selectedItems.size}`
            : "None Selected"}
        </span>
        <span>
          <DownloadButton
            onClick={handleDownload}
            isDisabled={selectedItems.size === 0}
          />
        </span>
      </div>

      <Table<FileData>
        columns={columns}
        data={data}
        selectedItems={selectedItems}
        onRowClick={(index) => {
          if (isItemSelectable(data[index])) {
            toggleSelect(index);
          }
        }}
        isItemSelectable={isItemSelectable}
      />
    </div>
  );
};
