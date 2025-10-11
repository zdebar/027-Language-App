import { StyleSheet } from "react-native";
import { Colors } from "./theme";

const GlobalStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 230,
    height: 40,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GlobalStyles;
