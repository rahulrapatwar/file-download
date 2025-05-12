import { render, screen, fireEvent } from "@testing-library/react";
import FileTable from "../FileTable";
import type { FileData } from "../../types";

const mockAlert = jest.fn();
window.alert = mockAlert;

describe("FileTable", () => {
  const mockData: FileData[] = [
    {
      name: "Test File 1",
      device: "Device 1",
      path: "/path/to/file1",
      status: "available",
    },
    {
      name: "Test File 2",
      device: "Device 2",
      path: "/path/to/file2",
      status: "scheduled",
    },
  ];

  beforeEach(() => {
    mockAlert.mockClear();
  });

  it("renders table with correct headers", () => {
    render(<FileTable data={mockData} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all file data correctly", () => {
    render(<FileTable data={mockData} />);

    mockData.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.getByText(file.device)).toBeInTheDocument();
      expect(screen.getByText(file.path)).toBeInTheDocument();
      expect(
        screen.getByText(
          file.status.charAt(0).toUpperCase() + file.status.slice(1)
        )
      ).toBeInTheDocument();
    });
  });

  it("shows correct initial selection state", () => {
    render(<FileTable data={mockData} />);

    expect(screen.getByText("None Selected")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download selected/i })
    ).toBeDisabled();
  });

  it("allows selecting available files", () => {
    render(<FileTable data={mockData} />);

    // Click the row for the first file (available)
    const row = screen.getByText("Test File 1").closest("tr");
    fireEvent.click(row!);

    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download selected/i })
    ).not.toBeDisabled();
  });

  it("disables selection for unavailable files", () => {
    render(<FileTable data={mockData} />);

    const checkboxes = screen.getAllByRole("checkbox");
    const unavailableCheckbox = checkboxes[2]; // Second file is scheduled
    expect(unavailableCheckbox).toBeDisabled();
  });

  it("handles select all functionality", () => {
    render(<FileTable data={mockData} />);

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(selectAllCheckbox);

    expect(screen.getByText("Selected 1")).toBeInTheDocument();
  });

  it("shows download alert with correct file details", () => {
    render(<FileTable data={mockData} />);

    // Select first file by clicking the row
    const row = screen.getByText("Test File 1").closest("tr");
    fireEvent.click(row!);

    // Click download button
    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    });
    fireEvent.click(downloadButton);

    // Check alert content
    expect(mockAlert).toHaveBeenCalledWith(
      expect.stringContaining("/path/to/file1")
    );
    expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining("Device 1"));
  });

  it("updates selection count when deselecting items", () => {
    render(<FileTable data={mockData} />);

    // Select first file by clicking the row
    const row = screen.getByText("Test File 1").closest("tr");
    fireEvent.click(row!);

    // Deselect the file by clicking the row again
    fireEvent.click(row!);

    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("shows correct status indicators", () => {
    render(<FileTable data={mockData} />);

    // Check for available status indicator
    const availableStatus = screen.getAllByText("Available")[0];
    expect(availableStatus.parentElement).toHaveClass("flex", "items-center");
    expect(availableStatus.parentElement?.querySelector("div")).toHaveClass(
      "w-4",
      "h-4",
      "bg-[#B9DE92]",
      "rounded-full",
      "mr-2"
    );

    // Check for scheduled status indicator
    const scheduledStatus = screen.getAllByText("Scheduled")[0];
    expect(scheduledStatus.parentElement).toHaveClass("flex", "items-center");
    expect(scheduledStatus.parentElement?.querySelector("div")).toHaveClass(
      "pl-4"
    );
  });
});
