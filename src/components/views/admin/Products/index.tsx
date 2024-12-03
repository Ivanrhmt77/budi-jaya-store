import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Product Management</h1>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: any, index: number) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                    ></Image>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.typeName}</td>
                  <td>{convertIDR(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={styles.products__table__action}>
                      <Button
                        type="button"
                        variant="info"
                        className={styles.products__table__action__edit}
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button type="button" variant="danger">
                        <i className="bx bxs-trash-alt" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
