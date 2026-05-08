import pb from '@/lib/pocketbase/client'
import { Multa } from '@/lib/types'

export const getMultas = () => pb.collection('multas').getFullList<Multa>()
export const createMulta = (data: Omit<Multa, 'id' | 'created' | 'updated'>) =>
  pb.collection('multas').create<Multa>(data)
export const updateMulta = (id: string, data: Partial<Multa>) =>
  pb.collection('multas').update<Multa>(id, data)
export const deleteMulta = (id: string) => pb.collection('multas').delete(id)
