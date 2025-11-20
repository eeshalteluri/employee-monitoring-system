"use client"

import { Calendar, Home, Inbox, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

const items = [
  { title: "Approvals", url: "/approvals", icon: Home, roles: ["admin"] },
  { title: "Projects", url: "/projects", icon: Home, roles: ["admin", "employee"] },
  { title: "Employees", url: "/employees", icon: Inbox, roles: ["admin"] },
  { title: "Clients", url: "/clients", icon: Calendar, roles: ["admin", "employee"] },
  { title: "Trainings", url: "/training", icon: Search, roles: ["admin", "employee", "client"] },
];

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role

  const filteredItems = role ? items.filter(item => item.roles.includes(role)) : [];


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-12">
            <SidebarMenu>
              {filteredItems.map((item) => {
                const isActive = pathname.startsWith(item.url)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-primary text-secondary hover:bg-primary/90 hover:text-secondary"
                          : ""
                      }
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-6">
        <Button asChild>
          <button onClick={() => signOut()}>Log Out</button>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
