import ListItemsButton from "@/components/list-items-button";
import { ThemedView } from "@/components/themed-view";
import { ThemedButtonIcon } from "@/components/ui/themed-button-icon";
import { LayoutStyling } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUser } from "@/hooks/use-user";
import { getPracticeItemService } from "@/scripts/services/practice.sevice";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export default function PracticeScreen() {
  const { userScore, userInfo } = useUser();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  const [revealed, setRevealed] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [infoVisibility, setInfoVisibility] = useState(false);

  useEffect(() => {
    const fetchPracticeItem = async () => {
      if (!userInfo?.id) return;
      const item = await getPracticeItemService(db, userInfo.id);
      console.log(item);
    };

    fetchPracticeItem();
  }, [db, userInfo?.id]);

  return (
    <ThemedView
      style={{
        flex: 1,
        gap: 5,
      }}
    >
      <ThemedView style={LayoutStyling.buttonRow}>
        <ThemedButtonIcon // Grammar
          iconName="more-horiz"
          onPress={() => console.log("Pressed")}
          disabled={!revealed}
        />
        <ThemedButtonIcon // Skip item forever
          iconName="skip-next"
          onPress={() => console.log("Pressed")}
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
          <ThemedButtonIcon // Plus progress
            iconName="exposure-plus-1"
            onPress={() => console.log("Pressed")}
          />
          <ThemedButtonIcon // Minus progress
            iconName="exposure-minus-1"
            onPress={() => console.log("Pressed")}
          />
        </ThemedView>
      )}
      <ListItemsButton />
    </ThemedView>
  );
}
