"use client";

import { useEffect } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import Breadcrumb from "@/layouts/Breadcrumb";

import LazyWrapper from "@/components/LazyWrapper";

import { DataTable } from "@/components/tables/users/data-tables";

import { columns } from "@/components/tables/teams/columns";

import { useTeamStore } from "@/store/teamStore";

const TeamsList = () => {
  const {
    members,
    roleLoading,
    fetchMembers,
  } = useTeamStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <>
      <Breadcrumb
        title="Teams List"
        text="Teams List"
      />

      <LazyWrapper>
        <Card className="border-0 overflow-hidden">
          <CardContent className="p-6">
            <DataTable
              columns={columns}
              data={members}
              loading={roleLoading}
            />
          </CardContent>
        </Card>
      </LazyWrapper>
    </>
  );
};

export default TeamsList;