import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed';

type EngineSettingsInputState = {
  variant: Variant;
  disabled: boolean;
  error: boolean;
  required: boolean;
};

type EngineSettingsInputActions = {
  setVariant: (variant: Variant) => void;
  setDisabled: (disabled: boolean) => void;
  setError: (error: boolean) => void;
  setRequired: (required: boolean) => void;
};

export const useEngineSettingsInputStore = create(
  immer<EngineSettingsInputState & EngineSettingsInputActions>((set) => ({
    variant: 'default',
    disabled: false,
    error: false,
    required: false,
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
    setRequired: (required) =>
      set((state) => {
        state.required = required;
      }),
  })),
);

export const { setVariant, setDisabled, setError, setRequired } =
  useEngineSettingsInputStore.getState();
