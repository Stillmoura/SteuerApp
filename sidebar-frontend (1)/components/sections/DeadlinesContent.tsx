'use client'

import * as React from 'react'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { extendedDeadlines } from '@/lib/constants'

export default function DeadlinesContent() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="size-4 text-green-500" />
      case 'in-progress': return <Clock className="size-4 text-yellow-500" />
      default: return <AlertCircle className="size-4 text-red-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      default: return 'outline'
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Erweiterte Fristen & Termine</CardTitle>
          <CardDescription>Detaillierte Übersicht aller anstehenden Fristen mit erforderlichen Dokumenten</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {extendedDeadlines
              .filter(deadline => deadline.status !== 'completed')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map((deadline) => {
                const daysUntilDue = getDaysUntilDue(deadline.dueDate)
                return (
                  <div key={deadline.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(deadline.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{deadline.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{deadline.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium">
                              Fällig: {new Date(deadline.dueDate).toLocaleDateString('de-DE', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span className={`font-medium ${daysUntilDue <= 7 ? 'text-red-600' : daysUntilDue <= 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {daysUntilDue > 0 ? `${daysUntilDue} Tage verbleibend` : `${Math.abs(daysUntilDue)} Tage überfällig`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getPriorityColor(deadline.priority)}>
                        {deadline.priority === 'high' ? 'Dringend' : deadline.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                      </Badge>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Erforderliche Dokumente:</h5>
                      <div className="flex flex-wrap gap-2">
                        {deadline.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}