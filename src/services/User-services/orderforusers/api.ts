import { post } from "@/lib/api";


const OrderForUsers = async () => {
  const response = await post(`/api/order`);
  return response;
};

export default OrderForUsers;
