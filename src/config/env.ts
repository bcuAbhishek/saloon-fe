import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_BASE_URL: z.url(),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
 
  });

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }

  return parsed.data;
};

export const env = parseEnv();
