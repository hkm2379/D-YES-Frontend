import axiosInstance from "utility/axiosInstance";
import { Admin } from "../entity/Admin";
import { Farm } from "page/farm/entity/Farm";
import { FarmRead } from "page/farm/entity/FarmRead";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { FarmModify } from "page/farm/entity/FarmModify";

export const adminRegister = async (data: {
  id: string;
  name: string;
  userToken: string;
}): Promise<Admin> => {
  const response = await axiosInstance.springAxiosInst.post<Admin>("/admin/register", data);
  console.log("api확인", response.data);
  return response.data;
};

// 농가 등록
export const farmRegister = async (data: {
  businessName: string;
  businessNumber: string;
  representativeName: string;
  representativeContactNumber: string;
  farmName: string;
  csContactNumber: string;
  address: string;
  zipCode: string;
  addressDetail: string;
  mainImage: string;
  introduction: string;
  produceTypes: string[];
}): Promise<Farm> => {
  const response = await axiosInstance.springAxiosInst.post<Farm>("/farm/register", data);
  return response.data;
};

// 농가 목록
export const getFarmList = async () => {
  const response = await axiosInstance.springAxiosInst.get("/farm/list");
  return response.data;
};

// 농가 삭제
export const deleteFarm = async (farmId: string): Promise<void> => {
  await axiosInstance.springAxiosInst.delete(`farm/delete/${farmId}`, {
    data: {
      userToken: localStorage.getItem("userToken"),
    },
  });
};

// 농가 정보 읽기
export const fetchFarm = async (farmId: string): Promise<FarmRead | null> => {
  const response = await axiosInstance.springAxiosInst.get(`farm/read/${farmId}`);
  console.log("읽기정보", response.data);
  return response.data;
};

export const useFarmQuery = (farmId: string): UseQueryResult<FarmRead | null, unknown> => {
  return useQuery(["FarmRead", farmId], () => fetchFarm(farmId), {
    refetchOnWindowFocus: false,
  });
};

// 농가 수정
export const updateFarm = async (updatedData: FarmModify): Promise<FarmModify> => {
  const {
    farmId,
    csContactNumber,
    mainImage,
    introduction,
    produceTypes,
    userToken = localStorage.getItem("userToken"),
  } = updatedData;
  const response = await axiosInstance.springAxiosInst.put<FarmModify>(`farm/modify/${farmId}`, {
    userToken,
    csContactNumber,
    mainImage,
    introduction,
    produceTypes,
  });
  return response.data;
};

export const useFarmUpdateMutation = (): UseMutationResult<FarmModify, unknown, FarmModify> => {
  const queryClient = useQueryClient();
  return useMutation(updateFarm, {
    onSuccess: (data) => {
      queryClient.setQueryData(["farmModify", data.farmId], data);
    },
  });
};
