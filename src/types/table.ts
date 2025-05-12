export interface TableColumn {
    key: string;
    header: string;
}

export interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
}

export interface TableRowProps<T> {
  item: T;
  columns: TableColumn[];
  isSelected?: boolean;
  onClick?: () => void;
  isSelectable?: boolean;
}

export interface TableHeaderProps {
  columns: TableColumn[];
} 