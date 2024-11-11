import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed';

type EngineSettingsInputState = {
  variant: Variant;
  disabled: boolean;
  error: boolean;
};

type EngineSettingsInputActions = {
  setVariant: (variant: Variant) => void;
  setDisabled: (disabled: boolean) => void;
  setError: (error: boolean) => void;
};

export const useEngineSettingsInputStore = create(
  immer<EngineSettingsInputState & EngineSettingsInputActions>((set) => ({
    variant: 'default',
    disabled: false,
    error: false,
    setVariant: (variant) =>
      set((state) => {
        state.variant = variant;
      }),
    setDisabled: (disabled) =>
      set((state) => {
        state.disabled = disabled;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);

export const { setVariant, setDisabled, setError } =
  useEngineSettingsInputStore.getState();
