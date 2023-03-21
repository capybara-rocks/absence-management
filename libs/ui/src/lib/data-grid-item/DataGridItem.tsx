import { useState } from 'react';
import { DataGridProps, DataRow } from '../data-grid/DataGrid';

export interface DataGridItemProps<T extends DataRow>
  extends Pick<DataGridProps<T>, 'columns' | 'detailsComponent'> {
  row: T;
}

export function DataGridItem<T extends DataRow>({
  row,
  columns,
  detailsComponent: DetailsComponent,
}: DataGridItemProps<T>) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);

  const showDetails = () => setIsDetailsShown(true);

  const hideDetails = () => setIsDetailsShown(false);

  const generateRow = (row: T) => {
    const result = [
      <td key="id" className="px-6 py-4">
        {row.id}
      </td>,
    ];

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const data = row[col.field];
      result.push(
        <td key={col.field as string} className="px-6 py-4">
          {typeof col.value === 'function' ? col.value(row) : data}
        </td>
      );
    }

    return result;
  };

  if (isDetailsShown)
    return (
      <tr onClick={hideDetails} className="cursor-pointer">
        <td colSpan={100} className="border-b-[1px] p-4">
          <DetailsComponent id={row.id}></DetailsComponent>
        </td>
      </tr>
    );

  return (
    <tr
      key={row.id}
      className="cursor-pointer border-b bg-white dark:border-gray-700 dark:bg-gray-800"
      onClick={showDetails}
    >
      {generateRow(row)}
    </tr>
  );
}

export default DataGridItem;
