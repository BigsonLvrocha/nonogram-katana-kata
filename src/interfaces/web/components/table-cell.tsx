import styled from '@emotion/styled';
import MuiTableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { CellState } from '../../../contants/cell-state-enum';

const EmptyCell = styled(MuiTableCell)`
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 0;
  height: 1em;
  width: 1em;
`;

const ToggleButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 0;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const FilledButton = styled(ToggleButton)`
  background-color: black;

  &:hover {
    background-color: #1f1f1f;
  }
`;

const CrossedButton = styled(ToggleButton)`
  background-image: linear-gradient(
      to left bottom,
      transparent calc(50% - 1px),
      black,
      transparent calc(50% + 1px)
    ),
    linear-gradient(
      to left top,
      transparent calc(50% - 1px),
      black,
      transparent calc(50% + 1px)
    );
  &:hover {
    background-image: linear-gradient(
        to left bottom,
        transparent calc(50% - 1px),
        gray,
        transparent calc(50% + 1px)
      ),
      linear-gradient(
        to left top,
        transparent calc(50% - 1px),
        gray,
        transparent calc(50% + 1px)
      );
    background-color: white;
  }
`;

interface TableCellProps {
  onChange: (state: CellState) => void;
  cell: CellState;
}

const stateToCellMap = {
  [CellState.EMPTY]: {
    component: CrossedButton,
    nextState: CellState.UNKNOWN,
  },
  [CellState.FILLED]: {
    component: FilledButton,
    nextState: CellState.EMPTY,
  },
  [CellState.UNKNOWN]: {
    component: ToggleButton,
    nextState: CellState.FILLED,
  },
};

export default function TableCell({
  cell,
  onChange,
}: TableCellProps): JSX.Element {
  const buttonData = stateToCellMap[cell];
  return (
    <EmptyCell>
      <buttonData.component onClick={() => onChange(buttonData.nextState)}>
        &nbsp;
      </buttonData.component>
    </EmptyCell>
  );
}
