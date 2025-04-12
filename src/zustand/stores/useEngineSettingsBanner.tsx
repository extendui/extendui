import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the variants for the banner
type BannerVariant =
  | 'default'
  | 'primary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline'
  | 'subtle'
  | 'ghost'
  | 'shimmer';

// Define the positions for the banner
type BannerPosition = 'top' | 'bottom' | 'center' | 'static';

// Define the sizes for the banner
type BannerSize = 'default' | 'sm' | 'lg';

// Define the state for the banner settings
type EngineSettingsBannerState = {
  variant: BannerVariant;
  position: BannerPosition;
  size: BannerSize;
  title: string;
  icon: string | React.ReactNode;
  link: string;
  className: string;
  visible: boolean;
};

// Define the actions for the banner settings
type EngineSettingsBannerActions = {
  setVariant: (variant: BannerVariant) => void;
  setPosition: (position: BannerPosition) => void;
  setSize: (size: BannerSize) => void;
  setTitle: (title: string) => void;
  setIcon: (icon: string | React.ReactNode) => void;
  setLink: (link: string) => void;
  setClassName: (className: string) => void;
  setVisible: (visible: boolean) => void;
  resetToDefaults: () => void;
};

// Default settings
const defaultSettings: EngineSettingsBannerState = {
  variant: 'default',
  position: 'top',
  size: 'default',
  title: 'Banner component',
  icon: '🚀',
  link: '#',
  className: '',
  visible: true,
};

// Create the store
export const useEngineSettingsBanner = create(
  immer<EngineSettingsBannerState & EngineSettingsBannerActions>((set) => ({
    ...defaultSettings,

    // Setter methods
    setVariant: (variant) =>
      set((state) => {
        state.variant = variant;
      }),
    setPosition: (position) =>
      set((state) => {
        state.position = position;
      }),
    setSize: (size) =>
      set((state) => {
        state.size = size;
      }),
    setTitle: (title) =>
      set((state) => {
        state.title = title;
      }),
    setIcon: (icon) =>
      set((state) => {
        state.icon = icon;
      }),
    setLink: (link) =>
      set((state) => {
        state.link = link;
      }),
    setClassName: (className) =>
      set((state) => {
        state.className = className;
      }),
    setVisible: (visible) =>
      set((state) => {
        state.visible = visible;
      }),
    resetToDefaults: () =>
      set(() => ({
        ...defaultSettings,
      })),
  })),
);

// Export actions for direct use
export const {
  setVariant,
  setPosition,
  setSize,
  setTitle,
  setIcon,
  setLink,
  setClassName,
  setVisible,
  resetToDefaults,
} = useEngineSettingsBanner.getState();
