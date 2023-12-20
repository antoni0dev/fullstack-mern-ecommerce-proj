/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Define your environment variables here, for example:
  readonly VITE_APP_TITLE: string;
  // ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
