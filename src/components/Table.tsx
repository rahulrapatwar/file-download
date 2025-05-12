import type { TableProps } from '../types/table';
import { TableHeader } from './TableHeader';

export function Table<T>({ 
  columns, 
  data, 
}: TableProps<T>) {
  return (
    <div>
      <table className="w-3/4 border border-gray-400">
        <TableHeader
          columns={columns}
        />
        <tbody>
          {/* TODO */}
        </tbody>
      </table>
    </div>
  );
}
