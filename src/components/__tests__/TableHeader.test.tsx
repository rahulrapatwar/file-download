import { render, screen } from "@testing-library/react";
import { TableHeader } from "../TableHeader";
import type { TableColumn } from "../../types/table";

interface TestData {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

describe("TableHeader", () => {
  const mockColumns: TableColumn<TestData>[] = [
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

  it("renders all column headers correctly", () => {
    render(
      <table>
        <TableHeader columns={mockColumns} />
      </table>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
