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

  loading: boolean;
}

export default function UsersListTable({
  users,loading
}: Props) {

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
    />
  );
}