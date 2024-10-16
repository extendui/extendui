import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "button",
    type: "registry:ui",
    registryDependencies: [
      "button",
    ],
    files: [
      "components/ui/button.tsx",
    ],
  },
];