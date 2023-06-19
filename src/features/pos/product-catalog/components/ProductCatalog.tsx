import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { DataTable } from '@components/ui/datatables/data-tables';
import { Input } from '@components/ui/input';
import { CartItem, addToCart } from '@features/pos/cart';
import { getProductCatalogColumns, productCatalogsApi } from '@features/pos/product-catalog';
import useDebounce from '@hooks/useDebounce';
import { useAppDispatch } from '@stores/hooks';
import { PlusSquare } from 'lucide-react';
import { useState } from 'react';

interface IProductCatalogProps {}

export const ProductCatalog: React.FunctionComponent<IProductCatalogProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleAddToCart = (cart: CartItem) => {
    dispatch(addToCart(cart));
  };

  const productCatalogColumns = getProductCatalogColumns({ handleAddToCart });

  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const {
    data: productCatalog,
    isLoading,
    isError,
    error,
  } = productCatalogsApi.useGetProductCatalogsQuery(debouncedSearchQuery);

  return (
    <Card className="mx-2">
      <CardHeader className="p-6 pb-0">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
          <div className="flex items-center space-x-2">
            <Button size="sm">
              <PlusSquare className="mr-2 h-4 w-4" />
              Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          type="search"
          placeholder="Search products..."
          className="h-12 w-full my-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DataTable
          columns={productCatalogColumns}
          data={productCatalog}
          queryStatus={{ isLoading, isError, error }}
        />
      </CardContent>
    </Card>
  );
};
