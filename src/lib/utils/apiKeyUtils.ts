// utils/apiKeyUtils.ts

interface EnvVariables {
  [key: string]: string | undefined;
}

export function getRandomApiKey(): string {
  // Use a client-safe way to access environment variables
  const env: EnvVariables = {
    API_KEY_1: process.env.API_KEY_1,
    API_KEY_2: process.env.API_KEY_2,
    API_KEY_3: process.env.API_KEY_3,
    API_KEY_4: process.env.API_KEY_4,
  };

  // Filter out the API key environment variables
  const apiKeys = Object.entries(env)
    .filter(([key, value]) => key.startsWith("API_KEY_") && value)
    .map(([, value]) => value as string);

  if (apiKeys.length === 0) {
    throw new Error("No API keys found in environment variables");
  }

  // Select a random API key
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}
