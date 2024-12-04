import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setModalAddProduct, setToaster, setProductsData } = props;
  const session: any = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      stock: form.stock.value,
      typesId: form.typesId.value,
      image: form.image.value,
    };

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      setModalAddProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data.products);
      setToaster({ variant: "success", message: "Product added successfully" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed adding product" });
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
          type="text"
          placeholder="Product name"
        />
        <Input
          name="price"
          label="Price"
          type="number"
          placeholder="Product price"
        />
        <Input
          name="stock"
          label="Stock"
          type="number"
          placeholder="Product stock"
        />
        <Select
          name="typesId"
          label="Types"
          options={[
            { label: "T-Shirts", value: "1" },
            { label: "Shirts", value: "2" },
            { label: "Sweater", value: "3" },
            { label: "Jeans", value: "4" },
            { label: "Trousers", value: "5" },
            { label: "Shorts", value: "6" },
            { label: "Jacket", value: "7" },
            { label: "Hoodie", value: "8" },
            { label: "Coat", value: "9" },
            { label: "Hat", value: "10" },
            { label: "Sock", value: "11" },
          ]}
        />
        <Select
          name="image"
          label="Image"
          options={[
            { label: "T-Shirts", value: "/images/alu.jpg" },
            { label: "Coat", value: "/images/coat.jpg" },
            { label: "Trousers", value: "/images/trousers.jpg" },
          ]}
        />
        <Button type="submit">
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
