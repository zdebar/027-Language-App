import { UserContext } from "@/context/user-context";
import { UserInfo, UserScore } from "@/types/data.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userScore, setUserScore] = useState<UserScore | null>(null);

  // Load user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const storedUserScore = await AsyncStorage.getItem("userScore");

        if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
        if (storedUserScore) setUserScore(JSON.parse(storedUserScore));
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };

    loadUserData();
  }, []);

  // Save userInfo to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserInfo = async () => {
      try {
        if (userInfo) {
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          await AsyncStorage.removeItem("userInfo");
        }
      } catch (error) {
        console.error("Failed to save userInfo to AsyncStorage:", error);
      }
    };

    saveUserInfo();
  }, [userInfo]);

  // Save userScore to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserScore = async () => {
      try {
        if (userScore) {
          await AsyncStorage.setItem("userScore", JSON.stringify(userScore));
        } else {
          await AsyncStorage.removeItem("userScore");
        }
      } catch (error) {
        console.error("Failed to save userScore to AsyncStorage:", error);
      }
    };

    saveUserScore();
  }, [userScore]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        userScore,
        setUserInfo,
        setUserScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
