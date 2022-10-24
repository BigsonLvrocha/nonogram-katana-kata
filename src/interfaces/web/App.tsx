import { tableContext } from './table-provider';
import { useContext } from 'react';
import { TableSelection } from './table-selection';
import TableGame from './table-game';

export default function App(): JSX.Element {
  const { table } = useContext(tableContext);
  return table != null ? <TableGame /> : <TableSelection />;
}
