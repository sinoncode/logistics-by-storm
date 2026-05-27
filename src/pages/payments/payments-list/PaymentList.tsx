import { useEffect } from "react";

import LazyWrapper from "@/components/LazyWrapper";

import {
  DataTable
} from "@/components/tables/users/data-tables";

import { columns } from "@/components/tables/payments/column";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import Breadcrumb from "@/layouts/Breadcrumb";

import { usePaymentsStore }
  from "@/store/paymentsList";

const PaymentsList = () => {

  const {
    payments,
    loading,
    fetchPayments,
  } = usePaymentsStore();

  useEffect(() => {
    fetchPayments();
  }, []);

  const paidPayments =
  payments.filter(
    (payment) =>
      payment.status?.toLowerCase() ===
      "paid"
  );

  return (
    <>
      <Breadcrumb
        title="Payments List"
        text="Payments List"
      />

      <LazyWrapper>
        <Card className="card h-full !p-0 !block border-0 overflow-hidden mb-6">


          <CardContent className="p-6">

            {loading ? (
              <div className="flex items-center justify-center py-20">
                Loading payments...
              </div>
            ) : (
              <DataTable
              columns={columns}
                data={paidPayments} 
              />
            )}

          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default PaymentsList;