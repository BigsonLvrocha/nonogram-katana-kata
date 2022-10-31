import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { tableContext } from './table-provider';
import { tables } from '../../constants/table-definitions';
import { Table } from '../../components/table/table';

export function TableSelection(): JSX.Element {
  const { setTable } = useContext(tableContext);

  return (
    <List>
      {Object.entries(tables).map(([tableName, definition]) => (
        <ListItemButton
          key={tableName}
          onClick={() =>
            setTable(new Table(definition.rows, definition.columns))
          }
        >
          <ListItemText primary={tableName} />
        </ListItemButton>
      ))}
    </List>
  );
}
