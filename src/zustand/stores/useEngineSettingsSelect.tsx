import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed';

type EngineSettingsSelectState = {
  variant: Variant;
  disabled: boolean;
  error: boolean;
  showIcon: boolean;
  changeOpenIcon: boolean;
  leftText: string;
  placeholder: string;
  helperText: string;
};

type EngineSettingsSelectActions = {
  setVariant: (variant: Variant) => void;
  setDisabled: (disabled: boolean) => void;
  setError: (error: boolean) => void;
  setLeftText: (leftText: string) => void;
  setPlaceholder: (placeholder: string) => void;
  setHelperText: (helperText: string) => void;
  setShowIcon: (showIcon: boolean) => void;
  setChangeOpenIcon: (changeOpenIcon: boolean) => void;
};

export const useEngineSettingsSelectStore = create(
  immer<EngineSettingsSelectState & EngineSettingsSelectActions>((set) => ({
    variant: 'default',
    disabled: false,
    error: false,
    showIcon: false,
    changeOpenIcon: false,
    leftText: '',
    placeholder: 'Select a fruit',
    helperText: '',
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
    setShowIcon: (showIcon) =>
      set((state) => {
        state.showIcon = showIcon;
      }),
    setChangeOpenIcon: (changeOpenIcon) =>
      set((state) => {
        state.changeOpenIcon = changeOpenIcon;
      }),
    setLeftText: (leftText) =>
      set((state) => {
        state.leftText = leftText;
      }),
    setPlaceholder: (placeholder) =>
      set((state) => {
        state.placeholder = placeholder;
      }),
    setHelperText: (helperText) =>
      set((state) => {
        state.helperText = helperText;
      }),
  })),
);

export const { setVariant, setDisabled, setError, setLeftText, setPlaceholder, setHelperText, setShowIcon, setChangeOpenIcon } =
  useEngineSettingsSelectStore.getState();
