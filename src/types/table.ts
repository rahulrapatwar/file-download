export interface TableColumn {
    key: string;
    header: string;
}

export interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  onRowClick?: (index: number) => void;
  selectedItems?: Set<number>;
  isItemSelectable?: (item: T) => boolean;
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