export async function loadComponentCode(componentName: string, state: Record<string, any>) {
    switch (componentName) {
        case 'ButtonExample':
            const { getButtonExampleCode } = await import('@/showcase/codes/button-code')
            return getButtonExampleCode(state)
        default:
            throw new Error(`Component "${componentName}" not supported.`)
    }
}


export const componentStateConfig: Record<string, string[]> = {
    ButtonExample: ['loading', 'variant', 'size', 'tooltipText'],
}

