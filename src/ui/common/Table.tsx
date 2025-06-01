import type { ReactNode, TableHTMLAttributes } from 'react';
import styled from '@utils/styled';

type TableRowObject = {
  [key: string]: ReactNode;
};

type TableProps = {
  data: {
    headers?: string[];
    rows: TableRowObject[];
  };
} & TableHTMLAttributes<HTMLTableElement>;

const TableRoot = styled.table({
  width: '100%',
  borderCollapse: 'collapse',

  ['&, td, th']: {
    border: '1px solid black',
  },

  ['td, th']: {
    padding: '8px',
  },
});

const Table = (props: TableProps) => {
  const { data } = props;

  return (
    <TableRoot>
      {data.headers && (
        <thead>
          <tr>
            {data.headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
      )}

      <tbody>
        {data.rows.map((row, index) => {
          return (
            <tr key={index}>
              {Object.keys(row).map((key, index) => {
                return <td key={index}>{row[key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </TableRoot>
  );
};

export default Table;
