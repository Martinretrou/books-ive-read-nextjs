/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useTable, useSortBy } from 'react-table';

import 'react-day-picker/lib/style.css';

import styles from '@/styles/BookTable.module.css';

type BookTableProps = {
  columns: any;
  data: any;
};

const BookTable = ({ columns, data }: BookTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sortBy: [
          {
            id: `readIn`,
            desc: true,
          },
        ],
      },
    },
    useSortBy,
  );

  // Render the UI for your table
  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className={styles.th}
                {...column.getHeaderProps(
                  (column as any).getSortByToggleProps(),
                )}
              >
                {column.render(`Header`)}
                <span>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {(column as any)?.isSorted
                    ? (column as any)?.isSortedDesc
                      ? ` 🔽`
                      : ` 🔼`
                    : ``}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className={styles.tr} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td className={styles.td} {...cell.getCellProps()}>
                  {cell.render(`Cell`)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookTable;
