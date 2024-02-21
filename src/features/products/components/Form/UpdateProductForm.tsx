import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@components/ui/use-toast';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';
import { Product, ProductSchema } from '../../schemas/productSchema';
import { productApi } from '../../services/productApi';
import { ProductForm } from './ProductForm';

interface IUpdateProductFormProps {
  handleModalToggle(open: boolean): void;
  currentProduct: Product;
}

export const UpdateProductForm: React.FC<IUpdateProductFormProps> = ({
  handleModalToggle,
  currentProduct,
}) => {
  const { toast } = useToast();

  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      ...currentProduct,
      category_id: String(currentProduct.category_id),
    },
  });

  const [updateProduct, { isLoading: isProductLoading }] = productApi.useUpdateProductMutation();

  async function onSubmit(product: Product) {
    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: updateProduct,
      handleModalToggle: handleModalToggle,
      successMessage: `${product.name} is successfully updated!`,
      mutationProps: {
        payload: {
          ...product,
        },
        productKey: currentProduct.code,
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
