import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { CatalogDatatable } from '@features/pos/product-catalog';
import { PlusSquare } from 'lucide-react';

interface IProductCatalogProps {}

export const ProductCatalog: React.FunctionComponent<IProductCatalogProps> = (props) => {
  return (
    <Card className="mx-0 sm:mx-2">
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
        <CatalogDatatable />
      </CardContent>
    </Card>
  );
};
