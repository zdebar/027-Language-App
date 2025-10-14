import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListUserItemsButton() {
  const db = useSQLiteContext();

  const handleListUsers = async () => {
    try {
      const result = await db.getAllAsync(
        `
      SELECT *
      FROM user_items
      LIMIT 10;
      `
      );
      console.log("User_items list:", result);
    } catch (error) {
      console.error("Error fetching user_itemss:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log first 10 user_items"
      onPress={handleListUsers}
    />
  );
}
