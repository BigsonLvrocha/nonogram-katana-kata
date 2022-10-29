import styled from '@emotion/styled';
import MuiTableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { CellState } from '../../../contants/cell-state-enum';

const EmptyCell = styled(MuiTableCell)`
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 0;

  height: 2rem;
  width: 2rem;
`;

const ButtonWrapper = styled.div`
  height: 2rem;
  width: 2rem;

  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const ToggleButton = styled(Button)`
  border-radius: 0;
  padding: 0;
  min-width: 0;
  height: 2rem;
  width: 2rem;

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
      <ButtonWrapper>
        <buttonData.component onClick={() => onChange(buttonData.nextState)}>
          &nbsp;
        </buttonData.component>
      </ButtonWrapper>
    </EmptyCell>
  );
}
