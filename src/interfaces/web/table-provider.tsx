import { createContext, ReactNode, useReducer, useContext } from 'react';
import { Table } from '../../components/table/table';
import { CellState } from '../../contants/cell-state-enum';

const enum TableActions {
  SET_TABLE = 'SET_TABLE',
  SET_CELL = 'SET_CELL',
  RESET_TABLE = 'RESET_TABLE',
}

const tableActions = {
  resetTable: () => ({
    type: TableActions.RESET_TABLE as const,
  }),
  setCell: (row: number, col: number, state: CellState) => ({
    type: TableActions.SET_CELL as const,
    payload: {
      row,
      col,
      state,
    },
  }),
  setTable: (table: Table | undefined) => ({
    type: TableActions.SET_TABLE as const,
    payload: {
      table,
    },
  }),
};

type TableActionTypes = ReturnType<
  typeof tableActions[keyof typeof tableActions]
>;

interface TableState {
  table: Table | undefined;
}

const tableReducer = (
  state: TableState,
  action: TableActionTypes,
): TableState => {
  switch (action.type) {
    case TableActions.RESET_TABLE:
      return {
        table:
          state.table != null
            ? new Table(state.table.rowValues, state.table.columnValues)
            : undefined,
      };
    case TableActions.SET_CELL:
      return {
        table: state.table?.setCell(
          action.payload.row,
          action.payload.col,
          action.payload.state,
        ),
      };
    case TableActions.SET_TABLE:
      return {
        table: action.payload.table,
      };
    default:
      return state;
  }
};

interface TableContextType {
  table?: {
    state: CellState[][];
    rowValues: number[][];
    columnValues: number[][];
    selectedCell: [number, number] | undefined;
    setCell: (row: number, col: number, state: CellState) => void;
    resetTable: () => void;
  };
  setTable: (table: Table | undefined) => void;
}

export const tableContext = createContext<TableContextType>({
  setTable: () => {},
});

export const useTableGame = (): TableContextType => {
  return useContext(tableContext);
};

export default function TableProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [tableState, dispatch] = useReducer(tableReducer, { table: undefined });
  return (
    <tableContext.Provider
      value={{
        setTable: (table) => dispatch(tableActions.setTable(table)),
        table:
          tableState.table != null
            ? {
                columnValues: tableState.table.columnValues,
                rowValues: tableState.table.rowValues,
                selectedCell: tableState.table.selectedCell,
                state: tableState.table.state,
                resetTable: () => dispatch(tableActions.resetTable()),
                setCell: (row, col, state) =>
                  dispatch(tableActions.setCell(row, col, state)),
              }
            : undefined,
      }}
    >
      {children}
    </tableContext.Provider>
  );
}
