import audioMap from "@/assets/audioMap"; // Import the audio mapping
import { useAudioPlayer } from "expo-audio";

export const useAudio = (audioKey: string) => {
  const audioSource = audioMap[audioKey]; // Get the audio file from the mapping
  const player = useAudioPlayer(audioSource); // Initialize the audio player

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
