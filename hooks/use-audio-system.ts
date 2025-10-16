import { useAudioPlayer } from "expo-audio";

export const useAudio = (fileName: string) => {
  const audioDir = `${FileSystem.documentDirectory}audio/`; // Directory where files are stored
  const audioPath = `${audioDir}${fileName}`; // Full path to the audio file

  const player = useAudioPlayer(audioPath); // Initialize the audio player with the file path

  const play = () => {
    try {
      player.play(); // Play the audio
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const replay = () => {
    try {
      player.seekTo(0); // Reset playback to the beginning
      player.play(); // Replay the audio
    } catch (error) {
      console.error("Error replaying audio:", error);
    }
  };

  return { play, replay };
};
