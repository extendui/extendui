import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type EngineSettingsCommandState = {
  disabled: boolean;
  showIcon: boolean;
  placeholder: string;
  labelText: string;
  notFoundText: string;
};

type EngineSettingsCommandActions = {
  setDisabled: (disabled: boolean) => void;
  setPlaceholder: (placeholder: string) => void;
  setLabelText: (labelText: string) => void;
  setShowIcon: (showIcon: boolean) => void;
  setNotFoundText: (notFoundText: string) => void;
};

export const useEngineSettingsCommandStore = create(
  immer<EngineSettingsCommandState & EngineSettingsCommandActions>((set) => ({
    disabled: false,
    showIcon: false,
    placeholder: 'Select status...',
    labelText: 'Select status',
    notFoundText: 'Status not found.',
    setDisabled: (disabled) =>
      set((state) => {
        state.disabled = disabled;
      }),
    setShowIcon: (showIcon) =>
      set((state) => {
        state.showIcon = showIcon;
      }),
    setPlaceholder: (placeholder) =>
      set((state) => {
        state.placeholder = placeholder;
      }),
    setLabelText: (labelText) =>
      set((state) => {
        state.labelText = labelText;
      }),
    setNotFoundText: (notFoundText) =>
      set((state) => {
        state.notFoundText = notFoundText;
      }),
  })),
);

export const { setDisabled, setPlaceholder, setLabelText, setShowIcon, setNotFoundText } =
  useEngineSettingsCommandStore.getState();
