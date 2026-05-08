import { useState, useEffect, useCallback } from 'react'
import { Multa } from '@/lib/types'
import { getMultas } from '@/services/multas'
import { useRealtime } from '@/hooks/use-realtime'

export default function useMultasStore() {
  const [multas, setMultas] = useState<Multa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMultas = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getMultas()
      setMultas(data)
    } catch (err) {
      console.error('Erro ao buscar multas:', err)
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMultas()
  }, [fetchMultas])

  useRealtime('multas', () => {
    fetchMultas()
  })

  return { multas, isLoading, error, fetchMultas, setMultas }
}
