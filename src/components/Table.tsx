import type { TableProps } from "../types/table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export function Table<T>({
  columns,
  data,
  onRowClick,
  selectedItems = new Set(),
  isItemSelectable,
}: TableProps<T>) {
  return (
    <div className="overflow-auto max-h-[600px]">
      <table
        className="w-3/4 border border-gray-400"
        role="grid"
        aria-multiselectable="true"
        aria-label="Data table with selectable rows"
      >
        <TableHeader<T> columns={columns} />
        <tbody>
          {data.map((item, index) => (
            <TableRow<T>
              key={index}
              item={item}
              columns={columns}
              isSelected={selectedItems.has(index)}
              onClick={() => onRowClick?.(index)}
              isSelectable={isItemSelectable ? isItemSelectable(item) : true}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
