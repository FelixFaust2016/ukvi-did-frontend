"use client";

import { Calendar, Home, Inbox, UserCog, UserCheck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { usePathname, useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Issue Credentials",
    url: "/credentials",
    icon: Inbox,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: UserCheck,
  },
  {
    title: "User Mangement",
    url: "/user-management",
    icon: UserCog,
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const path = usePathname();

  console.log(path.split("/")[1], "pathhh");

  return (
    <Sidebar>
      <SidebarContent className="bg-white p-5">
        <SidebarGroup>
          <div className="flex items-center">
            <Logo />
            <SidebarGroupLabel className="text-xl">
              Issuer Portal
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton
                    isActive={path.split("/")[1] === item.url.split("/")[1]}
                    asChild
                  >
                    <a
                      className="cursor-pointer"
                      onClick={() => router.push(item.url)}
                    >
                      <item.icon />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
