import { UserProvider } from "@/context/user-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUser } from "@/hooks/user-user";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SQLiteProvider
          databaseName="language-app.db"
          assetSource={{
            assetId: require("@/assets/database/language-app.db"),
          }}
        >
          <UserDependentStack />
          <StatusBar style="auto" />
        </SQLiteProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

function UserDependentStack() {
  const { userInfo } = useUser();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={!userInfo}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
}
