import { ThemedText } from "@/components/themed-text";
import { LayoutStyling } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", { username, password, passwordRepeat });
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <View style={LayoutStyling.center}>
      <ThemedText type="default" style={styles.title}>
        Login Page
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        secureTextEntry
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
      />
      <Button title="Login" onPress={handleLogin} />

      <ThemedText type="link" onPress={handleRegister}>
        Don&apos;t have an account? Register
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  registerLink: {
    marginTop: 15,
    color: "blue",
    textDecorationLine: "underline",
  },
});
