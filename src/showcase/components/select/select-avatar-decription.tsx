'use client';

import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/extendui/select';

const users = [
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
  {
    value: 'user5',
    name: 'Eva Bond',
    twitter: '@eva',
    avatar:
      'https://utfs.io/a/9g3kf9djq5/7zmIwBk1GZesW8VypWhRzfYdH1K9vlanbirG4AehCwZBk62j',
  },
];

export default function AvatarDescriptionSelect() {
  return (
    <div className="space-y-2">
      <Select defaultValue={users[0]?.value}>
        <SelectTrigger id="select-status" className="h-full w-[220px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.value} value={user.value}>
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
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
