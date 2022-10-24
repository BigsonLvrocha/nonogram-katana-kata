import { createContext } from 'react';
import { Table } from '../../components/table/table';

export const TableContext = createContext<Table | undefined>(undefined);
