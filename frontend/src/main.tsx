import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './lib/routes';
import { RouterProvider } from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
