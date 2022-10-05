declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_URL: string;
    }
  }
}

export {};
