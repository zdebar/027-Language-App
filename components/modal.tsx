import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import React from "react";
import { Modal, StyleSheet } from "react-native";
import { ThemedView } from "./themed-view";

interface ModalComponentProps {
  visible: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalComponent({
  visible,
  text,
  onConfirm,
  onCancel,
}: ModalComponentProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalView}>
          <ThemedView style={{ alignItems: "center", flex: 1, gap: 10 }}>
            <ThemedText type="default" style={{ textAlign: "center" }}>
              {text}
            </ThemedText>
            <ThemedButton text="Ano" onPress={onConfirm} />
            <ThemedButton text="Zpět" onPress={onCancel} />
          </ThemedView>
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
  },
  modalView: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
