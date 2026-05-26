import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  EllipsisVertical,
  Eye,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useDashboardStore }
  from "@/store/dashboardStore";

const getStatusVariant = (
  status: string
):
  | "success"
  | "warning"
  | "danger"
  | "info" => {
  switch (status) {
    case "delivered":
      return "success";

    case "out_for_delivery":
      return "info";

    case "received_at_origin":
      return "warning";

    default:
      return "danger";
  }
};

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
  date: string
) => {
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

const TodoListRecentTable =
  () => {
    const { dashboard } =
      useDashboardStore();

    const shipments =
      dashboard?.recent_shipments ||
      [];

    return (
      <Table className="table-auto border-spacing-0 border-separate">

        {/* =========================================
            TABLE HEADER
        ========================================== */}

        <TableHeader>
          <TableRow className="border-0">

            <TableHead className="px-4 h-12 bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">
              Tracking
            </TableHead>

            <TableHead className="px-4 h-12 bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">
              Customer
            </TableHead>

            {/* <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">
              Created At
            </TableHead> */}

            <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">
              Status
            </TableHead>

            <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">
              Action
            </TableHead>

          </TableRow>
        </TableHeader>

        {/* =========================================
            TABLE BODY
        ========================================== */}

        <TableBody>

          {shipments.map(
            (
              shipment,
              index
            ) => {
              const isLast =
                index ===
                shipments.length - 1;

              return (
                <TableRow
                  key={
                    shipment.id
                  }
                >

                  {/* Tracking */}

                  <TableCell
                    className={`py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600 ${
                      isLast
                        ? "rounded-bl-lg"
                        : ""
                    }`}
                  >
                    <div>
                      <span className="block font-semibold text-sm text-neutral-700 dark:text-neutral-100">
                        {
                          shipment.tracking_number
                        }
                      </span>

                    </div>
                  </TableCell>

                  {/* Customer */}

                  <TableCell className="py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600">

                    <span className="font-medium text-sm">
                      {
                        shipment.customer_name
                      }
                    </span>

                  </TableCell>

                  {/* Date */}

                  {/* <TableCell className="py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600 text-center text-sm">

                    {formatDate(
                      shipment.created_at
                    )}

                  </TableCell> */}

                  {/* Status */}

                  <TableCell className="py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600 text-center">

                    <Badge
                      variant={getStatusVariant(
                        shipment.status
                      )}
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {formatStatus(
                        shipment.status
                      )}
                    </Badge>

                  </TableCell>

                  {/* Action */}

                  <TableCell
                    className={`py-5 px-4 border-b first:border-s last:border-e border-neutral-200 dark:border-slate-600 text-center ${
                      isLast
                        ? "rounded-br-lg"
                        : ""
                    }`}
                  >

                   <Link
                            to={`/shipments-detail/${shipment.id}`}
                            className="flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                  </TableCell>

                </TableRow>
              );
            }
          )}

        </TableBody>
      </Table>
    );
  };

export default TodoListRecentTable;