import { useUser } from "@/hooks/use-user";
import { useRouter } from "expo-router";
import React from "react";
import { ThemedButton } from "./ui/themed-button";

export default function LogoutButton() {
  const { setUserInfo, setUserScore } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUserInfo(null);
    setUserScore(null);
    router.push("/");
  };
  return <ThemedButton text="Logout" onPress={handleLogout} />;
}
