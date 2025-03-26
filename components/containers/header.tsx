"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

export const Header: FC<Props> = ({ title, desc, children }) => {
  const { push } = useRouter();

  const logout = () => {
    push("/");
  };

  return (
    <header className="w-full py-5 px-10 flex items-center gap-3 shadow-md justify-between">
      {children}
      <div>
        <p className="text-2xl font-medium">{title}</p>
        <p className="mt-1">{desc}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Profile</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled className="font-medium">
              John Doe
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="font-medium">
              example@gmail.com
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
