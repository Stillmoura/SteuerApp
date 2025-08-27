'use client'

import * as React from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { documentsByYear } from '@/lib/constants'
import UploadDialog from '@/components/dialogs/UploadDialog'

export default function DocumentsContent() {
  const [documents, setDocuments] = React.useState(documentsByYear)

  const handleUpload = (uploadData: any) => {
    const year = uploadData.year
    const newDoc = {
      name: uploadData.fileName,
      type: 'Dokument',
      uploadDate: uploadData.uploadDate
    }
    
    setDocuments(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), newDoc]
    }))
  }

  // TODO: Replace with actual upload service URLs
  // PLACEHOLDER: These URLs are currently non-functional placeholders
  const documentCategories = [
    { name: 'Rechnungen', url: 'https://example.com/rechnungen-upload' },
    { name: 'Belege', url: 'https://example.com/belege-upload' },
    { name: 'Verträge', url: 'https://example.com/vertraege-upload' },
    { name: 'Personalunterlagen', url: 'https://example.com/personal-upload' },
    { name: 'Steuerunterlagen', url: 'https://example.com/steuer-upload' },
    { name: 'Bankdokumente', url: 'https://example.com/bank-upload' }
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Dokument Upload Kategorien</CardTitle>
          <CardDescription>Wählen Sie eine Kategorie für den Upload Ihrer Dokumente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6" role="grid" aria-label="Dokument Upload Kategorien">
            {documentCategories.map((category) => (
              <a
                key={category.name}
                href={category.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 border rounded-lg hover:bg-muted/50 hover:border-primary transition-colors"
                role="gridcell"
                aria-label={`Upload ${category.name} - öffnet in neuem Tab`}
              >
                <div className="text-center">
                  <FileText className="size-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <ExternalLink className="size-3 ml-1 inline" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dokumente nach Jahren</CardTitle>
          <CardDescription>Alle Unternehmensdokumente sortiert nach Jahreszahlen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(documents)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, docs]) => (
              <div key={year} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{year}</h3>
                  <UploadDialog year={year} onUpload={handleUpload} />
                </div>
                <div className="space-y-2" role="list" aria-label={`Dokumente für ${year}`}>
                  {docs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded" role="listitem">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • Hochgeladen: {doc.uploadDate}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        aria-label={`Dokument ${doc.name} anzeigen`}
                      >
                        <FileText className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  ))}
                  {docs.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Keine Dokumente für {year} vorhanden
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}