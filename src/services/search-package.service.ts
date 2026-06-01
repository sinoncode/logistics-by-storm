import api from "@/lib/axios";

export const searchShipmentRequests = async (
  search: string
) => {
  const response = await api.get(
    "/admin/warehouse/search-requests",
    {
      params: {
        search,
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