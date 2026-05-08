import axiosInstance from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (
  payload: LoginPayload
) => {
  const response = await axiosInstance.post(
    "/auth/login",
    payload
  );

  return response.data;
};