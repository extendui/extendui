export function getSelectExampleCode(state: Record<string, any>) {
    const { variant, error, disabled, leftText, helperText, placeholder } = state;
  
    return `import { useState } from 'react';
import { Input } from '@/components/extendui/input';
import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { UtensilsCrossed } from 'lucide-react';
    
export default function InputExample() {
const [value, setValue] = useState('');
const [showIcon, setShowIcon] = useState(false)
const [changeOpenIcon, setChangeOpenIcon] = useState(false)

return (
    <div>
        <Select disabled={${disabled}}>
            <SelectTrigger
                error={${error}}
                variant={'${variant}'}
                openIcon={changeOpenIcon ? <ChevronDownIcon /> : <CaretSortIcon />}
                icon={showIcon ? <UtensilsCrossed size={16} strokeWidth={2} aria-hidden="true" /> : null}
                leftText={'${leftText}'}
                className="min-w-[160px]"
            >
            <SelectValue placeholder={'${placeholder}'} />
            </SelectTrigger>
            <SelectContent variant={'${variant}'}>
            <SelectGroup >
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
            </SelectContent>
        </Select>
        <SelectHelperText error={${error}}>
            ${helperText}
        </SelectHelperText>
    </div>
);
};
`;
}
  