import styled from '@emotion/styled';
import MuiTableCell from '@mui/material/TableCell';
import CellContentWrapper from './cell-content-wrapper';

const HeaderCell = styled(MuiTableCell)`
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 0;
  height: 2rem;
  width: 2rem;

  text-align: center;
`;

interface HeaderCellLineProps {
  cells: Array<number | undefined>;
}

export default function HeaderCellLine(
  props: HeaderCellLineProps,
): JSX.Element {
  return (
    <>
      {props.cells.map((cell, index) => (
        <HeaderCell key={index}>
          <CellContentWrapper>{cell ?? <>&nbsp;</>}</CellContentWrapper>
        </HeaderCell>
      ))}
    </>
  );
}
