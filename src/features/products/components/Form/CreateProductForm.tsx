import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@components/ui/use-toast';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';
import { Product, ProductSchema } from '../../schemas/productSchema';
import { productApi } from '../../services/productApi';
import { ProductForm } from './ProductForm';

interface IProductCreateFormProps {
  initialValues?: Product;
  handleModalToggle(open: boolean): void;
}

export const CreateProductForm: React.FC<IProductCreateFormProps> = ({ handleModalToggle }) => {
  const { toast } = useToast();

  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      unit: '',
      brand: '',
      type: '',
      category_id: '',
    },
  });

  const [createProduct, { isLoading: isProductLoading }] = productApi.useCreateProductMutation();

  const cors = productApi.useGetCorsQuery({});

  async function onSubmit(product: Product) {
    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: createProduct,
      handleModalToggle: handleModalToggle,
      mutationProps: {
        payload: product,
      },
    });
  }

  return (
    <ProductForm
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      isProductLoading={isProductLoading}
    />
  );
};
