import type { ReactNode, TableHTMLAttributes } from 'react';
import clsx from 'clsx';
import styled from '../styled';

export type TableRowObject = {
  [key: string]: ReactNode;
};

export type TableProps = {
  data: {
    headers?: string[];
    rows: TableRowObject[];
  };
} & TableHTMLAttributes<HTMLTableElement>;

// #444CF7
const TableRoot = styled.div({
  paddingBottom: '16px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '5px 5px 100px rgba(68, 77, 247, 0.2)',

  [`table`]: {
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',

    [`tr.odd`]: {
      background: 'rgb(240, 240, 240)',
    },

    [`td, th`]: {
      padding: '16px',
      textAlign: 'left',

      [`&.first`]: {
        paddingLeft: '32px',
      },

      [`&.last`]: {
        paddingRight: '32px',
      },
    },
  },
});

export const Table = (props: TableProps) => {
  const { data, ...rest } = props;

  return (
    <TableRoot {...rest}>
      <table>
        {data.headers && (
          <thead>
            <tr>
              {data.headers.map((header, index, { length }) => {
                return (
                  <th
                    key={index}
                    className={clsx({
                      first: index === 0,
                      last: index === length - 1,
                    })}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}

        <tbody>
          {data.rows.map((row, index) => {
            const cls = (index + 1) % 2 ? 'odd' : 'even';

            return (
              <tr key={index} className={cls}>
                {Object.keys(row).map((key, index, { length }) => {
                  return (
                    <td
                      key={index}
                      className={clsx({
                        first: index === 0,
                        last: index === length - 1,
                      })}
                    >
                      {row[key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableRoot>
  );
};

export default Table;
