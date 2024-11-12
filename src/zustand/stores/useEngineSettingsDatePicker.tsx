import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed';

type EngineSettingsDatePickerState = {
  variant: Variant;
  disabled: boolean;
  error: boolean;
};

type EngineSettingsDatePickerActions = {
  setVariant: (variant: Variant) => void;
  setDisabled: (disabled: boolean) => void;
  setError: (error: boolean) => void;
};

export const useEngineSettingsDatePickerStore = create(
  immer<EngineSettingsDatePickerState & EngineSettingsDatePickerActions>((set) => ({
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
  useEngineSettingsDatePickerStore.getState();
