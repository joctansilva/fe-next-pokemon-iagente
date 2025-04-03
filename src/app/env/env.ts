import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    POKEMON_SERVICE_URL: z.string().url(),
    SERVER_VARIABLE: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_CLIENT_VARIABLE: z.string().url(),
  },
  runtimeEnv:{
    NEXT_PUBLIC_CLIENT_VARIABLE: process.env.NEXT_PUBLIC_CLIENT_VARIABLE,
    POKEMON_SERVICE_URL: process.env.POKEMON_SERVICE_URL,
    SERVER_VARIABLE: process.env.SERVER_VARIABLE,
  },
})

