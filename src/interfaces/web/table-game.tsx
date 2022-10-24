import Button from '@mui/material/Button';
import { rawTable2String } from '../../components/table-console-printer/table-printer';
import { CellState } from '../../contants/cell-state-enum';
import { useTableGame } from './table-provider';

export default function TableGame(): JSX.Element {
  const { setTable, table } = useTableGame();

  return table != null ? (
    <div>
      <Button onClick={() => setTable(undefined)}>Back</Button>
      <Button
        onClick={() => {
          table.setCell(0, 0, CellState.FILLED);
        }}
      >
        Fill
      </Button>
      <pre>{table != null ? rawTable2String(table) : null}</pre>
    </div>
  ) : (
    <div>Error, no table to show</div>
  );
}
