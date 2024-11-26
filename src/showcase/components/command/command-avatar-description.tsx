'use client';

import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Fragment, type JSX, useState } from 'react';

import { Button } from '@/components/extendui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/extendui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type User = {
  value: string;
  name: string;
  twitter: string;
  avatar: string;
};

type UserGroup = {
  nameGroup: string;
  items: User[];
};

const users: UserGroup[] = [
  {
    nameGroup: 'Frontend Developers',
    items: [
      {
        value: 'user1',
        name: 'Ashwin Santiago',
        twitter: '@ashwin',
        avatar:
          'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZeszEPB1RoL5yfeTt9QHciEpvWZO4oNRYd78gD2',
      },
      {
        value: 'user2',
        name: 'Ayah Wilkinson',
        twitter: '@ayah',
        avatar:
          'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZesAAlqU8cspq73uNyl4bVzMtmeFr9dP51Hoc0i',
      },
    ],
  },
  {
    nameGroup: 'Backend Developers',
    items: [
      {
        value: 'user3',
        name: 'Aysha Becker',
        twitter: '@aysha',
        avatar:
          'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZesEDGVq92T4LXqJAzvb7Bay16kxN2DWoKGQE3F',
      },
      {
        value: 'user4',
        name: 'Cohen Lozano',
        twitter: '@cohen',
        avatar:
          'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZesU6WYdiu1UYlV8Zmqcfr9Xg3HOeKGBTb5ChDs',
      },
    ],
  },
  {
    nameGroup: 'DevOps',
    items: [
      {
        value: 'user5',
        name: 'Eva Bond',
        twitter: '@eva',
        avatar:
          'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZesW8VypWhRzfYdH1K9vlanbirG4AehCwZBk62j',
      },
    ],
  },
];

export default function CommandAvatarDescription() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const findUser = (value: string): JSX.Element | null => {
    const user = users
      .flatMap((group) => group.items)
      .find((item) => item.name === value);

    if (!user) return null;

    return (
      <span className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
        />
        <span className="flex flex-col items-start">
          <span className="font-medium">{user.name}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {user.twitter}
          </span>
        </span>
      </span>
    );
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-full w-[220px] justify-between px-3 font-normal"
          >
            {value ? (
              findUser(value)
            ) : (
              <span className="text-muted-foreground">Select user</span>
            )}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>User not found.</CommandEmpty>
              {users.map((group) => (
                <Fragment key={group.nameGroup}>
                  <CommandGroup heading={group.nameGroup}>
                    {group.items.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setOpen(false);
                        }}
                      >
                        <span className="flex items-center gap-4">
                          <Image
                            className="rounded-full"
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                          />
                          <span className="flex flex-col items-start">
                            <span className="font-medium">{user.name}</span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {user.twitter}
                            </span>
                          </span>
                        </span>
                        <Check
                          className={cn(
                            'ml-auto',
                            value === user.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
