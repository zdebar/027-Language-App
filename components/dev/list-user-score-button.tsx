import { useUser } from "@/hooks/use-user";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListUserScoreButton() {
  const db = useSQLiteContext();
  const { userInfo } = useUser();

  const handleListUserScore = async () => {
    if (!userInfo?.id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const result = await db.getAllAsync(
        `
      SELECT *
      FROM user_score
      WHERE user_id = $1
      ORDER BY date DESC
      LIMIT 10;
      `,
        [userInfo.id]
      );
      console.log("User_score list:", result);
    } catch (error) {
      console.error("Error fetching user_score:", error);
    }
  };

  return (
    <ThemedButton
      text="Console log last 10 user_score"
      onPress={handleListUserScore}
    />
  );
}
