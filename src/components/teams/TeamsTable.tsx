"use client";

import { useEffect }
from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import Breadcrumb
from "@/layouts/Breadcrumb";

import LazyWrapper
from "@/components/LazyWrapper";

import { DataTable }
from "@/components/tables/users/data-tables";

import { columns }
from "@/components/tables/teams/columns";

import { useTeamStore }
from "@/store/teamStore";

const TeamsList = () => {

  const {
    members,
    roleLoading,
    fetchMembers,
  } = useTeamStore();

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <Breadcrumb
        title="Teams List"
        text="Teams List"
      />

      <LazyWrapper>

        <Card className="border-0 overflow-hidden">

          <CardContent className="p-6">

            {roleLoading ? (
              <div className="py-20 text-center">
                Loading team members...
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={members}
              />
            )}

          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default TeamsList;