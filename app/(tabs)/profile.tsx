import LogoutButton from "@/components/logout-button";
import ModalComponent from "@/components/modal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/use-user";
import { resetUserService } from "@/scripts/services/overview.service";
import { UserError, UserScore } from "@/types/data.types";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export default function ProfileScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { userInfo, setUserScore } = useUser();
  const db = useSQLiteContext();

  const handleItemsOverview = async () => {
    // link to items overview screen
  };

  const handleGrammarOverview = () => {
    // Navigate to grammar overview screen
  };

  const handleRestartLanguage = async () => {
    try {
      const newScore: UserScore = await resetUserService(db, userInfo!.id);
      setUserScore(newScore);
      setErrorMessage(null);
      console.log("Language progress has been reset.");
    } catch (error: unknown) {
      if (error instanceof UserError) {
        setErrorMessage(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  return (
    <ThemedView style={LayoutStyling.top}>
      <ModalComponent
        visible={modalVisible}
        text="Jste si jisti, že chcete restartovat pokrok učení? Tuto akci nelze vrátit zpět."
        onConfirm={() => {
          handleRestartLanguage();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
      <ThemedText>Welcome to your profile, {userInfo?.username}!</ThemedText>
      <ThemedButton text="Items overview" onPress={handleItemsOverview} />
      <ThemedButton text="Grammar overview" onPress={handleGrammarOverview} />
      <ThemedButton
        text="Restart language"
        onPress={() => setModalVisible(true)}
      />
      <LogoutButton />
      {errorMessage && (
        <ThemedText type="error" style={{ marginBottom: 10 }}>
          {errorMessage}
        </ThemedText>
      )}
    </ThemedView>
  );
}
