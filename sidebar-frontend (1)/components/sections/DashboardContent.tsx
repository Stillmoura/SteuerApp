'use client'

import * as React from 'react'
import { Home, AlertCircle, CheckCircle2, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { deadlines } from '@/lib/constants'

interface DashboardContentProps {
  activeItem: string
}

export default function DashboardContent({ activeItem }: DashboardContentProps) {
  const renderAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>Übersicht über Ihre Geschäftsdaten</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <BarChart3 className="size-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Analytics-Daten werden geladen...</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderDashboard = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Offene Fristen</CardTitle>
          <CardDescription>Anstehende Abgabetermine und erforderliche Dokumente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deadlines
              .filter(deadline => deadline.status === 'pending')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="size-4 text-red-500" />
                    <div>
                      <h4 className="font-medium">{deadline.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Fällig am: {new Date(deadline.dueDate).toLocaleDateString('de-DE', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                    {deadline.priority === 'high' ? 'Dringend' : 'Normal'}
                  </Badge>
                </div>
              ))}
            {deadlines.filter(deadline => deadline.status === 'pending').length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="size-12 mx-auto mb-4 text-green-500" />
                <p className="text-muted-foreground">Alle Fristen sind erledigt!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Übersicht</CardTitle>
          <CardDescription>Willkommen im Unternehmen Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Home className="size-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Willkommen zurück!</h3>
            <p className="text-muted-foreground">
              Verwalten Sie Ihre Fristen, Anträge und Dokumente an einem Ort.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (activeItem === 'analytics') {
    return renderAnalytics()
  }

  return renderDashboard()
}