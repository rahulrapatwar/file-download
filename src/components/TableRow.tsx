import type { TableRowProps } from '../types/table';

export function TableRow<T>({ 
  item, 
  columns, 
  isSelected = false, 
  onClick,
  isSelectable = true
}: TableRowProps<T>) {
  return (
    <tr 
      className={`border border-gray-400 cursor-pointer text-sm ${isSelected ? 'bg-[#EEEEEE]' : 'hover:bg-[#F5F5F5]'}`}
      onClick={onClick}
    >
      <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          disabled={!isSelectable}
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
