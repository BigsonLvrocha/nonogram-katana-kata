import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';
import { useTableGame } from './table-provider';
import TableCell from './components/table-cell';
import HeaderCellLine from './components/header-cell-line';

const HeaderCell = styled(MuiTableCell)`
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 0;
  height: 2rem;
  width: 2rem;

  text-align: center;
`;

const BorderCell = styled(HeaderCell)`
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 0;
  height: 2rem;
  width: 2rem;

  text-align: center;
  background-image: linear-gradient(
    to left bottom,
    transparent calc(50% - 1px),
    black,
    transparent calc(50% + 1px)
  );
`;

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

    const width = maxRowLength + table.columnValues.length;
    const heigth = maxColLength + table.rowValues.length;

    return {
      ...table,
      colGroupValueCells,
      rowGroupValueCells,
      maxColLength,
      maxRowLength,
      width,
      heigth,
    };
  }, [table]);

  return tableCalculations != null ? (
    <div>
      <Button onClick={() => setTable(undefined)}>Back</Button>
      <Table
        style={{
          height: `${tableCalculations.heigth}rem`,
          width: `${tableCalculations.width}rem`,
        }}
      >
        <TableBody>
          <TableRow>
            <BorderCell
              rowSpan={tableCalculations.maxColLength}
              colSpan={tableCalculations.maxRowLength}
            >
              &nbsp;
            </BorderCell>
            <HeaderCellLine cells={tableCalculations.colGroupValueCells[0]} />
          </TableRow>
          {tableCalculations.colGroupValueCells.slice(1).map((cells, index) => (
            <TableRow key={index}>
              <HeaderCellLine cells={cells} />
            </TableRow>
          ))}
          {tableCalculations.state.map((cells, rowIndex) => (
            <TableRow key={rowIndex}>
              <HeaderCellLine
                cells={tableCalculations.rowGroupValueCells[rowIndex]}
              />
              {cells.map((cell, colIndex) => (
                <TableCell
                  key={colIndex}
                  cell={cell}
                  onChange={(newState) =>
                    tableCalculations.setCell(rowIndex, colIndex, newState)
                  }
                  disabled={tableCalculations.finished}
                />
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
