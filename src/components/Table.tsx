import type { TableProps } from '../types/table';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export function Table<T>({ 
  columns, 
  data, 
  onRowClick, 
  selectedItems = new Set(),
  isItemSelectable
}: TableProps<T>) {
  return (
    <div>
      <table className="w-3/4 border border-gray-400">
        <TableHeader
          columns={columns}
        />
        <tbody>
          {data.map((item, index) => (
            <TableRow<T>
              key={index}
              item={item}
              columns={columns}
              isSelected={selectedItems.has(index)}
              onClick={() => onRowClick?.(index)}
              isSelectable={isItemSelectable ? isItemSelectable(item) : true}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
