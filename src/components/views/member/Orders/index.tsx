import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Orders.module.scss";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import productServices from "@/services/product";
import ModalBuyProduct from "./ModalBuyProduct";

type Proptypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const OrdersMemberView = (props: Proptypes) => {
  const { products, setToaster } = props;
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <MemberLayout>
        <div className={styles.orders}>
          <h1 className={styles.orders__title}>
            All Products ({products.length})
          </h1>
          <div className={styles.orders__main}>
            {productsData.map((product: any) => (
              <div className={styles.orders__main__item} key={product.id}>
                <Image
                  src={product.image}
                  alt={"product"}
                  width={500}
                  height={500}
                  className={styles.orders__main__item__image}
                ></Image>
                <h4 className={styles.orders__main__item__name}>
                  {product.name}
                </h4>
                <div className={styles.orders__main__item__detail}>
                  <div className={styles.orders__main__item__detail__side}>
                    <p>{product.categoryName}</p>
                    <p>{convertIDR(product.price)}</p>
                  </div>
                  <div className={styles.orders__main__item__detail__side}>
                    <p>Type : {product.typeName}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                </div>
                <Button
                  className={styles.orders__main__item__button}
                  type="button"
                  onClick={() => setUpdatedProduct(product)}
                >
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </MemberLayout>
      {Object.keys(updatedProduct).length && (
        <ModalBuyProduct
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default OrdersMemberView;
