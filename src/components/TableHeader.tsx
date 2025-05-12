import type { TableHeaderProps } from '../types/table';

export function TableHeader({ 
  columns, 
}: TableHeaderProps) {
  return (
    <thead className="border border-gray-400">
      <tr>
        <th className="px-4 py-2 w-1/25">
          {null}
        </th>
        {columns.map((column) => (
          <th 
            key={column.key} 
            className="text-left px-4 py-2 font-medium"
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
