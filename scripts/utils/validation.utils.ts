/**
 * Validates that the provided parameters are not null or undefined.
 * @param params - An object where keys are parameter names and values are the parameters to validate.
 * @throws Error if any parameter is null or undefined.
 */
export function validateParams(params: Record<string, any>): void {
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      throw new Error(`Invalid parameter: ${key} is null or undefined.`);
    }
  }
}
