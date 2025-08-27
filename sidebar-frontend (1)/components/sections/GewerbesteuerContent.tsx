'use client'

import * as React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function GewerbesteuerContent() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const processSteuererklärung = async () => {
    setIsProcessing(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://192.168.178.58:30080/webhook/b515f01c-bd36-4222-bbd0-b52bcc6b376f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: true,
          json_template: { "test": "data" }
        })
      });
      
      const result = await response.json();
      console.log('Webhook Response:', result);
      
      setResult(result);
    } catch (err) {
      console.error('Webhook failed:', err);
      setError('Verbindung zum Server fehlgeschlagen')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gewerbesteuererklärung 2023</CardTitle>
          <CardDescription>Erstellen Sie Ihre Gewerbesteuererklärung für das Jahr 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <Button 
              size="lg" 
              className="px-8 py-3"
              onClick={processSteuererklärung}
              disabled={isProcessing}
            >
              {isProcessing ? 'Wird verarbeitet...' : 'Erstellen'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && result.success && (
            <Alert>
              <AlertDescription>
                Steuererklärung erfolgreich verarbeitet!
                {result.answers && (
                  <div className="mt-2">
                    <strong>Ergebnisse:</strong>
                    <pre className="mt-1 text-xs bg-gray-100 p-2 rounded">
                      {JSON.stringify(result.answers, null, 2)}
                    </pre>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}