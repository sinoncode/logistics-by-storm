import LazyWrapper from "@/components/LazyWrapper";


import ShipmentListTable from "@/pages/shipments-request/ShipmentListTable";

import { Card, CardContent } from "@/components/ui/card";

import Breadcrumb from "@/layouts/Breadcrumb";

const ShipmentRequestList = () => {
  return (
    <>
      {/* ====================================================== */}
      {/* BREADCRUMB */}
      {/* ====================================================== */}

      <Breadcrumb
        title="Shipment Request List"
        text="Shipment Request List"
      />

      {/* ====================================================== */}
      {/* PAGE CONTENT */}
      {/* ====================================================== */}

      <LazyWrapper>
        <Card className="h-full overflow-hidden border-0 !p-0 shadow-sm">
          {/* ====================================================== */}
          {/* FILTER SECTION */}
          {/* ====================================================== */}

          {/* ====================================================== */}
          {/* TABLE */}
          {/* ====================================================== */}

          <CardContent className="p-6">
            <ShipmentListTable />
          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default ShipmentRequestList;