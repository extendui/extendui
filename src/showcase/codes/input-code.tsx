export function getInputExampleCode(state: Record<string, any>) {
  const { variant, label, error, disabled, required } = state

  return `
  import { Input } from '@/components/ui/input';
  
  export default function InputExample() {
    return (
      <Input
        type="text"
        placeholder="Type here..."
        variant={${variant}}
        label={${label}}
        error={${error}}
        textError='This field is required'
        disabled={${disabled}}
        required={${required}}
      />
    );
  }
  `
}



