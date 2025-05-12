export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (index: number) => void;
  selectedItems?: Set<number>;
  isItemSelectable?: (item: T) => boolean;
}

export interface TableRowProps<T> {
  item: T;
  columns: TableColumn<T>[];
  isSelected?: boolean;
  onClick?: () => void;
  isSelectable?: boolean;
}

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
} 