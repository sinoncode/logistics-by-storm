import api from "@/lib/axios";
// import { query } from "firebase/firestore";

export const searchShipmentRequests = async (
  query: string
) => {
  const response = await api.get(
    "/admin/warehouse/search-requests",
    {
      params: {
        query,
      },
    }
  );

  return response.data;
};

export const receiveShipmentRequest = async (
  id: number,
  payload: {
    actual_weight_lb: number;
    admin_remarks: string;
  }
) => {
  const response = await api.patch(
    `/admin/warehouse/shipment-requests/${id}/receive`,
    payload
  );

  return response.data;
};