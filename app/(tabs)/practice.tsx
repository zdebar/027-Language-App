import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButtonIcon } from "@/components/ui/themed-button-icon";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/use-user";
import {
  getPracticeItemService,
  updateUserItemService,
} from "@/scripts/services/practice.sevice";
import { PracticeItem } from "@/types/data.types";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export default function PracticeScreen() {
  const { userScore, userInfo } = useUser();
  const db = useSQLiteContext();

  const [revealed, setRevealed] = useState(false);
  const [item, setItem] = useState<PracticeItem | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [infoVisibility, setInfoVisibility] = useState(false);

  const fetchPracticeItem = useCallback(async () => {
    if (!userInfo?.id) return;
    const item = await getPracticeItemService(db, userInfo.id);
    console.log("Fetched practice item:", item);
    setItem(item);
    setRevealed(false);
  }, [db, userInfo?.id]);

  useEffect(() => {
    fetchPracticeItem();
  }, [fetchPracticeItem]);

  const updateProgress = useCallback(
    async (progressChange: number) => {
      if (!userInfo?.id || !item) return;
      const updatedScore = await updateUserItemService(
        db,
        userInfo.id,
        item.id,
        Math.max(0, item.progress + progressChange)
      );
      console.log("Updated user score:", updatedScore);

      try {
        const result = await db.getAllAsync(
          `
      SELECT *
      FROM user_items;
      `
        );
        console.log("All user_items:", result);
      } catch (error) {
        console.error("Error fetching user_items:", error);
      }

      await fetchPracticeItem();
    },
    [db, item, userInfo?.id, fetchPracticeItem]
  );

  return (
    <ThemedView
      style={{
        flex: 1,
        gap: 5,
      }}
    >
      <ThemedView
        style={{
          height: 240,
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ThemedView></ThemedView>
        <ThemedView
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <ThemedText>{item?.czech}</ThemedText>
          <ThemedText>{item?.pronunciation}</ThemedText>
          <ThemedText>{item?.english}</ThemedText>
        </ThemedView>

        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: 20,
          }}
        >
          <ThemedText>{item?.progress}</ThemedText>
          <ThemedText>{userScore?.practiceCountToday}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={LayoutStyling.buttonRow}>
        <ThemedButtonIcon // Grammar
          iconName="more-horiz"
          onPress={() => console.log("Pressed")}
          disabled={!revealed}
        />
        <ThemedButtonIcon // Skip item forever
          iconName="skip-next"
          onPress={() => updateProgress(100)}
          disabled={!revealed}
        />
      </ThemedView>
      {!revealed ? (
        <ThemedView style={LayoutStyling.buttonRow}>
          <ThemedButtonIcon // Hint
            iconName="lightbulb-outline"
            onPress={() => console.log("Pressed")}
          />
          <ThemedButtonIcon // Reveal
            iconName="remove-red-eye"
            onPress={() => setRevealed(true)}
          />
        </ThemedView>
      ) : (
        <ThemedView style={LayoutStyling.buttonRow}>
          <ThemedButtonIcon // Minus progress
            iconName="exposure-minus-1"
            onPress={() => updateProgress(-1)}
          />
          <ThemedButtonIcon // Plus progress
            iconName="exposure-plus-1"
            onPress={() => updateProgress(1)}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}
