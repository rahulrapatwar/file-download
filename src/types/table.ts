export interface TableColumn {
    key: string;
    header: string;
}

export interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
}

export interface TableHeaderProps {
  columns: TableColumn[];
} 