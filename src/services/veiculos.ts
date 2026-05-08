import pb from '@/lib/pocketbase/client'
import { Veiculo } from '@/lib/types'

export const getVeiculos = () => pb.collection('veiculos').getFullList<Veiculo>()
export const createVeiculo = (data: Omit<Veiculo, 'id' | 'created' | 'updated'>) =>
  pb.collection('veiculos').create<Veiculo>(data)
export const updateVeiculo = (id: string, data: Partial<Veiculo>) =>
  pb.collection('veiculos').update<Veiculo>(id, data)
export const deleteVeiculo = (id: string) => pb.collection('veiculos').delete(id)
