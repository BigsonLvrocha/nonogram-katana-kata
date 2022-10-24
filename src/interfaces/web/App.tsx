import { tables } from '../../contants/table-definitions';
import { Table } from '../../components/table/table';
import { table2String } from '../../components/table-console-printer/table-printer';

export default function App(): JSX.Element {
  const table = new Table(tables.airplane.rows, tables.airplane.columns);
  const tableStr = table2String(table);
  return <pre>{tableStr}</pre>;
}
