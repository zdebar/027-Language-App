import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListBlocksButton() {
  const db = useSQLiteContext();

  const handleListUsers = async () => {
    try {
      const result = await db.getAllAsync(
        `
      SELECT *
      FROM blocks
      LIMIT 10;
      `
      );
      console.log("Blocks list:", result);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log first 10 blocks"
      onPress={handleListUsers}
    />
  );
}
