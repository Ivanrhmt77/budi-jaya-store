import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Orders.module.scss";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";

type Proptypes = {
  products: Product[];
};

const OrdersMemberView = (props: Proptypes) => {
  const { products } = props;
  return (
    <MemberLayout>
      <div className={styles.orders}>
        <h1 className={styles.orders__title}>
          All Products ({products.length})
        </h1>
        <div className={styles.orders__main}>
          {products.map((product: any) => (
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
              >
                Buy Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default OrdersMemberView;
