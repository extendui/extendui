export function getButtonExampleCode(state: Record<string, any>) {
  const { variant, size, loading, tooltipText } = state;

  return `
import { Button } from '@/components/ui/button';

function ExampleButton() {
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
}
`;
}
