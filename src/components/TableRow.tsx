import type { TableRowProps } from "../types/table";

export function TableRow<T>({
  item,
  columns,
  isSelected = false,
  onClick,
  isSelectable = true,
  index,
}: TableRowProps<T>) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (isSelectable) {
          e.preventDefault();
          onClick?.();
        }
        break;
      case " ":
        if (isSelectable) {
          e.preventDefault();
          onClick?.();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevRow = document.querySelector(
          `tr[data-index="${index - 1}"]`
        ) as HTMLElement;
        if (prevRow) prevRow.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        const nextRow = document.querySelector(
          `tr[data-index="${index + 1}"]`
        ) as HTMLElement;
        if (nextRow) nextRow.focus();
        break;
    }
  };

  return (
    <tr
      role="row"
      tabIndex={0}
      aria-selected={isSelected}
      data-index={index}
      className={`border border-gray-400 cursor-pointer text-sm outline-none focus-visible:border-2 focus-visible:border-black ${
        isSelected ? "bg-[#EEEEEE]" : "hover:bg-[#F5F5F5]"
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <td className="px-4 py-2" role="cell">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          disabled={!isSelectable}
          className="w-4 h-4"
          aria-label={`Select ${(item as any).name || "row"}`}
        />
      </td>
      {columns.map((column) => (
        <td key={column.key} className="px-4 py-2" role="cell">
          {column.render ? column.render(item) : (item as any)[column.key]}
        </td>
      ))}
    </tr>
  );
}
