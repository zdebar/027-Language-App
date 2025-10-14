import { useUser } from "@/hooks/use-user";
import React from "react";
import { TableLine } from "./ui/table-line";

export function UserDashboard() {
  const { userScore } = useUser();

  return (
    <>
      <TableLine
        label="learned today"
        value={String(userScore?.learnedCountToday)}
      />
      <TableLine
        label="learned not today"
        value={String(userScore?.learnedCountNotToday)}
      />
      <TableLine
        label="practiced today"
        value={String(userScore?.practiceCountToday)}
      />
    </>
  );
}
