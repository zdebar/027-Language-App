import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListGrammarButton() {
  const db = useSQLiteContext();

  const handleListUsers = async () => {
    try {
      const result = await db.getAllAsync(
        `
      SELECT *
      FROM grammar
      LIMIT 10;
      `
      );
      console.log("Grammar list:", result);
    } catch (error) {
      console.error("Error fetching grammar:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log first 10 grammar"
      onPress={handleListUsers}
    />
  );
}
