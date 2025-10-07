import { UserInfo, UserScore } from "@/types/data.types";
import { createContext } from "react";

export interface UserContextType {
  userInfo: UserInfo | null;
  userScore: UserScore | null;
  setUserInfo: (user: UserInfo | null) => void;
  setUserScore: (score: UserScore | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
