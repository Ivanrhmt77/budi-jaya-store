import instance from "@/lib/axios/instance";

export const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  addProduct: (data: any, token: string) =>
    instance.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default productServices;
