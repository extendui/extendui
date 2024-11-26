export function getInputExampleCode(state: Record<string, any>) {
  const { variant, error, disabled, required } = state;

  return `import { useState } from 'react';
  import { Input } from '@/components/extendui/input';
  
  export default function InputExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      variant={${variant}}
      error={${error}}
      textError="Username is required"
      placeholder="Type here..."
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={${required}
      disabled={${disabled}}
    />
  );
}
`;
}
