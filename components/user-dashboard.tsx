import { useUser } from "@/hooks/user-user";
import React from "react";
import { TableLine } from "./ui/table-line";

export function UserDashboard() {
  const { userScore } = useUser();

  return (
    <>
      <TableLine
        label="learned today"
        value={String(userScore?.learnedCountToday ?? 0)}
      />
      <TableLine
        label="learned not today"
        value={String(userScore?.learnedCountNotToday ?? 0)}
      />
      <TableLine
        label="practiced today"
        value={String(userScore?.practiceCountToday ?? 0)}
      />
    </>
  );
}
