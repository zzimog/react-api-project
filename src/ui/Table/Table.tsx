import { Button } from '../Button/Button';

export type TableRow = {
  [key: string]: unknown;
};

export type TableAction = {
  label: string;
  icon: string;
  action: (row: TableRow, index: number) => void;
};

export type TableProps = {
  headers?: Array<string>;
  rows?: Array<TableRow>;
  actions?: Array<TableAction>;
};

export const Table = (inProps: TableProps) => {
  const { headers = [], rows = [], actions = [] } = inProps;

  return (
    <table>
      {headers.length > 0 && (
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={`h_${index}`}>{head}</th>
            ))}

            <th colSpan={actions.length}>actions</th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {Object.values(row).map((value, index) => {
                if (typeof value === 'boolean') {
                  value = value ? 'true' : 'false';
                } else if (typeof value === 'object') {
                  value = <pre>{JSON.stringify(value, null, '  ')}</pre>;
                }

                return <td key={index}>{value}</td>;
              })}
              {actions.map((action, index) => {
                return (
                  <td key={index}>
                    <Button
                      icon={action.icon}
                      label={action.label}
                      size="sm"
                      onClick={() => action.action(row, rowIndex)}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
