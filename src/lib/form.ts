import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface HandleFormSubmitProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    toast: any;
    mutation: MutationTrigger<any>;
    successMessage?: string;
    mutationProps: {};
    handleModalToggle?: (open: boolean) => void;
    isLoading?: boolean;

}



export const HandleFormSubmit = async <T extends FieldValues>({
    form,
    toast,
    mutation,
    successMessage = 'Operation successful!',
    mutationProps,
    handleModalToggle,
    isLoading

}: HandleFormSubmitProps<T>) => {

    const handleServerErrors = (errors: any) => {
        console.log(errors);


        if (errors && errors.errors) {
            const { errors: serverErrors } = errors;

            Object.keys(serverErrors).forEach((fieldName) => {
                const field = fieldName as FieldPath<T>;

                const errorMessage = serverErrors[fieldName][0];
                const error = {
                    type: 'server',
                    message: errorMessage,
                };
                form.setError(field, error);
            });
        }

    };


    try {
        await mutation({ ...mutationProps }).unwrap();
        toast({
            title: 'Success!',
            variant: "success",
            description: successMessage,
        });
        if (handleModalToggle && !isLoading) {
            handleModalToggle(false);
        }


    } catch (error) {
        console.log(error);
        handleServerErrors(error);
    }
};
