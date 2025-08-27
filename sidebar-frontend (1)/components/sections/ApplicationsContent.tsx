'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { datevApplications } from '@/lib/constants'

export default function ApplicationsContent({ setActiveItem }: { setActiveItem?: (item: string) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verfuegbar': return 'default'
      case 'in-bearbeitung': return 'secondary'
      case 'ueberfaellig': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verfuegbar': return 'Verfügbar'
      case 'in-bearbeitung': return 'In Bearbeitung'
      case 'ueberfaellig': return 'Überfällig'
      default: return status
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>DATEV Anträge</CardTitle>
          <CardDescription>Alle verfügbaren Steueranträge und -erklärungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {datevApplications.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
                <div className="space-y-2" role="list" aria-label={`${category.category} Anträge`}>
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50" role="listitem">
                      <div>
                        {(item as any).internal ? (
                          <button
                            onClick={() => setActiveItem?.('gewerbesteuer')}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left"
                            aria-label={`${item.name} - Status: ${getStatusText(item.status)} - öffnet interne Seite`}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <a 
                            href={(item as any).url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            aria-label={`${item.name} - Status: ${getStatusText(item.status)} - öffnet in neuem Tab`}
                          >
                            {item.name}
                          </a>
                        )}
                      </div>
                      <Badge 
                        variant={getStatusColor(item.status)}
                        aria-label={`Status: ${getStatusText(item.status)}`}
                      >
                        {getStatusText(item.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}