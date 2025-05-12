import { render, screen, fireEvent } from "@testing-library/react";
import DownloadButton from "../DownloadButton";

describe("DownloadButton", () => {
  it("renders correctly", () => {
    render(<DownloadButton onClick={() => {}} isDisabled={false} />);
    expect(screen.getByText("Download Selected")).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", () => {
    const handleClick = jest.fn();
    render(<DownloadButton onClick={handleClick} isDisabled={false} />);

    fireEvent.click(screen.getByText("Download Selected"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<DownloadButton onClick={handleClick} isDisabled={true} />);

    fireEvent.click(screen.getByText("Download Selected"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has disabled styles when isDisabled is true", () => {
    render(<DownloadButton onClick={() => {}} isDisabled={true} />);
    const button = screen.getByText("Download Selected");
    expect(button).toHaveClass("disabled:opacity-50");
    expect(button).toHaveClass("bg-gray-300");
  });

  it("has enabled styles when isDisabled is false", () => {
    render(<DownloadButton onClick={() => {}} isDisabled={false} />);
    const button = screen.getByText("Download Selected");
    expect(button).toHaveClass("bg-white");
  });
});
