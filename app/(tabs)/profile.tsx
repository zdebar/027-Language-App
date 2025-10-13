import { useUser } from "@/hooks/use-user";
import { Text, View } from "react-native";

export default function ProfileScreen() {
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
