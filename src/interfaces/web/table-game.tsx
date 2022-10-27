import Button from '@mui/material/Button';
import { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CellState } from '../../contants/cell-state-enum';
import { useTableGame } from './table-provider';

export default function TableGame(): JSX.Element {
  const { setTable, table } = useTableGame();

  const tableCalculations = useMemo(() => {
    if (!table) {
      return undefined;
    }

    const maxColLength = Math.max(
      ...table.columnValues.map((arr) => arr.length),
    );

    const maxRowLength = Math.max(...table.rowValues.map((arr) => arr.length));

    const colGroupValueCells = Array.from({ length: maxColLength }, (_, i) =>
      table.columnValues.map((arr) => {
        const indexToPrint = i - (maxColLength - arr.length);
        return indexToPrint >= 0 ? arr[indexToPrint] : undefined;
      }),
    );

    const rowGroupValueCells = Array.from(
      { length: table.rowValues.length },
      (_, i) =>
        Array.from(
          { length: maxRowLength - table.rowValues[i].length },
          () => undefined as undefined | number,
        ).concat(table.rowValues[i]),
    );

    return {
      ...table,
      colGroupValueCells,
      rowGroupValueCells,
      maxColLength,
      maxRowLength,
    };
  }, [table]);

  return tableCalculations != null ? (
    <div>
      <Button onClick={() => setTable(undefined)}>Back</Button>
      <Button
        onClick={() => {
          tableCalculations.setCell(0, 0, CellState.FILLED);
        }}
      >
        Fill
      </Button>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              rowSpan={tableCalculations.maxColLength}
              colSpan={tableCalculations.maxRowLength}
            >
              &nbsp;
            </TableCell>
            {tableCalculations.colGroupValueCells[0].map((cell) =>
              cell != null ? (
                <TableCell>{cell}</TableCell>
              ) : (
                <TableCell>&nbsp;</TableCell>
              ),
            )}
          </TableRow>
          {tableCalculations.colGroupValueCells.slice(1).map((cells, index) => (
            <TableRow key={index}>
              {cells.map((cell) =>
                cell != null ? (
                  <TableCell>{cell}</TableCell>
                ) : (
                  <TableCell>&nbsp;</TableCell>
                ),
              )}
            </TableRow>
          ))}
          {tableCalculations.state.map((cells, index) => (
            <TableRow key={index}>
              {tableCalculations.rowGroupValueCells[index].map(
                (cell, index) => (
                  <TableCell key={index}>{cell ?? <>&nbsp;</>}</TableCell>
                ),
              )}
              {cells.map((_, index) => (
                <TableCell key={index}>&nbsp;</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div>Error, no table to show</div>
  );
}
