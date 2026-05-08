import { useState, useEffect, useCallback } from 'react'
import { Veiculo } from '@/lib/types'
import { getVeiculos } from '@/services/veiculos'
import { useRealtime } from '@/hooks/use-realtime'

export default function useVeiculosStore() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchVeiculos = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getVeiculos()
      setVeiculos(data)
    } catch (err) {
      console.error('Erro ao buscar veículos:', err)
      setError(err instanceof Error ? err : new Error('Erro desconhecido'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVeiculos()
  }, [fetchVeiculos])

  useRealtime('veiculos', () => {
    fetchVeiculos()
  })

  return { veiculos, isLoading, error, fetchVeiculos, setVeiculos }
}
