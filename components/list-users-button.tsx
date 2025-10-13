import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "./ui/themed-button";

export default function ListUsersButton() {
  const db = useSQLiteContext();

  const handleListUsers = async () => {
    const result = await db.getAllAsync(
      `
    SELECT 
      id,
      username
    FROM users u
    ORDER BY u.id ASC;
    `
    );
    console.log("Users list:", result);
  };

  return <ThemedButton text="List Users" onPress={handleListUsers} />;
}
