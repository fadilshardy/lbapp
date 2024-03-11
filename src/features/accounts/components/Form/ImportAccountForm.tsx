import { FileImportForm } from '@components/FileImportForm';
import { accountApi } from '@features/accounts';
import * as React from 'react';

interface IImportAccountFormProps {
  handleModalToggle(open: boolean): void;
}

export const ImportAccountForm: React.FunctionComponent<IImportAccountFormProps> = ({
  handleModalToggle,
}) => {
  const [importAccount, { isLoading }] = accountApi.useImportAccountsMutation();

  return (
    <>
      <FileImportForm
        handleModalToggle={handleModalToggle}
        mutation={importAccount}
        isLoading={isLoading}
      />
    </>
  );
};
