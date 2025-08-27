'use client'

import * as React from 'react'
import { Home, ExternalLink } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { navigationItems, uploadLinks } from '@/lib/constants'

interface AppSidebarProps {
  activeItem: string
  setActiveItem: (item: string) => void
}

export default function AppSidebar({ activeItem, setActiveItem }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Home className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Unternehmensportal</span>
            <span className="text-xs">v2.0.0</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Navigation Category */}
        <SidebarGroup>
          <SidebarGroupLabel>Hauptnavigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu role="menu" aria-label="Hauptnavigation">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                    role="menuitem"
                    aria-label={`Navigiere zu ${item.title}`}
                    aria-current={activeItem === item.id ? 'page' : undefined}
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upload Links Category */}
        <SidebarGroup>
          <SidebarGroupLabel>Externe Upload Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu role="menu" aria-label="Externe Upload Services">
              {uploadLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      role="menuitem"
                      aria-label={`Öffne ${item.title} in neuem Tab`}
                    >
                      <item.icon className="size-4" aria-hidden="true" />
                      <span>{item.title}</span>
                      <ExternalLink className="ml-auto size-3" aria-hidden="true" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  )
}