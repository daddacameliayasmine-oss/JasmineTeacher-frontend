import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Tests unitaires / composants : jsdom pour simuler le DOM,
// React plugin pour transformer le JSX, tests dans src/__tests__/.
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/**/*.test.{ts,tsx}"],
    },
  },
});
