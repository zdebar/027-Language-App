import { useUser } from "@/hooks/use-user";
import { Text, View } from "react-native";

export default function PracticeScreen() {
  const { userInfo } = useUser();

  return (
    <View>
      <Text>
        {userInfo
          ? `Welcome to your profile, ${userInfo.username}!`
          : "Loading profile..."}
      </Text>
    </View>
  );
}
