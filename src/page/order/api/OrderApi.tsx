import { OrderInfo } from "../entity/OrderInfo";
import { OrderRequset } from "../entity/OrderRequset";
import axiosInstance from "utility/axiosInstance";
import { UserOrderList } from "../entity/UserOrderList";

const userToken = localStorage.getItem("userToken");

// 주문 전 확인 정보 요청
export const getOrderInfo = async (requestData: number[]) => {
  const requestForm = {
    userToken: userToken,
    requestList: requestData,
  };
  const response = await axiosInstance.post<OrderInfo>("/order/confirm", requestForm);
  console.log("주문 확인 데이터", response.data);
  return response.data;
};

// 사용자의 주문 목록 조회
export const getUserOrderList = async () => {
  const response = await axiosInstance.get<UserOrderList[]>("order/my-list", {
    params: { userToken: userToken },
  });
  console.log("사용자 주문 목록 데이터", response.data);
  return response.data;
};
