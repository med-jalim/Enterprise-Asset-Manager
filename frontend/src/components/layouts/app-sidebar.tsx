import { Building2, LaptopMinimal, MoreVertical, User2 } from "lucide-react";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getUserName, logout } from "@/context/auth";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function AppSidebar() {
  const menuItems: MenuItem[] = [
    { label: "Assets", path: "/assets", icon: LaptopMinimal },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-4 py-3">
          <Building2 size={34} className="mr-2 " />
          <span className="text-lg ">EAM</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    key={item.label}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm  rounded-lg transition-colors",
                      isActive
                        ? "bg-slate-600 text-white"
                        : "text-neutral-300 hover:bg-slate-300 hover:text-slate-800",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex align-middle justify-between gap-2 h-8 w-full px-4"
                  >
                    <span className="flex gap-2">
                      <User2 className="h-4 w-4" />
                      {getUserName() || "username"}
                    </span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => logout(window.location.origin)}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
