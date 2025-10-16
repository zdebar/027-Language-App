import { useUser } from "@/hooks/use-user";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListUserItemsButton() {
  const db = useSQLiteContext();
  const { userInfo } = useUser();

  const handleListUsers = async () => {
    if (!userInfo?.id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const result = await db.getAllAsync(
        `
      SELECT *
      FROM user_items
      WHERE user_id = $1
      LIMIT 10;
      `,
        [userInfo.id]
      );
      console.log("userInfo.id", userInfo.id);
      console.log("User_items list:", result);
    } catch (error) {
      console.error("Error fetching user_items:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log first 10 user_items"
      onPress={handleListUsers}
    />
  );
}
