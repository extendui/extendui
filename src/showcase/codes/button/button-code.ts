export function getButtonExampleCode(state: Record<string, any>) {
  const { variant, size, loading, tooltipText } = state;

  return `import { Button } from '@/components/extendui/button';

export function ButtonDemo() {
  return (
    <Button 
      variant={'${variant}'} 
      size={'${size}'} 
      loading={${loading}} 
      disabled={${loading}} 
      tooltipText={'${tooltipText}'}
    >
      Button
    </Button>
  );
}`;
}
