import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'ringHover'
  | 'glowingRing'
  | 'shimmer'
  | 'perimeterShimmer'
  | 'bouncing';

type Size = 'default' | 'sm' | 'lg' | 'icon';

type EngineSettingsState = {
  loading: boolean;
  variant: Variant;
  size: Size;
  backgroundColor: string;
  tooltipText: string;
};

type EngineSettingsActions = {
  setLoading: (loading: boolean) => void;
  setVariant: (variant: Variant) => void;
  setSize: (size: Size) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setTooltipText: (tooltipText: string) => void;
};

export const useEngineSettingsStore = create(
  immer<EngineSettingsState & EngineSettingsActions>((set) => ({
    loading: false,
    variant: 'default',
    size: 'default',
    backgroundColor: 'primary',
    tooltipText: '',
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
    setVariant: (variant) =>
      set((state) => {
        state.variant = variant;
      }),
    setSize: (size) =>
      set((state) => {
        state.size = size;
      }),
    setBackgroundColor: (backgroundColor) =>
      set((state) => {
        state.backgroundColor = backgroundColor;
      }),
    setTooltipText: (tooltipText) =>
      set((state) => {
        state.tooltipText = tooltipText;
      }),
  })),
);

export const { setLoading, setVariant, setSize, setBackgroundColor, setTooltipText } =
  useEngineSettingsStore.getState();
