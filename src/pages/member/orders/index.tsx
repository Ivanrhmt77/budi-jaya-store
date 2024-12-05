import OrdersMemberView from "@/components/views/member/Orders";
import productServices from "@/services/product";
import { useState, useEffect } from "react";

const OrdersPage = ({ setToaster }: any) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      const { products, categories, types } = data.data;

      const productsWithDetails = products.map((product: any) => {
        const type = types.find((t: any) => t.id === product.typesId);
        const category = categories.find(
          (cat: any) => cat.id === type?.categoryId
        );
        return {
          ...product,
          categoryName: category?.name || "Unknown",
          typeName: type?.name || "Unknown",
        };
      });

      setProducts(productsWithDetails);
    };
    getAllProducts();
  }, []);
  return (
    <>
      <OrdersMemberView setToaster={setToaster} products={products} />
    </>
  );
};

export default OrdersPage;
