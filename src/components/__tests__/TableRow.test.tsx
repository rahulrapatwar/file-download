import { render, screen, fireEvent } from "@testing-library/react";
import { TableRow } from "../TableRow";
import type { TableColumn } from "../../types/table";

interface TestData {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

describe("TableRow", () => {
  const mockItem: TestData = {
    name: "Test Item",
    device: "Device 1",
    path: "/path/to/item",
    status: "available",
  };
  const mockColumns: TableColumn<TestData>[] = [
    { key: "name", header: "Name" },
    {
      key: "device",
      header: "Device",
    },
    { key: "path", header: "Path" },
    {
      key: "status",
      header: "Status",
      render: (item: TestData) => item.status,
    },
  ];
  const noop = () => {};

  it("renders row with correct data", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("/path/to/item")).toBeInTheDocument();
    expect(screen.getByText("available")).toBeInTheDocument();
  });

  it("renders checkbox when isSelectable is true", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            isSelectable={true}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeDisabled();
  });

  it("disables checkbox when isSelectable is false", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            isSelectable={false}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("applies selected styles when isSelected is true", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            isSelected={true}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const row = screen.getByText("Test Item").closest("tr");
    expect(row).toHaveClass("bg-[#EEEEEE]");
  });

  it("applies hover styles when isSelected is false", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            isSelected={false}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const row = screen.getByText("Test Item").closest("tr");
    expect(row).toHaveClass("hover:bg-[#F5F5F5]");
  });

  it("has correct checkbox styling", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("w-4", "h-4");
  });

  it("calls onClick when checkbox is changed", () => {
    const mockOnClick = jest.fn();
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            onClick={mockOnClick}
            index={0}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("has correct data-index attribute", () => {
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            onClick={noop}
            index={0}
          />
        </tbody>
      </table>
    );

    const row = screen.getByText("Test Item").closest("tr");
    expect(row).toHaveAttribute("data-index", "0");
  });

  it("handles keyboard navigation", () => {
    const mockOnClick = jest.fn();
    render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            columns={mockColumns}
            onClick={mockOnClick}
            index={0}
          />
        </tbody>
      </table>
    );

    const row = screen.getByText("Test Item").closest("tr");

    // Test Space key
    fireEvent.keyDown(row!, { key: " " });
    expect(mockOnClick).toHaveBeenCalled();

    // Test Enter key
    fireEvent.keyDown(row!, { key: "Enter" });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
