// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
  }
}
