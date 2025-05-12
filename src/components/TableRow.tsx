import type { TableRowProps } from '../types/table';

export function TableRow<T>({ 
  item,
  columns,
  isSelected = false
}: TableRowProps<T>) {
  return (
    <tr 
      className={`border border-gray-400 cursor-pointer text-sm hover:bg-[#F5F5F5]`}
    >
      <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          className="w-4 h-4"
        />
      </td>
      {columns.map((column) => (
        <td key={column.key} className="px-4 py-2">
          {(item as any)[column.key]}
        </td>
      ))}
    </tr>
  );
}
