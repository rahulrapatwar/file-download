import React from "react";
import { Table } from "./Table";
import DownloadButton from "./DownloadButton";
import { useTableSelection } from "../hooks/useTableSelection";
import type { FileData } from "../types";
import type { TableColumn } from "../types/table";

interface FileTableProps {
  data: FileData[];
}

const FileTable: React.FC<FileTableProps> = ({ data }) => {
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

  const columns: TableColumn<FileData>[] = [
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
      render: (item) => (
        <div className="flex items-center">
          {item.status === "available" ? (
            <>
              <div
                className="w-4 h-4 bg-[#B9DE92] rounded-full mr-2"
                aria-hidden="true"
              ></div>
              <div>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
            </>
          ) : (
            <div className="pl-4">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </div>
          )}
        </div>
      ),
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
    <div className="p-3" role="region" aria-label="File selection and download">
      <div className="flex items-center m-3 text-lg">
        <span className="w-4">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="w-4 h-4"
            ref={selectAllRef}
            aria-label="Select all available files"
          />
        </span>
        <span className="w-38 p-3" aria-live="polite">
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

export default FileTable;
