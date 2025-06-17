import type { HTMLAttributes, ReactNode } from 'react';
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
} & HTMLAttributes<HTMLElement>;

const TableRoot = styled.div({
  paddingBottom: '8px',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '5px 5px 20px rgba(68, 77, 247, 0.1)',

  [`& > p`]: {
    display: 'block',
    padding: '16px 16px 8px',
    textAlign: 'center',
  },

  [`table`]: {
    width: '100%',
    borderCollapse: 'collapse',
    borderBottom: '1px solid #f0f0f0',
    overflow: 'hidden',

    [`tr.odd`]: {
      background: '#f0f0f0',
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

  if (!data.rows.length) {
    return (
      <TableRoot>
        <p>No data.</p>
      </TableRoot>
    );
  }

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
          {data.rows.map((row, index) => (
            <tr key={index} className={(index + 1) % 2 ? 'odd' : 'even'}>
              {Object.keys(row).map((key, index, { length }) => (
                <td
                  key={index}
                  className={clsx({
                    first: index === 0,
                    last: index === length - 1,
                  })}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableRoot>
  );
};

export default Table;
