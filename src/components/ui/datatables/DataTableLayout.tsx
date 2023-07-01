import React, { ReactNode } from 'react';

export const DataTableContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const DataTableHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const DataTableContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const DataTableFooter: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const DataTableLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <DataTableContainer>{children}</DataTableContainer>;
};

export default DataTableLayout;
