import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant =
  | 'default'
  | 'outline'


type EngineSettingsInputState = {
  variant: Variant;
  label: string;
};

type EngineSettingsInputActions = {
  setVariant: (variant: Variant) => void;
  setLabel: (label: string) => void;
};

export const useEngineSettingsInputStore = create(
  immer<EngineSettingsInputState & EngineSettingsInputActions>((set) => ({
    variant: 'default',
    label: 'Input',
    setVariant: (variant) =>
      set((state) => {
        state.variant = variant;
      }),
    setLabel: (label) =>
      set((state) => {
        state.label = label;
      }),
  })),
);

export const { setVariant, setLabel } =
  useEngineSettingsInputStore.getState();
