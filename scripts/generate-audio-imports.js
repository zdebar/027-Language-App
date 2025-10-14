import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const audioDir = join(__dirname, "../assets/audio");
const outputDir = join(__dirname, "../constants");
const outputFile = join(outputDir, "audioImports.ts");

try {
  // Create constants directory if it doesn't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Get all audio files
  const files = readdirSync(audioDir).filter(
    (file) =>
      file.endsWith(".opus") || file.endsWith(".mp3") || file.endsWith(".wav")
  );

  console.log(`Found ${files.length} audio files`);

  // Generate imports
  const imports = files.map((file) => {
    return `  '${file}': require('@/assets/audio/${file}'),`;
  });

  const output = `// Auto-generated file - do not edit manually
export const audioImports = {
${imports.join("\n")}
};

export type AudioFile = keyof typeof audioImports;
`;

  writeFileSync(outputFile, output);
  console.log(`✅ Generated ${outputFile} with ${files.length} imports`);
} catch (error) {
  console.error("❌ Error generating audio imports:", error);
  process.exit(1);
}
