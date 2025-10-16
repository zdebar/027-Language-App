import Grammar from "@/components/grammar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButtonIcon } from "@/components/ui/themed-button-icon";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/use-user";
import { useAudioPlayer } from "expo-audio";
import { View } from "react-native";

import { ThemedPressable } from "@/components/ui/themed-pressable";
import {
  getPracticeItemService,
  updateUserItemService,
} from "@/scripts/services/practice.sevice";
import { isCzechToEnglish } from "@/scripts/utils/practice.utils";
import { PracticeItem, UserError } from "@/types/data.types";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export default function PracticeScreen() {
  const { userScore, userInfo, setUserScore } = useUser();
  const db = useSQLiteContext();

  const [revealed, setRevealed] = useState(false);
  const [item, setItem] = useState<PracticeItem | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [grammarVisible, setGrammarVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const direction = isCzechToEnglish(item?.progress ?? 0);
  const audioPlayable = Boolean(item?.audio && (revealed || !direction));
  const player = useAudioPlayer();

  const fetchPracticeItem = useCallback(async () => {
    try {
      if (!userInfo?.id) return; // TODO toto vy vůbec nemělo nastat
      const item = await getPracticeItemService(db, userInfo.id);
      setItem(item);
      setRevealed(false);
      setHintIndex(0);
      setError(null);
      console.log("Fetched practice item:", item);
    } catch (error: unknown) {
      console.error("Error in fetchPracticeItem:", error);
      if (error instanceof UserError) {
        setError(error.message);
      } else {
        setError("Neočekávaná chyba.");
      }
    }
  }, [db, userInfo?.id]);

  const updateProgress = useCallback(
    async (progressChange: number) => {
      if (!userInfo?.id || !item) return; // TODO toto vy vůbec nemělo nastat
      const updatedScore = await updateUserItemService(
        db,
        userInfo.id,
        item.id,
        Math.max(0, item.progress + progressChange)
      );
      console.log("Updated user score:", updatedScore); // TODO remove log
      setUserScore(updatedScore);

      await fetchPracticeItem();
    },
    [db, item, userInfo?.id, fetchPracticeItem, setUserScore]
  );

  // useEffect(() => {
  //   if (!userInfo) {
  //     // Redirect to the home page if userInfo is not loaded
  //     navigation.replace("Home"); // Replace ensures the user cannot go back to this page
  //   }
  //   fetchPracticeItem();
  // }, [fetchPracticeItem]);

  return (
    <ThemedView
      style={{
        flex: 1,
        gap: 5,
      }}
    >
      <Grammar
        visible={grammarVisible}
        db={db}
        grammarId={item?.grammarId || null}
        onConfirm={() => setGrammarVisible(false)}
      />
      {/* Card*/}
      <ThemedPressable
        style={{
          height: 240,
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: revealed || !direction ? "gray" : undefined,
        }}
        onPress={() => {}}
      >
        {/* Top card bar*/}
        <ThemedText>{error}</ThemedText>

        {/* Item czech, pronunciation, english*/}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <ThemedText>
            {direction || revealed ? item?.czech : "\u00A0"}
          </ThemedText>
          <ThemedText>
            {revealed ? item?.pronunciation || "\u00A0" : "\u00A0"}
          </ThemedText>
          <ThemedText>
            {revealed || !direction
              ? item?.english
              : item?.english
                  .slice(0, hintIndex ?? item?.english.length)
                  .padEnd(item?.english.length, "\u00A0")}
          </ThemedText>
        </View>

        {/* Bottom card bar - progress, practice today */}
        <View
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
        </View>
      </ThemedPressable>

      {/* Practice Controls */}
      <ThemedView style={LayoutStyling.buttonRow}>
        <ThemedButtonIcon // Grammar
          iconName="more-horiz"
          onPress={() => setGrammarVisible(true)}
          disabled={!item?.grammarId}
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
            onPress={() => setHintIndex((prevIndex) => prevIndex + 1)}
            disabled={hintIndex >= (item?.english.length || 0)}
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
