import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TableContext } from './table-context';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TableContext.Provider value={undefined}>
      <App />
    </TableContext.Provider>
  </React.StrictMode>,
);
