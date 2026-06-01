import { useEffect, useState } from "react";

import {
  DataTable,
} from "@/components/tables/users/data-tables";

import { columns } from "@/components/tables/shipments/columns";

import {
  getShipments,
} from "@/services/shipment-track.service";

import type {
  Shipment,
} from "@/types/shipments-track";

export default function ShipmentListPage() {
  const [shipments, setShipments] =
    useState<Shipment[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);

      const response =
        await getShipments();

      setShipments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="p-10">
  //       Loading shipments...
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={shipments}
        loading={loading}
      />
    </div>
  );
}