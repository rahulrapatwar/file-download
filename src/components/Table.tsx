import type { TableProps } from '../types/table';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

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
          {data.map((item, index) => (
            <TableRow<T>
              key={index}
              item={item}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
