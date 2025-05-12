import { useState } from "react";
interface UseTableSelectionProps<T> {
  data: T[];
  isItemSelectable: (item: T) => boolean;
}

interface UseTableSelectionReturn {
  selectedItems: Set<number>;
  isAllSelected: boolean;
  toggleSelect: (index: number) => void;
}

export function useTableSelection<T>({
  data,
  isItemSelectable,
}: UseTableSelectionProps<T>): UseTableSelectionReturn {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const availableItems = data.reduce((acc, item, index) => {
    if (isItemSelectable(item)) {
      acc[index] = item;
    }
    return acc;
  }, {} as Record<number, T>);

  const toggleSelect = (index: number) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }

      const availableCount = Object.keys(availableItems).length;
      if (newSelected.size === availableCount) {
        setIsAllSelected(true);
      } else {
        setIsAllSelected(false);
      }

      return newSelected;
    });
  };
  return {
    selectedItems,
    isAllSelected,
    toggleSelect,
  };
}
