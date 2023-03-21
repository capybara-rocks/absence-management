import { ComponentType } from 'react';
import DataGridItem from '../data-grid-item/DataGridItem';

export type DataRow = {
  id: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string, any>;

export interface DataGridColumn<T extends DataRow> {
  field: keyof T;
  headerName: string;
  value?: (item: T) => string;
}

export interface DataGridProps<T extends DataRow> {
  title: string;
  columns: DataGridColumn<T>[];
  rows?: T[];
  detailsComponent: ComponentType<DataRow>;
}

export function DataGrid<T extends DataRow>({
  title,
  columns,
  rows,
  detailsComponent,
}: DataGridProps<T>) {
  return (
    <div>
      <h2 className="text-primary-500 mb-4 text-center text-2xl font-bold">
        {title}
      </h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              {columns.map(({ headerName }) => (
                <th key={headerName} scope="col" className="px-6 py-3">
                  {headerName}
                </th>
              ))}
            </tr>
          </thead>
          {rows && (
            <tbody>
              {rows.map((r) => {
                return (
                  <DataGridItem
                    key={r.id}
                    columns={columns}
                    row={r}
                    detailsComponent={detailsComponent}
                  ></DataGridItem>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default DataGrid;
