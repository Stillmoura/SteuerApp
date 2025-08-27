'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface UploadDialogProps {
  year: string
  onUpload: (file: any) => void
}

export default function UploadDialog({ year, onUpload }: UploadDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Datei zu groß",
        description: "Die Datei muss kleiner als 10MB sein."
      })
      return
    }
    
    // Validate file type (common document types)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Ungültiger Dateityp",
        description: "Bitte wählen Sie einen gültigen Dateityp (PDF, JPG, PNG, CSV, XLSX)."
      })
      return
    }
    
    setFileName(file.name)
  }

  const handleUpload = () => {
    onUpload({ year, fileName, description, uploadDate: new Date().toISOString().split('T')[0] })
    toast({
      title: "Dokument hochgeladen",
      description: `${fileName} wurde erfolgreich hochgeladen.`
    })
    setIsOpen(false)
    setFileName('')
    setDescription('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
          aria-label={`Dokument für ${year} hochladen`}
        >
          <Plus className="size-4 mr-1" aria-hidden="true" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" role="dialog" aria-modal="true">
        <DialogHeader>
          <DialogTitle id="upload-dialog-title">Dokument hochladen - {year}</DialogTitle>
          <DialogDescription id="upload-dialog-description">
            Laden Sie ein neues Dokument für das Jahr {year} hoch.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Datei auswählen</Label>
              <p className="text-xs text-muted-foreground mb-2" id="file-requirements">
                Erlaubte Dateitypen: PDF, JPG, PNG, CSV, XLSX (max. 10MB)
              </p>
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx"
                onChange={handleFileChange}
                aria-describedby="file-requirements"
                aria-required="true"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Beschreibung des Dokuments..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-describedby="description-hint"
              />
              <p id="description-hint" className="text-xs text-muted-foreground">
                Optionale Beschreibung zur besseren Identifikation des Dokuments
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setIsOpen(false)}
              aria-label="Dialog schließen ohne zu speichern"
            >
              Abbrechen
            </Button>
            <Button 
              type="submit"
              disabled={!fileName}
              aria-label={fileName ? `Dokument ${fileName} hochladen` : "Keine Datei ausgewählt"}
            >
              Hochladen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}