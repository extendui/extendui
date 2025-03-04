export function getSelectAvatarDescriptionCode() {  
    return `'use client';

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  Select.Trigger,
  Select.Value,
} from "@/components/extendui/select";

const users = [
  {
    value: "user1",
    name: "Ashwin Santiago",
    twitter: "@ashwin",
    avatar: "/Ashwin_Santiago.png",
  },
  {
    value: "user2",
    name: "Ayah Wilkinson",
    twitter: "@ayah",
    avatar: "/Ayah_Wilkinson.png",
  },
  {
    value: "user3",
    name: "Aysha Becker",
    twitter: "@aysha",
    avatar: "/Aysha_Becker.png",
  },
  {
    value: "user4",
    name: "Cohen Lozano",
    twitter: "@cohen",
    avatar: "/Cohen_Lozano.png",
  },
  {
    value: "user5",
    name: "Eva Bond",
    twitter: "@eva",
    avatar: "/Eva_Bond.png",
  },
];

export const AvatarDescriptionSelect = () => {
  return (
    <div className="space-y-2">
      <Select defaultValue={users[0]?.value}>
        <Select.Trigger id="select-status" className="w-[220px] h-full">
          <Select.Value placeholder="Select status" />
        </Select.Trigger>
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
}`;
} 