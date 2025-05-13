import { render, screen } from "@testing-library/react";
import { Table } from "../Table";
import type { TableColumn } from "../../types/table";

interface TestData {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

describe("Table", () => {
  const mockData: TestData[] = [
    {
      name: "Item 1",
      device: "Device 1",
      path: "/path/to/item1",
      status: "available",
    },
    {
      name: "Item 2",
      device: "Device 2",
      path: "/path/to/item2",
      status: "scheduled",
    },
  ];

  const mockColumns: TableColumn<TestData>[] = [
    { key: "name", header: "Name" },
    { key: "device", header: "Device" },
    { key: "path", header: "Path" },
    {
      key: "status",
      header: "Status",
      render: (item: TestData) => item.status,
    },
  ];

  const mockOnRowClick = jest.fn();

  it("renders table with data correctly", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        onRowClick={mockOnRowClick}
        selectedItems={new Set()}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Device 2")).toBeInTheDocument();
    expect(screen.getByText("/path/to/item1")).toBeInTheDocument();
    expect(screen.getByText("/path/to/item2")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();
    expect(screen.getByText("scheduled")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        onRowClick={mockOnRowClick}
        selectedItems={new Set()}
      />
    );

    const table = screen.getByRole("grid");
    expect(table).toHaveClass("w-3/4", "border", "border-gray-400");
  });

  it("renders as a table element", () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        onRowClick={mockOnRowClick}
        selectedItems={new Set()}
      />
    );

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
