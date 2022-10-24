import Button from '@mui/material/Button';
import { useContext } from 'react';
import { table2String } from '../../components/table-console-printer/table-printer';
import { tableContext } from './table-provider';

export default function TableGame(): JSX.Element {
  const { table, setTable } = useContext(tableContext);

  return (
    <div>
      <Button onClick={() => setTable(undefined)}>Back</Button>
      <pre>{table != null ? table2String(table) : null}</pre>
    </div>
  );
}
