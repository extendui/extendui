import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: [
      '@radix-ui/react-slot'
    ],
    files: [
      "components/ui/button.tsx"
    ],
  },
];