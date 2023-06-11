import { addToCart } from '@features/pos-cart';
import { IProductCatalog, setProductCatalogs, setSearchQuery } from '@features/pos-product-catalog';
import apiClient from '@lib/apiClient';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { useEffect } from 'react';

interface IProductCatalogProps {}

export const ProductCatalog: React.FunctionComponent<IProductCatalogProps> = (props) => {
  const productCatalogs = useAppSelector((state) => state.productCatalog.productCatalogs);
  const searchQuery = useAppSelector((state) => state.productCatalog.searchQuery);
  const dispatch = useAppDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient(`/api/inventory?search=${searchQuery}`);

        const productCatalog: IProductCatalog[] = response.data.map((item) => ({
          name: item.product_name,
          code: item.product_code,
          unit: item.product_unit,
          brand: item.product_brand,
          type: item.product_type,
          purchaseDetailId: item.purchase_detail_id,
          salePrice: item.sale_price,
          QuantityInStock: item.quantity,
          purchaseDate: item.purchase_date,
        }));

        dispatch(setProductCatalogs(productCatalog));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="justify-center w-full h-full bg-gray-200 border">
      <div className="mx-auto p-4 bg-white h-full">
        <input
          className="w-full px-4 py-6 mb-4 leading-tight border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {productCatalogs.map((productCatalog) => (
          <div
            key={productCatalog.purchaseDetailId}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2 hover:bg-gray-200"
          >
            <div className="flex gap-x-4  items-center px-4 justify-between w-full">
              <span className="text-lg font-bold">
                {productCatalog.name} -{' '}
                <span className="text-xs">{productCatalog.QuantityInStock} qty</span>
              </span>
              <span className="text-green-500 font-semibold text-sm">
                ${productCatalog.salePrice}
              </span>
            </div>

            <button
              className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
              onClick={() => handleAddToCart(productCatalog)}
            >
              Cart
            </button>
          </div>
        ))}
        {productCatalogs.length === 0 && (
          <div className="p-4 text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
};
