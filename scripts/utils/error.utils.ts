import { UserError } from "@/types/data.types";

export function handleError(
  error: unknown,
  functionName: string,
  parameters: Record<string, any>
): never {
  const paramsString = Object.entries(parameters)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(", ");

  if (error instanceof UserError) {
    throw error;
  }

  const baseMessage = `Error in ${functionName}. Parameters: ${paramsString}.`;

  if (error instanceof Error) {
    throw new Error(`${baseMessage} Original error: ${error.message}`);
  }

  throw new Error(`${baseMessage} Unknown error occurred.`);
}
