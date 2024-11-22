
import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';

type Props = {
  componentName: string;
  state: Record<string, any>;
};

export async function loadComponentCode({ componentName, state }: Props) {
  switch (componentName) {
    /* Button */
    case 'ButtonExample':
      const { getButtonExampleCode } = await import(
        '@/showcase/codes/button/button-code'
      );
      return getButtonExampleCode(state);
    case 'RotatingButton':
      const { getButtonRotatingCode } = await import(
        '@/showcase/codes/button/button-rotating-code'
      );
      return getButtonRotatingCode();
    case 'Rotating3DButton':
      const { getButton3DRotatingCode } = await import(
        '@/showcase/codes/button/button-3d-rotating-code'
      );
      return getButton3DRotatingCode();
    case 'PulsatingShadowButton':
      const { getButtonPulsatingCode } = await import(
        '@/showcase/codes/button/button-pulsating-code'
      );
      return getButtonPulsatingCode();
    case 'ScalingButton':
      const { getButtonScalingCode } = await import(
        '@/showcase/codes/button/button-scaling-code'
      );
      return getButtonScalingCode();
    case 'BouncingButton':
      const { getButtonBouncingCode } = await import(
        '@/showcase/codes/button/button-bouncing-code'
      );
      return getButtonBouncingCode();
    /* Input */
    case 'InputExample':
      const { getInputExampleCode } = await import(
        '@/showcase/codes/input/input-code'
      );
      return getInputExampleCode(state);
    case 'InputIconLeft':
      const { getInputIconLeftCode } = await import(
        '@/showcase/codes/input/input-iconLeft-code'
      );
      return getInputIconLeftCode();
    case 'InputIconRight':
      const { getInputIconRightCode } = await import(
        '@/showcase/codes/input/input-iconRight-code'
      );
      return getInputIconRightCode();
    case 'InputPassword':
      const { getInputPasswordCode } = await import(
        '@/showcase/codes/input/input-password-code'
      );
      return getInputPasswordCode();
    case 'InputClear':
      const { getInputClearCode } = await import(
        '@/showcase/codes/input/input-clear-code'
      );
      return getInputClearCode();
    case 'InputLabel':
      const { getInputLabelCode } = await import(
        '@/showcase/codes/input/input-label-code'
      );
      return getInputLabelCode();
    case 'InputExtended':
      const { getInputExtendedCode } = await import(
        '@/showcase/codes/input/input-extended-code'
      );
      return getInputExtendedCode();
    case 'InputSelectRight':
      const { getInputSelectRightCode } = await import(
        '@/showcase/codes/input/input-selectRight-code'
      );
      return getInputSelectRightCode();
    case 'InputSelectLeft':
      const { getInputSelectLeftCode } = await import(
        '@/showcase/codes/input/input-selectLeft-code'
      );
      return getInputSelectLeftCode();
    case 'InputButton':
      const { getInputButtonCode } = await import(
        '@/showcase/codes/input/input-buttonRight-code'
      );
      return getInputButtonCode();
    case 'InputDecreaseIncrease':
      const { getInputDecreaseIncreaseCode } = await import(
        '@/showcase/codes/input/input-decrease-increase-code'
      );
      return getInputDecreaseIncreaseCode();
    case 'FileInput':
      const { getInputFileCode } = await import(
        '@/showcase/codes/input/input-file-code'
      );
      return getInputFileCode();
    case 'PricingCard':
      const { getPricingCardCode } = await import(
        '@/showcase/codes/blocks/cards/pricing-card-code'
      );
      return getPricingCardCode();
    case 'CreditCard01':
      const { getCreditCard01Code } = await import(
        '@/showcase/codes/blocks/cards/credit-card-01-code'
      );
      return getCreditCard01Code();
    case 'CreditCard02':
      const { getCreditCard02Code } = await import(
        '@/showcase/codes/blocks/cards/credit-card-02-code'
      );
      return getCreditCard02Code();
    default:
      throw new Error(`Component "${componentName}" not supported.`);
  }
}

export type ComponentStateConfigProps = Record<
  string,
  {
    state: string[] | null;
    store: any;
  }
>;

export const componentStateConfig: ComponentStateConfigProps = {
  ButtonExample: {
    state: ['loading', 'variant', 'size', 'tooltipText'],
    store: useEngineSettingsStore,
  },
  InputExample: {
    state: ['variant', 'label', 'error', 'disabled', 'required'],
    store: useEngineSettingsInputStore,
  },
};
