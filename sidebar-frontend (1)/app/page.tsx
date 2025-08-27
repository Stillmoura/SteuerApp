'use client'

import * as React from 'react'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import ErrorBoundary from '@/components/ErrorBoundary'
import AppSidebar from '@/components/navigation/AppSidebar'
import DeadlinesContent from '@/components/sections/DeadlinesContent'
import ApplicationsContent from '@/components/sections/ApplicationsContent'
import DocumentsContent from '@/components/sections/DocumentsContent'
import DashboardContent from '@/components/sections/DashboardContent'
import GewerbesteuerContent from '@/components/sections/GewerbesteuerContent'

function MainContent({ activeItem, setActiveItem }: { activeItem: string, setActiveItem: (item: string) => void }) {
  const renderContent = () => {
    switch (activeItem) {
      case 'deadlines':
        return <DeadlinesContent />
      case 'applications':
        return <ApplicationsContent setActiveItem={setActiveItem} />
      case 'gewerbesteuer':
        return <GewerbesteuerContent />
      case 'documents':
        return <DocumentsContent />
      case 'analytics':
      case 'dashboard':
      default:
        return <DashboardContent activeItem={activeItem} />
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {renderContent()}
    </div>
  )
}

export default function Component() {
  const [activeItem, setActiveItem] = React.useState('dashboard')

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <AppSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Unternehmensportal</h1>
          </header>
          <MainContent activeItem={activeItem} setActiveItem={setActiveItem} />
        </SidebarInset>
      </SidebarProvider>
    </ErrorBoundary>
  )
}