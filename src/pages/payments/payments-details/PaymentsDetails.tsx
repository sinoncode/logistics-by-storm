import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  CreditCard,
  Wallet,
  Calendar,
  User,
  Mail,
  Package,
  Hash,
  CircleDollarSign,
   Phone,
  Warehouse,
  MapPin,
} from "lucide-react";

import Breadcrumb from "@/layouts/Breadcrumb";

import LazyWrapper from "@/components/LazyWrapper";

import {
  usePaymentDetailsStore,
} from "@/store/paymentDetailsStore";

const formatText = (
  text?: string | null
) => {
  if (!text) return "-";

  return text
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;

  label: string;

  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-4 rounded-2xl border p-4 bg-background/50">

    <div className="p-2 rounded-xl bg-primary/10 text-primary">
      {icon}
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <div className="font-semibold break-all">
        {value || "-"}
      </div>
    </div>
  </div>
);


const PaymentDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-32 rounded-full" />

          <Skeleton className="h-10 w-72" />

          <Skeleton className="h-5 w-48" />

          <Skeleton className="h-12 w-40" />
        </div>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-52" />
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border p-4 space-y-3"
              >
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipment Details */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-52" />
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border p-4 space-y-3"
              >
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipment Items */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-40" />
        </CardHeader>

        <Separator />

        <CardContent className="p-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border p-4 flex justify-between items-center"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border p-4 space-y-3"
              >
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PaymentDetails = () => {

  const { id } = useParams();

  const {
    payment,
  shipmentRequest,
  loading,
  fetchPaymentDetails,
} =
    usePaymentDetailsStore();

  useEffect(() => {
    if (id) {
      fetchPaymentDetails(id);
    }
  }, [id]);

  return (
    <>
      <Breadcrumb
        title="Payment Details"
        text="Payment Details"
      />

      <LazyWrapper>

      {loading ? (
  <PaymentDetailsSkeleton />
) : payment ? (

          <div className="space-y-6">

            {/* =====================================================
                HEADER CARD
            ===================================================== */}

            <Card className="border-0 shadow-sm overflow-hidden">

              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div className="space-y-3">

                    <Badge className="rounded-full px-4 py-1 text-sm">
                      {formatText(
                        payment.status
                      )}
                    </Badge>

                    <h1 className="text-2xl md:text-3xl font-bold">
                      {
                        payment.payment_reference
                      }
                    </h1>

                    <p className="text-muted-foreground">
                      Payment via{" "}
                      {formatText(
                        payment.gateway_name
                      )}
                    </p>

                  </div>

                  <div className="text-left lg:text-right">

                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>

                    <h2 className="text-4xl font-bold">
                      {
                        payment.currency_code
                      }{" "}
                      {payment.amount}
                    </h2>

                  </div>

                </div>

              </div>

            </Card>

            {/* =====================================================
                GRID
            ===================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">

              {/* =====================================================
                  LEFT
              ===================================================== */}

              <div className="xl:col-span-2 space-y-6">

                {/* PAYMENT INFO */}

                <Card>

                  <CardHeader>
                    <CardTitle>
                      Payment Information
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                      <DetailItem
                        icon={
                          <Hash size={18} />
                        }
                        label="Transaction ID"
                        value={
                          payment.gateway_transaction_id
                        }
                      />

                      <DetailItem
                        icon={
                          <CreditCard
                            size={18}
                          />
                        }
                        label="Gateway"
                        value={formatText(
                          payment.gateway_name
                        )}
                      />

                      {/* <DetailItem
                        icon={
                          <Wallet
                            size={18}
                          />
                        }
                        label="Currency"
                        value={
                          payment.currency_code
                        }
                      /> */}

                      <DetailItem
                        icon={
                          <CircleDollarSign
                            size={18}
                          />
                        }
                        label="Amount"
                        value={`${payment.currency_code} ${payment.amount}`}
                      />

                      {/* <DetailItem
                        icon={
                          <Hash size={18} />
                        }
                        label="Transaction ID"
                        value={
                          payment.gateway_transaction_id
                        }
                      /> */}

                      <DetailItem
                       icon={
  <Calendar size={18} />
}
label="Paid On"
value={
  payment.created_at
    ? new Date(
        payment.created_at
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "-"
}
                      />

                    </div>

                  </CardContent>

                </Card>

                {/* TIMELINE */}

                {/* <Card>

                  <CardHeader>
                    <CardTitle>
                      Payment Timeline
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6">

                    <div className="space-y-5">

                      <DetailItem
                        icon={
                          <Calendar
                            size={18}
                          />
                        }
                        label="Initiated At"
                        value={
                          payment.initiated_at
                        }
                      />

                      <DetailItem
                        icon={
                          <Calendar
                            size={18}
                          />
                        }
                        label="Paid At"
                        value={
                          payment.paid_at
                        }
                      />

                      <DetailItem
                        icon={
                          <Calendar
                            size={18}
                          />
                        }
                        label="Failed At"
                        value={
                          payment.failed_at
                        }
                      />

                      <DetailItem
                        icon={
                          <Calendar
                            size={18}
                          />
                        }
                        label="Refunded At"
                        value={
                          payment.refunded_at
                        }
                      />

                    </div>

                  </CardContent>

                </Card> */}


                 <div className="space-y-6">

                {/* CUSTOMER */}

               


                            <Card>

  <CardHeader>
    <CardTitle>
      Shipment Details
    </CardTitle>
  </CardHeader>

  <Separator />

  <CardContent className="p-6 space-y-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <DetailItem
      icon={
        <Package size={18} />
      }
      label="Request Number"
      value={
        shipmentRequest?.request_number
      }
    />

    <DetailItem
      icon={
        <Package size={18} />
      }
      label="Supplier Name"
      value={
        shipmentRequest?.supplier_name
      }
    />

    {/* <DetailItem
      icon={
        <User size={18} />
      }
      label="Customer Name"
      value={
        shipmentRequest?.user.name
      }
    /> */}

    {/* <DetailItem
      icon={
        <Mail size={18} />
      }
      label="Customer Email"
      value={
        shipmentRequest?.user.email
      }
    /> */}



    <DetailItem
      icon={
        <MapPin size={18} />
      }
      label="Origin Country"
      value={
        shipmentRequest
          ?.origin_country.name
      }
    />

    <DetailItem
      icon={
        <Warehouse size={18} />
      }
      label="Origin Facility"
      value={
        shipmentRequest
          ?.origin_facility.name
      }
    />

    <DetailItem
      icon={
        <MapPin size={18} />
      }
      label="Destination Country"
      value={
        shipmentRequest
          ?.destination_country
          .name
      }
    />

    <DetailItem
      icon={
        <Warehouse size={18} />
      }
      label="Destination Facility"
      value={
        shipmentRequest
          ?.destination_facility
          .name
      }
    />

    </div>

  </CardContent>



</Card>

                {/* SHIPMENT */}

                {/* <Card>

                  <CardHeader>
                    <CardTitle>
                      Shipment Information
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6">

                    <DetailItem
                      icon={
                        <Package
                          size={18}
                        />
                      }
                      label="Shipment Request ID"
                      value={
                        payment
                          .shipment_request
                          .id
                      }
                    />

                  </CardContent>

                </Card> */}

                <Card>

  <CardHeader>
    <CardTitle>
      Shipment Items
    </CardTitle>
  </CardHeader>

  <Separator />

  <CardContent className="p-6">

    <div className="space-y-4">

      {shipmentRequest?.items?.map(
        (item) => (
          <div
            key={item.id}
            className="rounded-2xl border p-4 flex items-center justify-between"
          >

            <div>
              <p className="font-semibold">
                {
                  item.commodity_type
                }
              </p>
            </div>

            <div className="text-right">

              <p className="text-sm text-muted-foreground">
                Price
              </p>

              <p className="font-bold">
                ${item.price}
              </p>

            </div>

          </div>
        )
      )}

    </div>

  </CardContent>

</Card>

              </div>

              </div>

  {/* Shipment Things are their */}
 <Card>

                  <CardHeader>
                    <CardTitle>
                      Customer Details
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6 space-y-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailItem
                      icon={
                        <User size={18} />
                      }
                      label="Customer Name"
                      value={
                        payment.user.name
                      }
                    />

                        <DetailItem
      icon={
        <Phone size={18} />
      }
      label="Phone Number"
      value={
        shipmentRequest?.user.phone
      }
    />

                    <DetailItem
                      icon={
                        <Mail size={18} />
                      }
                      label="Customer Email"
                      value={
                        payment.user.email
                      }
                    />
</div>
                  </CardContent>

                </Card>




              {/* =====================================================
                  RIGHT
              ===================================================== */}

              {/* <div className="space-y-6">


                <Card>

                  <CardHeader>
                    <CardTitle>
                      Customer Details
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6 space-y-4">

                    <DetailItem
                      icon={
                        <User size={18} />
                      }
                      label="Customer Name"
                      value={
                        payment.user.name
                      }
                    />

                    <DetailItem
                      icon={
                        <Mail size={18} />
                      }
                      label="Customer Email"
                      value={
                        payment.user.email
                      }
                    />

                  </CardContent>

                </Card>

                <Card>

                  <CardHeader>
                    <CardTitle>
                      Shipment Information
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent className="p-6">

                    <DetailItem
                      icon={
                        <Package
                          size={18}
                        />
                      }
                      label="Shipment Request ID"
                      value={
                        payment
                          .shipment_request
                          .id
                      }
                    />

                  </CardContent>

                </Card>

              </div> */}

            </div>

          </div>

        ) : (
          <div className="flex items-center justify-center py-40">
            No payment details found.
          </div>
        )}

      </LazyWrapper>
    </>
  );
};

export default PaymentDetails;