export function getInputExampleCode(state: Record<string, any>) {
  const { variant, label } = state

  return `
  import { Input } from '@/components/ui/input';
  
  export default function InputExample() {
    return (
      <Input type="text" placeholder="Type here..." variant={${variant}} label={"${label}"} />
    );
  }
  `
}



