'use client';

import {
    Select,
} from '@/components/extendui/select';

export const SelectDemo = () => {
    return (
        <div>
            <Select >
                <Select.Trigger
                    className="min-w-[160px]"
                >
                    <Select.Value placeholder={'Fruits'} />
                </Select.Trigger>
                <Select.Content>
                    <Select.Group >
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="blueberry">Blueberry</Select.Item>
                        <Select.Item value="grapes">Grapes</Select.Item>
                        <Select.Item value="pineapple">Pineapple</Select.Item>
                    </Select.Group>
                </Select.Content>
                <Select.HelperText>
                    {'Helper text'}
                </Select.HelperText>
            </Select>
        </div>
    );
}

