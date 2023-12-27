import { FileImportForm } from '@components/FileImportForm';
import { productApi } from '@features/products';
import * as React from 'react';

interface IImportProductFormProps {
  handleModalToggle(open: boolean): void;
}

export const ImportProductForm: React.FunctionComponent<IImportProductFormProps> = ({
  handleModalToggle,
}) => {
  const [importProduct, { isLoading }] = productApi.useImportProductsMutation();

  return (
    <>
      <FileImportForm
        handleModalToggle={handleModalToggle}
        mutation={importProduct}
        isLoading={isLoading}
      />
    </>
  );
};
