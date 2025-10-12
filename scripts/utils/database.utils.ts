import * as SQLite from "expo-sqlite";

const deleteDatabase = async (databaseName = "main.db") => {
  try {
    // Close database connection
    const db = await SQLite.openDatabaseAsync(databaseName);
    await db.closeAsync();

    const dbPath = `${FileSystem.documentDirectory}SQLite/${databaseName}`;

    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(dbPath);

    if (fileInfo.exists) {
      await FileSystem.deleteAsync(dbPath);
      console.log("✅ Database deleted successfully");
    } else {
      console.log("ℹ️ Database file does not exist yet");
    }

    // New database will be created on next SQLite.openDatabase() call
    return true;
  } catch (error) {
    console.log("Error deleting database:", error);
    throw error;
  }
};

export { deleteDatabase };
