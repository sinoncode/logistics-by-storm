import API from "@/lib/axios";

export const getSettings = async () => {
  const response = await API.get(
    "/admin/settings"
  );

  return response.data;
};

export const getSettingById = async (
  id: number
) => {
  const response = await API.get(
    `/admin/settings/${id}`
  );

  return response.data;
};

export const createSetting = async (
  formData: FormData
) => {
  const response = await API.post(
    "/admin/settings",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateSetting = async (
  id: number,
  formData: FormData
) => {
  const response = await API.post(
    `/admin/settings/${id}?_method=PUT`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteSetting = async (
  id: number
) => {
  const response = await API.delete(
    `/admin/settings/${id}`
  );

  return response.data;
};