import LazyWrapper from "@/components/LazyWrapper";
import CustomSelect from "@/components/shared/CustomSelect";
import SearchBox from "@/components/shared/SearchBox";
// import UsersListTable from '@/components/tables/UsersListTable';
// import ShipmentListTable from "@/pages/shipments-request/ShipmentListTable";
import ShipmentList from "@/pages/shipments/ShipmentList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Breadcrumb from "@/layouts/Breadcrumb";

const UsersList = () => {
  return (
    <>
      <Breadcrumb
        title="Shipments List"
        text="Shipments List"
      />

      <LazyWrapper>
        <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">
         

          <CardContent className="card-body p-0">
            <ShipmentList />
          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default UsersList;
