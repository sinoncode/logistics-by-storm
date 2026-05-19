import { DataTable }
  from "@/components/tables/users/data-tables";

import {
  columns,
} from "@/components/tables/users/column";

import type {
  Customer,
} from "@/store/customerStore";

interface Props {
  users: Customer[];
}

export default function UsersListTable({
  users,
}: Props) {

  return (
    <DataTable
      columns={columns}
      data={users}
    />
  );
}