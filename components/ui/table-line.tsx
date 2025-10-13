import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export function TableLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <ThemedView style={styles.row}>
      <ThemedText>{label}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 0,
    width: "100%",
  },
});
