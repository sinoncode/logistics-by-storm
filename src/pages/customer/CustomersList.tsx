import { useEffect } from "react";

import LazyWrapper from "@/components/LazyWrapper";

import UsersListTable from "@/components/tables/UsersListTable";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import Breadcrumb from "@/layouts/Breadcrumb";

import { useCustomerStore }
  from "@/store/customerStore";

const CustomerList = () => {

  const {
    customers,
    loading,
    fetchCustomers,
  } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Breadcrumb
        title="Users List"
        text="Users List"
      />

      <LazyWrapper>
        <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">

          <CardHeader className="border-b border-neutral-200 dark:border-slate-600 px-6 py-4">
            <h2 className="text-xl font-semibold">
              Customers List
            </h2>
          </CardHeader>

          <CardContent className="p-6">

            {loading ? (
              <div className="flex items-center justify-center py-20">
                Loading customers...
              </div>
            ) : (
              <UsersListTable
                users={customers}
              />
            )}

          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default CustomerList;