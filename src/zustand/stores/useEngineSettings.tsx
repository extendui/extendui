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
  | 'glowingRing';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type EngineSettingsState = {
  loading: boolean;
  variant: Variant;
  size: Size;
};

type EngineSettingsActions = {
  setLoading: (loading: boolean) => void;
  setVariant: (variant: Variant) => void;
  setSize: (size: Size) => void;
};

export const useEngineSettingsStore = create(
  immer<EngineSettingsState & EngineSettingsActions>((set) => ({
    loading: false,
    variant: 'default',
    size: 'default',
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
  })),
);

export const { setLoading, setVariant, setSize } =
  useEngineSettingsStore.getState();
