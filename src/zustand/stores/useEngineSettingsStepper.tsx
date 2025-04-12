import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'dotted' | 'outline';
type Orientation = 'horizontal' | 'vertical';

type EngineSettingsStepperState = {
  variant: Variant;
  orientation: Orientation;
  activeStep: number;
  disabled: boolean;
  loading: boolean;
  separatorWidth: number;
  completed: boolean;
};

type EngineSettingsStepperActions = {
  setVariant: (variant: Variant) => void;
  setOrientation: (orientation: Orientation) => void;
  setActiveStep: (activeStep: number) => void;
  setDisabled: (disabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSeparatorWidth: (separatorWidth: number) => void;
  setCompleted: (completed: boolean) => void;
};

export const useEngineSettingsStepperStore = create(
  immer<EngineSettingsStepperState & EngineSettingsStepperActions>((set) => ({
    variant: 'default',
    orientation: 'horizontal',
    activeStep: 0,
    disabled: false,
    loading: false,
    separatorWidth: 50,
    completed: false,
    setVariant: (variant) =>
      set((state) => {
        state.variant = variant;
      }),
    setOrientation: (orientation) =>
      set((state) => {
        state.orientation = orientation;
      }),
    setActiveStep: (activeStep) =>
      set((state) => {
        state.activeStep = activeStep;
      }),
    setDisabled: (disabled) =>
      set((state) => {
        state.disabled = disabled;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
    setSeparatorWidth: (separatorWidth) =>
      set((state) => {
        state.separatorWidth = separatorWidth;
      }),
    setCompleted: (completed) =>
      set((state) => {
        state.completed = completed;
      }),
  })),
);

export const {
  setVariant,
  setOrientation,
  setActiveStep,
  setDisabled,
  setLoading,
  setSeparatorWidth,
  setCompleted,
} = useEngineSettingsStepperStore.getState();
