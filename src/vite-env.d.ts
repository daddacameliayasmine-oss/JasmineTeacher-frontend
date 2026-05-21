/// <reference types="vite/client" />

// Types des variables d'environnement Vite (prefixe VITE_).
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
