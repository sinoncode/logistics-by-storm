import { useEffect, useState } from "react";
import { getShipmentDetails } from "../services/shipment-track.service";

export const useShipmentDetails = (id: string) => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShipment = async () => {
    try {
      setLoading(true);

      const data = await getShipmentDetails(id);

      setShipment(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipment();
  }, [id]);

  return {
    shipment,
    loading,
    refetch: fetchShipment,
  };
};