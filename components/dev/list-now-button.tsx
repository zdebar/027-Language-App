import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListNowButton() {
  const db = useSQLiteContext();

  const handleNow = async () => {
    try {
      const result = await db.getAllAsync(
        `
      SELECT datetime('now', 'localtime');
      `
      );
      console.log("Now:", result);
    } catch (error) {
      console.error("Error fetching now:", error);
    }
  };

  return <ThemedButton text="Console log now" onPress={handleNow} />;
}
