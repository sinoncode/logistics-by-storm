import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Eye, Trash2 } from "lucide-react";

interface CustomerOrder {
  id: string;
  customerName: string;
  email: string;
  orderId: string;
  status: "Pending" | "Completed" | "Cancelled";
}

const orders: CustomerOrder[] = [
  {
    id: "1",
    customerName: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    orderId: "#ORD1025",
    status: "Completed",
  },
  {
    id: "2",
    customerName: "Annette Black",
    email: "annette@gmail.com",
    orderId: "#ORD1026",
    status: "Pending",
  },
  {
    id: "3",
    customerName: "Darlene Robertson",
    email: "darlene@gmail.com",
    orderId: "#ORD1027",
    status: "Cancelled",
  },
  {
    id: "4",
    customerName: "Cameron Williamson",
    email: "cameron@gmail.com",
    orderId: "#ORD1028",
    status: "Completed",
  },
];

export default function CustomerOrdersTable() {
    const navigate = useNavigate();
  return (
    <Table className="w-full table-fixed border-separate border-spacing-0">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-l border-neutral-200 dark:border-slate-600 rounded-tl-lg">
            S.no
          </TableHead>

          <TableHead className="w-[22.5%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-neutral-200 dark:border-slate-600">
            Customer Name
          </TableHead>

          <TableHead className="w-[22.5%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-neutral-200 dark:border-slate-600">
            Email
          </TableHead>

          <TableHead className="w-[15%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-neutral-200 dark:border-slate-600">
            Order ID
          </TableHead>

          <TableHead className="w-[15%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-neutral-200 dark:border-slate-600">
            Status
          </TableHead>

          <TableHead className="w-[15%] px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-b border-r border-neutral-200 dark:border-slate-600 rounded-tr-lg">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order, index) => {
          const isLast = index === orders.length - 1;

          return (
            <TableRow key={order.id}>
              <TableCell
                className={`py-4 px-4 text-center border-b border-l border-neutral-200 dark:border-slate-600 ${
                  isLast ? "rounded-bl-lg" : ""
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </TableCell>

              <TableCell className="py-4 px-4 text-center border-b border-neutral-200 dark:border-slate-600">
                {order.customerName}
              </TableCell>

              <TableCell className="py-4 px-4 text-center border-b border-neutral-200 dark:border-slate-600">
                {order.email}
              </TableCell>

              <TableCell className="py-4 px-4 text-center border-b border-neutral-200 dark:border-slate-600">
                {order.orderId}
              </TableCell>

              <TableCell className="py-4 px-4 text-center border-b border-neutral-200 dark:border-slate-600">
                <span
                  className={`px-3 py-1.5 rounded text-sm font-medium border ${
                    order.status === "Completed"
                      ? "bg-green-600/15 text-green-600 border-green-600"
                      : order.status === "Pending"
                        ? "bg-yellow-500/15 text-yellow-600 border-yellow-500"
                        : "bg-red-500/15 text-red-500 border-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>

              <TableCell
                className={`py-4 px-4 text-center border-b border-r border-neutral-200 dark:border-slate-600 ${
                  isLast ? "rounded-br-lg" : ""
                }`}
              >
                <div className="flex justify-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full text-blue-500 bg-blue-500/10"
                    onClick={() => navigate('/shipments-detail')}
                  >
                    <Eye className="w-5 h-5" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full text-red-500 bg-red-500/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
