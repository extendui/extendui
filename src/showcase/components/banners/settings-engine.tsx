'use client';

import React from 'react';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    setVariant,
    setPosition,
    setSize,
    setTitle,
    setShowArrow,
    setDismissible,
} from '@/zustand/stores/useEngineSettingsBanner';
import { useEngineSettingsBanner } from '@/zustand/stores/useEngineSettingsBanner';

export const BannerSettingsEngine = () => {
    const {
        variant,
        position,
        size,
        title,
        showArrow,
        dismissible,
        resetToDefaults,
    } = useEngineSettingsBanner();

    const handleChangeVariant = (
        value: 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'outline' | 'subtle' | 'ghost' | 'shimmer',
    ) => {
        setVariant(value);
    };

    const handleChangePosition = (
        value: 'top' | 'bottom' | 'center' | 'static',
    ) => {
        setPosition(value);
    };

    const handleChangeSize = (
        value: 'default' | 'sm' | 'lg',
    ) => {
        setSize(value);
    };

    const handleChangeTitle = (value: string) => {
        setTitle(value);
    };

    const handleChangeShowArrow = (value: boolean) => {
        setShowArrow(value);
    };

    const handleChangeDismissible = (value: boolean) => {
        setDismissible(value);
    };

    const handleReset = () => {
        resetToDefaults();
    };


    return (
        <div>
            {/* Settings in 2 columns */}
            <div className="flex flex-col space-y-4 sm:space-y-6">
                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Select onValueChange={handleChangeVariant} value={variant}>
                        <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                            <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Variants</SelectLabel>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="primary">Primary</SelectItem>
                                <SelectItem value="destructive">Destructive</SelectItem>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="outline">Outline</SelectItem>
                                <SelectItem value="subtle">Subtle</SelectItem>
                                <SelectItem value="ghost">Ghost</SelectItem>
                                <SelectItem value="shimmer">Shimmer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Position Selection */}
                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Select onValueChange={handleChangePosition} value={position}>
                        <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                            <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Position</SelectLabel>
                                <SelectItem value="top">Top</SelectItem>
                                <SelectItem value="bottom">Bottom</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="static">Static</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Size Selection */}
                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Select onValueChange={handleChangeSize} value={size}>
                        <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Size</SelectLabel>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="sm">Small</SelectItem>
                                <SelectItem value="lg">Large</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Text Inputs */}
                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Input value={title} onChange={(e) => handleChangeTitle(e.target.value)} placeholder="Banner title" />
                </div>
                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Switch checked={showArrow} onCheckedChange={handleChangeShowArrow} />
                    <span className="text-sm">Show Arrow</span>
                </div>

                <div className="flex w-full items-center space-x-2 sm:w-[180px]">
                    <Switch checked={dismissible} onCheckedChange={handleChangeDismissible} />
                    <span className="text-sm">Dismissible</span>
                </div>

                <div className="flex w-full items-center justify-end space-x-2 sm:w-[180px]">
                    <Button onClick={handleReset} variant={'outline'}>Reset</Button>
                </div>
            </div>
        </div>
    );
};