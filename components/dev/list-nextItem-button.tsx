import { useUser } from "@/hooks/use-user";
import { PracticeItem } from "@/types/data.types";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { ThemedButton } from "../ui/themed-button";

export default function ListNextItemsButton() {
  const db = useSQLiteContext();
  const { userInfo } = useUser();

  const handleListUsers = async () => {
    if (!userInfo?.id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const items = await db.getAllAsync<PracticeItem>(
        `
        SELECT  
          i.id,
          i.czech,
          i.english,
          i.pronunciation,
          i.audio,
          COALESCE(ui.progress, 0) AS progress,
          g.id AS grammarId
        FROM items i
        LEFT JOIN user_items ui 
          ON i.id = ui.item_id 
          AND ui.user_id = $1
        LEFT JOIN blocks b ON i.block_id = b.id
        LEFT JOIN grammar g ON b.grammar_id = g.id
        WHERE ui.mastered_at IS NULL 
          AND (ui.next_at IS NULL OR ui.next_at < datetime('now', 'localtime'))
        ORDER BY 
          ui.progress % 2 DESC,
          ui.next_at ASC NULLS LAST,
          COALESCE(b.sequence, i.sequence) ASC NULLS LAST,
          i.sequence ASC NULLS LAST
        LIMIT 10;
            `,
        [userInfo.id]
      );
      console.log("Next items list:", items);
    } catch (error) {
      console.error("Error fetching next items:", error);
    }
  };

  return (
    <ThemedButton text="Console log next 10 items" onPress={handleListUsers} />
  );
}
