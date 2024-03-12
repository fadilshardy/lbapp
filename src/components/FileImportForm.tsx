import BaseIcon from '@components/BaseIcon';
import Loading from '@components/Loading';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { useToast } from '@components/ui/use-toast';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@lib';
import { HandleFormSubmit } from '@lib/form';
import { mdiCloudUploadOutline } from '@mdi/js';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useForm } from 'react-hook-form';

interface IFileImportProps {
  handleModalToggle(open: boolean): void;
  mutation: MutationTrigger<any>;
  isLoading: boolean;
}

interface IFormImport {
  fileImport: File;
}

export const FileImportForm: React.FC<IFileImportProps> = ({
  handleModalToggle,
  mutation,
  isLoading,
}) => {
  const defaultValues = {
    fileImport: new File([], ''),
  };

  const { toast } = useToast();
  const form = useForm({
    defaultValues: defaultValues,
  });

  const fileImport = form.watch('fileImport');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    form.reset(defaultValues);
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      const selectedFile = files[0];
      const validFileTypes = [
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      if (!validFileTypes.includes(selectedFile.type)) {
        return form.setError('fileImport', {
          type: 'filetype',
          message: 'Only spreadsheets are valid. (csv, xlsx, xls)',
        });
      }
      form.setValue('fileImport', selectedFile);
    }
  };

  const handleSubmit = async (data: IFormImport) => {
    const formData = new FormData();
    formData.append('file_import', form.getValues('fileImport'));

    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: mutation,
      handleModalToggle: handleModalToggle,
      isLoading: isLoading,
      mutationProps: {
        payload: formData,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='max-w-xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='fileImport'
            render={({ field }) => (
              <>
                <label className='group flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none flex-col items-center '>
                  <div className='flex flex-col justfiy-between items-center '>
                    <h4 className='text-base font-normal flex items-center gap-2 py-2'>
                      <span className={cn('font-bold', !fileImport.name ? 'invisible' : '')}>
                        {fileImport.name || 'Select file here'}
                      </span>
                    </h4>
                    <div className='flex items-center space-x-2'>
                      <BaseIcon
                        path={mdiCloudUploadOutline}
                        className='h-6 w-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-200'
                      />
                      <div className='font-medium text-gray-600'>
                        Click to browse files to attach, or{' '}
                        <span className='text-blue-600 underline'>select file</span>
                      </div>
                    </div>

                    <p className='mt-4 text-xs text-gray-600 py-2'>
                      Files Supported: XLS, XLSX, CSV.
                    </p>
                  </div>

                  <FormItem>
                    <FormControl>
                      <input
                        type='file'
                        className='hidden'
                        {...form.register('fileImport')}
                        onChange={handleFileChange}
                        accept='.xls, .xlsx, text/csv, .csv'
                      />
                    </FormControl>
                  </FormItem>
                </label>
                <FormMessage className='text-center' />
              </>
            )}
          />

          <div className='border-t flex justify-between w-full items-center pt-2'>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

            <Button
              type='submit'
              disabled={!fileImport.size || !fileImport.name || isLoading}
              variant='action'
            >
              Upload
            </Button>
          </div>
          <hr />
          <ErrorMessage
            errors={form.formState.errors}
            name='errors'
            render={({ message }) => (
              <p className='text-destructive text-xs text-center'>{message}</p>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
