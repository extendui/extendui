import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings';
import { useEngineSettingsBanner } from '@/zustand/stores/useEngineSettingsBanner';
import { useEngineSettingsCommandStore } from '@/zustand/stores/useEngineSettingsCommand';
import { useEngineSettingsDatePickerStore } from '@/zustand/stores/useEngineSettingsDatePicker';
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';
import { useEngineSettingsStepperStore } from '@/zustand/stores/useEngineSettingsStepper';

type Props = {
  componentName: string;
  state: Record<string, any>;
};

export async function loadComponentCode({ componentName, state }: Props) {
  switch (componentName) {
    case 'BannerExample': {
      const { getBannerExampleCode } = await import(
        '@/showcase/codes/banner/banner-code'
      );
      return getBannerExampleCode(state);
    }
    case 'Banner': {
      const { getBannerCode } = await import(
        '@/showcase/codes/banner/ui-banner-code'
      );
      return getBannerCode();
    }
    /* Button */
    case 'Button': {
      const { getButtonCode } = await import(
        '@/showcase/codes/button/ui-button-code'
      );
      return getButtonCode();
    }
    case 'ButtonExample': {
      const { getButtonExampleCode } = await import(
        '@/showcase/codes/button/button-code'
      );
      return getButtonExampleCode(state);
    }
    case 'RotatingButton': {
      const { getButtonRotatingCode } = await import(
        '@/showcase/codes/button/button-rotating-code'
      );
      return getButtonRotatingCode();
    }
    case 'Rotating3DButton': {
      const { getButton3DRotatingCode } = await import(
        '@/showcase/codes/button/button-3d-rotating-code'
      );
      return getButton3DRotatingCode();
    }
    case 'PulsatingShadowButton': {
      const { getButtonPulsatingCode } = await import(
        '@/showcase/codes/button/button-pulsating-code'
      );
      return getButtonPulsatingCode();
    }
    case 'ScalingButton': {
      const { getButtonScalingCode } = await import(
        '@/showcase/codes/button/button-scaling-code'
      );
      return getButtonScalingCode();
    }
    case 'BouncingButton': {
      const { getButtonBouncingCode } = await import(
        '@/showcase/codes/button/button-bouncing-code'
      );
      return getButtonBouncingCode();
    }
    case 'ExpandingDotButton': {
      const { getButtonExpandingDotCode } = await import(
        '@/showcase/codes/button/button-expanding-dot-code'
      );
      return getButtonExpandingDotCode();
    }
    case 'PulsatingOutlineShadowButton': {
      const { getButtonPulsatingOutlineShadowCode } = await import(
        '@/showcase/codes/button/button-pulsating-outline-shadow-code'
      );
      return getButtonPulsatingOutlineShadowCode();
    }
    case 'FlipButtonX': {
      const { getButtonFlipXCode } = await import(
        '@/showcase/codes/button/button-flipX-code'
      );
      return getButtonFlipXCode();
    }
    case 'FlipButtonY': {
      const { getButtonFlipYCode } = await import(
        '@/showcase/codes/button/button-flipY-code'
      );
      return getButtonFlipYCode();
    }
    case 'SendingButton01': {
      const { getButtonSending01Code } = await import(
        '@/showcase/codes/button/button-sending-01-code'
      );
      return getButtonSending01Code();
    }
    case 'SendingButton02': {
      const { getButtonSending02Code } = await import(
        '@/showcase/codes/button/button-sending-02-code'
      );
      return getButtonSending02Code();
    }
    case 'ButtonSunscribe': {
      const { getButtonSubscribeCode } = await import(
        '@/showcase/codes/button/button-subscribe-code'
      );
      return getButtonSubscribeCode();
    }
    case 'ButtonSlide': {
      const { getButtonSlideCode } = await import(
        '@/showcase/codes/button/button-slide-code'
      );
      return getButtonSlideCode();
    }
    case 'ButtonClickSlide': {
      const { getButtonClickSlideCode } = await import(
        '@/showcase/codes/button/button-click-slide-code'
      );
      return getButtonClickSlideCode();
    }
    /* Banner */
    case 'BannerExtended': {
      const { getBannerExtendedCode } = await import(
        '@/showcase/codes/banner/banner-extended-code'
      );
      return getBannerExtendedCode();
    }
    case 'BannerLeftIcon': {
      const { getBannerLeftIconCode } = await import(
        '@/showcase/codes/banner/banner-leftIcon-code'
      );
      return getBannerLeftIconCode();
    }
    case 'BannerRightIcon': {
      const { getBannerRightIconCode } = await import(
        '@/showcase/codes/banner/banner-rightIcon-code'
      );
      return getBannerRightIconCode();
    }
    case 'BannerDismissed': {
      const { getBannerDismissedCode } = await import(
        '@/showcase/codes/banner/banner-dismissed-code'
      );
      return getBannerDismissedCode();
    }
    case 'BannerFade': {
      const { getBannerFadeCode } = await import(
        '@/showcase/codes/banner/banner-fade-code'
      );
      return getBannerFadeCode();
    }
    case 'BannerScale': {
      const { getBannerScaleCode } = await import(
        '@/showcase/codes/banner/banner-scale-code'
      );
      return getBannerScaleCode();
    }
    case 'BannerSlideDown': {
      const { getBannerSlideDownCode } = await import(
        '@/showcase/codes/banner/banner-slideDown-code'
      );
      return getBannerSlideDownCode();
    }
    case 'BannerSlideRight': {
      const { getBannerSlideRightCode } = await import(
        '@/showcase/codes/banner/banner-slideRight-code'
      );
      return getBannerSlideRightCode();
    }
    case 'BannerZoom': {
      const { getBannerZoomCode } = await import(
        '@/showcase/codes/banner/banner-zoom-code'
      );
      return getBannerZoomCode();
    }
    case 'BannerSlideLeft': {
      const { getBannerSlideLeftCode } = await import(
        '@/showcase/codes/banner/banner-slideLeft-code'
      );
      return getBannerSlideLeftCode();
    }
    case 'BannerSlideUp': {
      const { getBannerSlideUpCode } = await import(
        '@/showcase/codes/banner/banner-slideUp-code'
      );
      return getBannerSlideUpCode();
    }
    /* Input */
    case 'Input': {
      const { getInputCode } = await import(
        '@/showcase/codes/input/ui-input-code'
      );
      return getInputCode();
    }
    case 'InputExample': {
      const { getInputExampleCode } = await import(
        '@/showcase/codes/input/input-code'
      );
      return getInputExampleCode(state);
    }
    case 'InputIconLeft': {
      const { getInputIconLeftCode } = await import(
        '@/showcase/codes/input/input-iconLeft-code'
      );
      return getInputIconLeftCode();
    }
    case 'InputIconRight': {
      const { getInputIconRightCode } = await import(
        '@/showcase/codes/input/input-iconRight-code'
      );
      return getInputIconRightCode();
    }
    case 'InputPassword': {
      const { getInputPasswordCode } = await import(
        '@/showcase/codes/input/input-password-code'
      );
      return getInputPasswordCode();
    }
    case 'InputClear': {
      const { getInputClearCode } = await import(
        '@/showcase/codes/input/input-clear-code'
      );
      return getInputClearCode();
    }
    case 'InputLabel': {
      const { getInputLabelCode } = await import(
        '@/showcase/codes/input/input-label-code'
      );
      return getInputLabelCode();
    }
    case 'InputExtended': {
      const { getInputExtendedCode } = await import(
        '@/showcase/codes/input/input-extended-code'
      );
      return getInputExtendedCode();
    }
    case 'InputSelectRight': {
      const { getInputSelectRightCode } = await import(
        '@/showcase/codes/input/input-selectRight-code'
      );
      return getInputSelectRightCode();
    }
    case 'InputSelectLeft': {
      const { getInputSelectLeftCode } = await import(
        '@/showcase/codes/input/input-selectLeft-code'
      );
      return getInputSelectLeftCode();
    }
    case 'InputButtonRight': {
      const { getInputButtonRightCode } = await import(
        '@/showcase/codes/input/input-button-right-code'
      );
      return getInputButtonRightCode();
    }
    case 'InputDecreaseIncrease': {
      const { getInputDecreaseIncreaseCode } = await import(
        '@/showcase/codes/input/input-decrease-increase-code'
      );
      return getInputDecreaseIncreaseCode();
    }
    case 'FileInput': {
      const { getInputFileCode } = await import(
        '@/showcase/codes/input/input-file-code'
      );
      return getInputFileCode();
    }
    case 'CreditCardInput': {
      const { getCreditCardInputCode } = await import(
        '@/showcase/codes/input/input-credit-card-code'
      );
      return getCreditCardInputCode();
    }
    /* Select */
    case 'Select': {
      const { getSelectCode } = await import(
        '@/showcase/codes/select/ui-select-code'
      );
      return getSelectCode();
    }
    case 'SelectExample': {
      const { getSelectExampleCode } = await import(
        '@/showcase/codes/select/select-code'
      );
      return getSelectExampleCode(state);
    }
    case 'SelectAvatarDescription': {
      const { getSelectAvatarDescriptionCode } = await import(
        '@/showcase/codes/select/select-avatar-description-code'
      );
      return getSelectAvatarDescriptionCode();
    }
    case 'SelectStatus': {
      const { getSelectStatusCode } = await import(
        '@/showcase/codes/select/select-status-code'
      );
      return getSelectStatusCode();
    }
    /* Command */
    case 'Command': {
      const { getCommandCode } = await import(
        '@/showcase/codes/command/ui-command-code'
      );
      return getCommandCode();
    }
    case 'CommandExample': {
      const { getCommandExampleCode } = await import(
        '@/showcase/codes/command/command-code'
      );
      return getCommandExampleCode(state);
    }
    case 'CommandAvatarDescription': {
      const { getCommandAvatarDescriptionCode } = await import(
        '@/showcase/codes/command/command-avatar-description-code'
      );
      return getCommandAvatarDescriptionCode();
    }
    /* Blocks */
    case 'PricingCard': {
      const { getPricingCardCode } = await import(
        '@/showcase/codes/blocks/cards/pricing-card-01-code'
      );
      return getPricingCardCode();
    }
    case 'PricingCard02': {
      const { getPricingCard02Code } = await import(
        '@/showcase/codes/blocks/cards/pricing-card-02-code'
      );
      return getPricingCard02Code();
    }
    case 'CreditCard01': {
      const { getCreditCard01Code } = await import(
        '@/showcase/codes/blocks/cards/credit-card-01-code'
      );
      return getCreditCard01Code();
    }
    case 'CreditCard02': {
      const { getCreditCard02Code } = await import(
        '@/showcase/codes/blocks/cards/credit-card-02-code'
      );
      return getCreditCard02Code();
    }
    case 'SignIn01': {
      const { getSignIn01Code } = await import(
        '@/showcase/codes/blocks/forms/sign-in-01-code'
      );
      return getSignIn01Code();
    }
    case 'SignIn02': {
      const { getSignIn02Code } = await import(
        '@/showcase/codes/blocks/forms/sign-in-02-code'
      );
      return getSignIn02Code();
    }
    case 'FileUpload': {
      const { getFileUploadCode } = await import(
        '@/showcase/codes/blocks/file-upload-code'
      );
      return getFileUploadCode();
    }
    case 'AlertDialog01': {
      const { getAlertDialog01 } = await import(
        '@/showcase/codes/blocks/dialogs/alert-dialog-01-code'
      );
      return getAlertDialog01();
    }
    case 'AlertDialog02': {
      const { getAlertDialog02 } = await import(
        '@/showcase/codes/blocks/dialogs/alert-dialog-02-code'
      );
      return getAlertDialog02();
    }
    case 'AlertDialog03': {
      const { getAlertDialog03 } = await import(
        '@/showcase/codes/blocks/dialogs/alert-dialog-03-code'
      );
      return getAlertDialog03();
    }
    /* Date Picker */
    case 'DatePickerExample': {
      const { getDatePickerExampleCode } = await import(
        '@/showcase/codes/date-picker/date-picker-code'
      );
      return getDatePickerExampleCode(state);
    }
    case 'DatePicker': {
      const { getDatePickerCode } = await import(
        '@/showcase/codes/date-picker/ui-date-picker-code'
      );
      return getDatePickerCode();
    }

    case 'Stepper': {
      const { getStepperCode } = await import(
        '@/showcase/codes/stepper/ui-stepper-code'
      );
      return getStepperCode();
    }

    case 'StepperExample': {
      const { getStepperExampleCode } = await import(
        '@/showcase/codes/stepper/stepper-code'
      );
      return getStepperExampleCode(state);
    }

    case 'StepperIcons': {
      const { getStepperIconsCode } = await import(
        '@/showcase/codes/stepper/stepper-icons-code'
      );
      return getStepperIconsCode();
    }
    case 'StepperLabeled': {
      const { getStepperLabeledCode } = await import(
        '@/showcase/codes/stepper/stepper-labeled-code'
      );
      return getStepperLabeledCode();
    }
    case 'StepperLabeled02': {
      const { getStepperLabeled02Code } = await import(
        '@/showcase/codes/stepper/stepper-labeled-02-code'
      );
      return getStepperLabeled02Code();
    }
    case 'StepperLoading': {
      const { getStepperLoadingCode } = await import(
        '@/showcase/codes/stepper/stepper-loading-code'
      );
      return getStepperLoadingCode();
    }
    case 'StepperProgress': {
      const { getStepperProgressCode } = await import(
        '@/showcase/codes/stepper/stepper-progress-code'
      );
      return getStepperProgressCode();
    }

    /* Helpers */
    case 'hasNestedElementOfType': {
      const { getHasNestedElementOfType } = await import(
        '@/showcase/codes/helpers/hasNestedElementOfType-code'
      );
      return getHasNestedElementOfType();
    }
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
  BannerExample: {
    state: [
      'variant',
      'position',
      'size',
      'title',
      'icon',
      'link',
      'showArrow',
      'dismissible',
    ],
    store: useEngineSettingsBanner,
  },
  ButtonExample: {
    state: ['loading', 'variant', 'size', 'tooltipText'],
    store: useEngineSettingsStore,
  },
  InputExample: {
    state: ['variant', 'label', 'error', 'disabled', 'required'],
    store: useEngineSettingsInputStore,
  },
  SelectExample: {
    state: [
      'variant',
      'error',
      'disabled',
      'leftText',
      'helperText',
      'placeholder',
    ],
    store: useEngineSettingsSelectStore,
  },
  CommandExample: {
    state: ['disabled', 'showIcon', 'labelText', 'notFoundText', 'placeholder'],
    store: useEngineSettingsCommandStore,
  },
  DatePickerExample: {
    state: ['variant', 'error', 'disabled', 'calendarVariant'],
    store: useEngineSettingsDatePickerStore,
  },
  StepperExample: {
    state: [
      'variant',
      'orientation',
      'activeStep',
      'disabled',
      'loading',
      'separatorWidth',
      'completed',
      'setActiveStep',
    ],
    store: useEngineSettingsStepperStore,
  },
};
