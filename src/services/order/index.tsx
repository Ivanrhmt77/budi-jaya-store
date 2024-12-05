import instance from "@/lib/axios/instance";

export const orderServices = {
  getAllOrders: () => instance.get("/api/orders"),
  addOrder: (data: any) => instance.post("/api/orders", data),
};

export default orderServices;
