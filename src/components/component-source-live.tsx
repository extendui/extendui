'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { CodeBlockWrapper } from './code-block-wrapper'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEngineSettingsStore } from "@/zustand/stores/useEngineSettings"
import { componentStateConfig, loadComponentCode } from '@/registry/component-code-registry'


type Props = React.HTMLAttributes<HTMLDivElement> & {
  componentName: string;
}

export function ComponentSourceLive({ componentName, className, ...props }: Props) {
  const [content, setContent] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const relevantStates = componentStateConfig[componentName]

  const state = React.useMemo(() => {
    const storeState: any = useEngineSettingsStore.getState()
    const componentState: Record<string, any> = {}
    relevantStates.forEach((stateKey) => {
      componentState[stateKey] = storeState[stateKey]
    })

    return componentState
  }, [relevantStates])

  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        setIsLoading(true)
        const codeString = await loadComponentCode(componentName, state)
        setContent(codeString)
      } catch (error) {
        setContent(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadComponent()
  }, [componentName, state])

  return (
    <div className="relative w-full max-w-full overflow-auto">
      <CodeBlockWrapper
        expandButtonTitle="Expand"
        className={cn('overflow-hidden rounded-md', className)}
        disabled={!content}
        {...props}
      >
        <div className="max-w-full overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-72" aria-live="polite" aria-busy="true">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : content ? (
            <SyntaxHighlighter
              language="typescript"
              style={nightOwl}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                minHeight: '18rem',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {content}
            </SyntaxHighlighter>
          ) : (
            <div className="flex items-center justify-center h-72 text-muted-foreground">
              Failed to load component
            </div>
          )}
        </div>
      </CodeBlockWrapper>
    </div>
  )
}
