import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedTextInput } from "@/components/ui/themed-text-input";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/use-user";
import { loginUserService } from "@/scripts/services/user.service";
import { UserError, UserInfo, UserScore } from "@/types/data.types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const db = useSQLiteContext();
  const router = useRouter();
  const { setUserInfo, setUserScore } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const {
        userInfo,
        userScore,
      }: { userInfo: UserInfo; userScore: UserScore } = await loginUserService(
        db,
        data.username,
        data.password
      );
      setUserInfo(userInfo);
      setUserScore(userScore);
      setErrorMessage(null);
      router.replace("/");
    } catch (error: unknown) {
      if (error instanceof UserError) {
        setErrorMessage(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <ThemedView style={LayoutStyling.top}>
      <ThemedText type="title">Login</ThemedText>

      <Controller
        name="username"
        control={control}
        rules={{ required: "Uživatelské jméno je povinné" }}
        render={({ field: { onChange, value } }) => (
          <ThemedTextInput
            style={LayoutStyling.input}
            placeholder="uživatelské jméno"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && (
        <ThemedText type="error">{errors.username.message}</ThemedText>
      )}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Heslo je povinné" }}
        render={({ field: { onChange, value } }) => (
          <ThemedView style={{ position: "relative", width: "100%" }}>
            <ThemedTextInput
              style={LayoutStyling.input}
              placeholder="heslo"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
              style={{
                position: "absolute",
                right: 10,
                top: "47%",
                transform: [{ translateY: -12 }],
              }}
              onPress={() => setShowPassword((prev) => !prev)}
            />
          </ThemedView>
        )}
      />
      {errors.password && (
        <ThemedText type="error">{errors.password.message}</ThemedText>
      )}
      {errorMessage && (
        <ThemedText type="error" style={{ marginBottom: 10 }}>
          {errorMessage}
        </ThemedText>
      )}
      <ThemedButton text="Login" onPress={handleSubmit(onSubmit)} />

      <ThemedText type="link" onPress={handleRegister}>
        Don&apos;t have an account? Register
      </ThemedText>
    </ThemedView>
  );
}
