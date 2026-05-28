import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { useDashboardStore } from "@/store/dashboardStore";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

const formatStatus = (
  status: string
) => {
  return status
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    );
};

const formatDate = (
  date: string | null
) => {
  if (!date)
    return "Not Paid";

  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getStatusVariant = (
  status: string
):
  | "success"
  | "warning"
  | "danger"
  | "info" => {
  switch (status) {
    case "paid":
      return "success";

    case "pending":
      return "warning";

    case "failed":
      return "danger";

    default:
      return "info";
  }
};

/* =========================================================
   COMPONENT
========================================================= */

const LastTransactionTable =
  () => {
    const { dashboard } =
      useDashboardStore();

    const payments =
      dashboard?.recent_payments ||
      [];

    return (
      <Table className="table-auto border-spacing-0 border-separate">

        {/* =====================================
            TABLE HEADER
        ====================================== */}

        <TableHeader>

          <TableRow className="border-0">

            {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 px-4 h-12 border-s rounded-tl-lg">
              Payment ID
            </TableHead> */}

            <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
              Customer
            </TableHead>

            <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 px-4 h-12">
              Tracking Number
            </TableHead>

            {/* <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
              Paid At
            </TableHead> */}

            <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 dark:border-slate-600 px-4 h-12 text-center">
              Status
            </TableHead>

            <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-e border-neutral-200 dark:border-slate-600 px-4 h-12 rounded-tr-lg text-center">
              Amount
            </TableHead>
            
            <TableHead className="bg-neutral-100 dark:bg-slate-700 border-t border-e border-neutral-200 dark:border-slate-600 px-4 h-12 rounded-tr-lg text-center">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        {/* =====================================
            TABLE BODY
        ====================================== */}

        <TableBody>

          {
  payments
    .filter(
      (payment) =>
        payment.status ===
        "paid"
    )
    .map(
      (
        payment,
        index
      ) => {
        const isLastRow =
          index ===
          payments.filter(
            (payment) =>
              payment.status ===
              "paid"
          ).length -
            1;

              return (
                <TableRow
                  key={
                    payment.id
                  }
                >

                  {/* Payment ID */}

                  {/* <TableCell
                    className={`py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-sm font-medium first:border-s last:border-e ${
                      isLastRow
                        ? "rounded-bl-lg"
                        : ""
                    }`}
                  >
                    #{payment.id}
                  </TableCell> */}

                  {/* Customer */}

                  <TableCell className="py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-sm first:border-s last:border-e">
{
  payment.customer_name.length > 5
    ? `${payment.customer_name.slice(0, 5)}...`
    : payment.customer_name
}

                  </TableCell>

                  {/* Tracking */}

                  <TableCell className="py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-sm first:border-s last:border-e">

                    {payment.tracking_number ||
                      "-"}

                  </TableCell>

                  {/* Paid At */}

                  {/* <TableCell className="py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-sm text-center first:border-s last:border-e">

                    {formatDate(
                      payment.paid_at
                    )}

                  </TableCell> */}

                  {/* Status */}

                  <TableCell className="py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-center first:border-s last:border-e">

                    <Badge
                      variant={getStatusVariant(
                        payment.status
                      )}
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {formatStatus(
                        payment.status
                      )}
                    </Badge>

                  </TableCell>

                  {/* Amount */}

                  <TableCell
                    className={`py-4.5 px-4 border-b border-neutral-200 dark:border-slate-600 text-sm font-semibold text-center first:border-s last:border-e ${
                      isLastRow
                        ? "rounded-br-lg"
                        : ""
                    }`}
                  >
                    $
                    {payment.amount.toFixed(
                      2
                    )}
                  </TableCell>

                 <TableCell
  className={`py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600 text-center ${
    isLastRow
      ? "rounded-br-lg"
      : ""
  }`}
>
  <div className="flex items-center justify-center">
    
    <Link
      to={`/payemnts-details/${payment.id}`}
      className="w-9 h-9 rounded-4xl border border-neutral-200 dark:border-slate-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
    >
      <Eye className="w-4 h-4" />
    </Link>

  </div>
</TableCell>

                </TableRow>
              );
            }
          )}

        </TableBody>

      </Table>
    );
  };

export default LastTransactionTable;