import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

type Proptypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalBuyProduct = (props: Proptypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData, setToaster } =
    props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleBuy = async () => {
    setIsLoading(true);
    const data = {
      stock: updatedProduct.stock - 1,
    };

    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedProduct({});
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data.products);
      setToaster({ variant: "success", message: "Buy product successfully" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed buying product" });
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct({})}>
      <h1>Do you want to buy this product?</h1>
      <Button type="button" onClick={() => handleBuy()}>
        Yes
      </Button>
    </Modal>
  );
};

export default ModalBuyProduct;
