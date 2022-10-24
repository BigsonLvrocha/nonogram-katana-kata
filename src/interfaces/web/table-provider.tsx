import { createContext, useState, Dispatch, ReactNode } from 'react';
import { Table } from '../../components/table/table';

interface TableContextType {
  table?: Table;
  setTable: Dispatch<React.SetStateAction<Table | undefined>>;
}

const TableContext = createContext<TableContextType>({
  setTable: () => {},
});

export default function TableProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [table, setTable] = useState<Table | undefined>(undefined);
  return (
    <TableContext.Provider value={{ table, setTable }}>
      {children}
    </TableContext.Provider>
  );
}
