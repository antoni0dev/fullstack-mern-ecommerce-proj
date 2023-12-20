/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Previously defined environment variables
  readonly VITE_APP_TITLE: string;

  // Add your new environment variables here
  readonly VITE_NODE_ENV: string;
  readonly VITE_PAYPAL_CLIENT_ID: string;
  // ... any other environment variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
