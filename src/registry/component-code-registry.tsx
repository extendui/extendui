import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings'
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput'

type Props = {
    componentName: string
    state: Record<string, any>
}

export async function loadComponentCode({ componentName, state }: Props) {
    switch (componentName) {
        /* Button */
        case 'ButtonExample':
            const { getButtonExampleCode } = await import('@/showcase/codes/button/button-code')
            return getButtonExampleCode(state)
        case 'RotatingButton':
            const { getButtonRotatingCode } = await import('@/showcase/codes/button/button-rotating-code')
            return getButtonRotatingCode()
        case 'Rotating3DButton':
            const { getButton3DRotatingCode } = await import('@/showcase/codes/button/button-3d-rotating-code')
            return getButton3DRotatingCode()
        case 'PulsatingShadowButton':
            const { getButtonPulsatingCode } = await import('@/showcase/codes/button/button-pulsating-code')
            return getButtonPulsatingCode()
        case 'ScalingButton':
            const { getButtonScalingCode } = await import('@/showcase/codes/button/button-scaling-code')
            return getButtonScalingCode()
        case 'BouncingButton':
            const { getButtonBouncingCode } = await import('@/showcase/codes/button/button-bouncing-code')
            return getButtonBouncingCode()
        /* Input */
        case 'InputExample':
            const { getInputExampleCode } = await import('@/showcase/codes/input/input-code')
            return getInputExampleCode(state)
        case 'InputIconLeft':
            const { getInputIconLeftCode } = await import('@/showcase/codes/input/input-iconLeft-code')
            return getInputIconLeftCode()
        case 'InputIconRight':
            const { getInputIconRightCode } = await import('@/showcase/codes/input/input-iconRight-code')
            return getInputIconRightCode()
        default:
            throw new Error(`Component "${componentName}" not supported.`)
    }
}


export type ComponentStateConfigProps = {
    [key: string]: {
        state: string[] | null,
        store: any
    }
}

export const componentStateConfig: ComponentStateConfigProps = {
    ButtonExample: {
        state: ['loading', 'variant', 'size', 'tooltipText'],
        store: useEngineSettingsStore
    },
    InputExample: {
        state: ['variant', 'label', 'error', 'disabled', 'required'],
        store: useEngineSettingsInputStore
    },
}

