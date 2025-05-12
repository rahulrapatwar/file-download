import type { TableProps } from '../types/table';

export function Table<T>({ 
  columns, 
  data, 
}: TableProps<T>) {
  return (
    <div>
      <table className="w-3/4 border border-gray-400">
        <th>
            {/* TODO */}
        </th>
        <tbody>
          {/* TODO */}
        </tbody>
      </table>
    </div>
  );
}
