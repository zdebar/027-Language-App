import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function TableLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.cellLabel}>{label}</Text>
      <Text style={styles.cellValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  cellLabel: {
    flex: 3,
    fontSize: 16,
  },
  cellValue: {
    flex: 7,
    fontSize: 16,
  },
});
