"use client";

import { Button } from "@/components/ui/button";
import { useEngineSettingsStore } from "@/zustand/stores/useEngineSettings";

export default function ButtonExample() {
    const loading = useEngineSettingsStore((state) => state.loading);
    const variant = useEngineSettingsStore((state) => state.variant);
    const size = useEngineSettingsStore((state) => state.size);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={() => console.log("clicked")}
                disabled={loading}
            >
                {size === "icon" ? null : "Button"}
            </Button>
        </>
    );
}
