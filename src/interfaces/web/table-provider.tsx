import { createContext, useState, Dispatch, ReactNode } from 'react';
import { Table } from '../../components/table/table';

interface TableContextType {
  table?: Table;
  setTable: Dispatch<React.SetStateAction<Table | undefined>>;
}

export const tableContext = createContext<TableContextType>({
  setTable: () => {},
});

export default function TableProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [table, setTable] = useState<Table | undefined>(undefined);
  return (
    <tableContext.Provider value={{ table, setTable }}>
      {children}
    </tableContext.Provider>
  );
}
