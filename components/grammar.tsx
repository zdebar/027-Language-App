import { Grammar as GrammarType } from "@/types/data.types";
import { SQLiteDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Modal, Text, View } from "react-native";

interface GrammarProps {
  visible: boolean;
  db: SQLiteDatabase;
  grammarId: number | null;
  onConfirm: () => void;
}

const Grammar: React.FC<GrammarProps> = ({
  visible,
  db,
  grammarId,
  onConfirm,
}) => {
  const [data, setData] = useState<GrammarType | null>(null);

  const getGrammarRepository = async (
    db: SQLiteDatabase,
    grammarId: number
  ): Promise<GrammarType> => {
    const grammar = {
      id: grammarId,
      name: "Ukázkový název gramatiky",
      note: "Toto je ukázková poznámka k pravidlu gramatiky.",
    };
    return new Promise((resolve) => setTimeout(() => resolve(grammar), 500));
  };

  useEffect(() => {
    if (visible && grammarId) {
      getGrammarRepository(db, grammarId)
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error("Error fetching grammar:", error);
          setData({ id: 0, name: "Chyba", note: "Chyba při načítání dat." });
        });
    }
  }, [visible, db, grammarId]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          {data ? (
            <>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                {data.name}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "center" }}>
                {data.note}
              </Text>
            </>
          ) : (
            <Text>Načítám...</Text>
          )}
          <Button title="Zavřít" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

export default Grammar;
