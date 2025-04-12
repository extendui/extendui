import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant = 'default' | 'filled' | 'flushed' | 'flushedfilled' | 'dashed';
type CalendarVariant = 'default' | 'glowingRing' | 'outline';

type EngineSettingsDatePickerState = {
  variant: Variant;
  calendarVariant: CalendarVariant;
  disabled: boolean;
  error: boolean;
};

type EngineSettingsDatePickerActions = {
  setVariant: (variant: Variant) => void;
  setCalendarVariant: (variant: CalendarVariant) => void;
  setDisabled: (disabled: boolean) => void;
  setError: (error: boolean) => void;
};

export const useEngineSettingsDatePickerStore = create(
  immer<EngineSettingsDatePickerState & EngineSettingsDatePickerActions>(
    (set) => ({
      variant: 'default',
      disabled: false,
      error: false,
      calendarVariant: 'default',
      setVariant: (variant) =>
        set((state) => {
          state.variant = variant;
        }),
      setCalendarVariant: (variant) =>
        set((state) => {
          state.calendarVariant = variant;
        }),
      setDisabled: (disabled) =>
        set((state) => {
          state.disabled = disabled;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
    }),
  ),
);

export const { setVariant, setCalendarVariant, setDisabled, setError } =
  useEngineSettingsDatePickerStore.getState();
