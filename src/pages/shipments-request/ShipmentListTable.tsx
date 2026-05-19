import { useEffect } from "react";

import { Loader2 } from "lucide-react";

import { columns } from "@/components/tables/shipments-request/columns";

import { DataTable } from "@/components/tables/users/data-tables";

import { useShipmentStore } from "@/store/shipmentStore";

export default function ShipmentListTable() {
  const {
    shipments,
    loading,
    fetchShipments,
  } = useShipmentStore();

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={shipments}
    />
  );
}