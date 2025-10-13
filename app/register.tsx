import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedTextInput } from "@/components/ui/themed-text-input";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/user-user";
import { createUserService } from "@/scripts/services/user.service";
import { UserError, UserInfo, UserScore } from "@/types/data.types";
import { Ionicons } from "@expo/vector-icons"; // Přidáno pro ikony
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function RegisterScreen() {
  const router = useRouter();
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUserInfo, setUserScore } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  useEffect(() => {
    let isMounted = true;
    let databaseInstance: SQLite.SQLiteDatabase | undefined;

    const initializeDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync("language-app.db");
        const result = await database.getFirstAsync<{
          id: number;
          uid: string;
          username: string;
          password: string;
        }>(
          `
          SELECT *
          FROM users u;
          `
        );
        console.log("Query result:", result);
        if (isMounted) {
          setDb(database);
          databaseInstance = database;
        } else {
          await database.closeAsync();
        }
      } catch (error) {
        console.error("Failed to initialize database", error);
      }
    };

    initializeDb();

    return () => {
      isMounted = false;
      if (databaseInstance) {
        databaseInstance.closeAsync().catch((error) => {
          console.error("Failed to close the database", error);
        });
      }
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: {
    username: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }

    try {
      const {
        userInfo,
        userScore,
      }: { userInfo: UserInfo; userScore: UserScore } = await createUserService(
        db,
        data.username,
        data.password
      );
      console.log("Registration successful:", userInfo, userScore);
      setErrorMessage(null);
      setUserInfo(userInfo);
      setUserScore(userScore);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof UserError) {
        setErrorMessage(error.message);
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  return (
    <ThemedView style={LayoutStyling.top}>
      <ThemedText type="title">Registrace</ThemedText>

      <Controller
        name="username"
        control={control}
        rules={{
          required: "Uživatelské jméno je povinné",
          minLength: {
            value: 6,
            message: "Uživatelské jméno musí mít alespoň 6 znaků",
          },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message:
              "Uživatelské jméno může obsahovat pouze písmena, čísla a podtržítka",
          },
        }}
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
        rules={{
          required: "Heslo je povinné",
          minLength: {
            value: 6,
            message: "Heslo musí mít alespoň 6 znaků",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
            message: "Heslo musí obsahovat alespoň jedno písmeno a jedno číslo",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <ThemedView style={{ position: "relative" }}>
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

      <Controller
        name="passwordConfirmation"
        control={control}
        rules={{
          required: "Potvrzení hesla je povinné",
          validate: (value) =>
            value === watch("password") || "Hesla se neshodují",
        }}
        render={({ field: { onChange, value } }) => (
          <ThemedView style={{ position: "relative" }}>
            <ThemedTextInput
              style={LayoutStyling.input}
              placeholder="potvrzení hesla"
              secureTextEntry={!showPasswordConfirmation}
              value={value}
              onChangeText={onChange}
            />
            <Ionicons
              name={showPasswordConfirmation ? "eye-off" : "eye"}
              size={24}
              color="gray"
              style={{
                position: "absolute",
                right: 10,
                top: "47%",
                transform: [{ translateY: -12 }],
              }}
              onPress={() => setShowPasswordConfirmation((prev) => !prev)}
            />
          </ThemedView>
        )}
      />
      {errors.passwordConfirmation && (
        <ThemedText type="error">
          {errors.passwordConfirmation.message}
        </ThemedText>
      )}

      {errorMessage && (
        <ThemedText type="error" style={{ marginBottom: 10 }}>
          {errorMessage}
        </ThemedText>
      )}

      <ThemedButton text="Registrace" onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  );
}
