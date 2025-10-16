import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListTriggersButton() {
  const db = useSQLiteContext();

  const handleListTriggers = async () => {
    try {
      const result = await db.getAllAsync(
        `
        SELECT name, tbl_name, sql
        FROM sqlite_master
        WHERE type = 'trigger';
        `
      );
      console.log("Triggers in the database:", result);
    } catch (error) {
      console.error("Error fetching triggers:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log all triggers"
      onPress={handleListTriggers}
    />
  );
}
