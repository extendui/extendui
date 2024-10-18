import { useEngineSettingsStore } from '@/zustand/stores/useEngineSettings'
import { useEngineSettingsInputStore } from '@/zustand/stores/useEngineSettingsInput'

export async function loadComponentCode(componentName: string, state: Record<string, any>) {
    switch (componentName) {
        case 'ButtonExample':
            const { getButtonExampleCode } = await import('@/showcase/codes/button-code')
            return getButtonExampleCode(state)
        case 'InputExample':
            const { getInputExampleCode } = await import('@/showcase/codes/input-code')
            return getInputExampleCode(state)
        default:
            throw new Error(`Component "${componentName}" not supported.`)
    }
}


export type ComponentStateConfigProps = {
    [key: string]: {
        state: string[],
        store: any
    }
}

export const componentStateConfig: ComponentStateConfigProps = {
    ButtonExample: {
        state: ['loading', 'variant', 'size', 'tooltipText'],
        store: useEngineSettingsStore
    },
    InputExample: {
        state: ['variant', 'label'],
        store: useEngineSettingsInputStore
    },
}

