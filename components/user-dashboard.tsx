import { UserScore } from "@/types/data.types";
import React from "react";
import { TableLine } from "./ui/table-line";

export function UserDashboard({ user }: { user: UserScore | null }) {
  return (
    <>
      <TableLine
        label="learned today"
        value={String(user?.learnedCountToday)}
      />
      <TableLine
        label="learned not today"
        value={String(user?.learnedCountNotToday)}
      />
      <TableLine
        label="practiced today"
        value={String(user?.practiceCountToday)}
      />
    </>
  );
}
