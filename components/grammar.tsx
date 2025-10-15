import { getGrammarRepository } from "@/scripts/repositories/practice.repository";
import { Grammar as GrammarType } from "@/types/data.types";
import { SQLiteDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { ThemedButton } from "./ui/themed-button";

interface GrammarProps {
  visible: boolean;
  db: SQLiteDatabase;
  grammarId: number | null;
  onConfirm: () => void;
}

export default function Grammar({
  visible,
  db,
  grammarId,
  onConfirm,
}: GrammarProps) {
  const [data, setData] = useState<GrammarType | null>(null);

  useEffect(() => {
    const fetchGrammar = async () => {
      if (grammarId) {
        try {
          const grammar = await getGrammarRepository(db, grammarId);
          setData(grammar);
        } catch (error) {
          console.error("Error fetching grammar:", error);
          setData(null);
        }
      }
    };

    if (visible) {
      fetchGrammar();
    }
  }, [visible, db, grammarId]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onConfirm}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalView}>
          <ThemedText type="title" style={styles.name}>
            {data?.name || "Loading..."}
          </ThemedText>
          <ThemedView style={styles.content}>
            <ThemedText type="default" style={styles.text}>
              {data?.note || "Loading..."}
            </ThemedText>
          </ThemedView>
          <ThemedButton
            text="Zpět"
            onPress={onConfirm}
            style={styles.closeButton}
          />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: "100%",
  },
  modalView: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between", // Space between top, content, and bottom
    alignItems: "center",
    padding: 20,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
    gap: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    marginBottom: 20, // Place the button at the bottom
  },
});
