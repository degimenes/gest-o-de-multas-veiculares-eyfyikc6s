import { useSyncExternalStore } from 'react'
import { Multa, Veiculo } from '@/lib/types'

interface AppState {
  multas: Multa[]
  veiculos: Veiculo[]
  isDatabaseConnected: boolean
}

// Minimal mock data for demonstration, distinctly separate from the provided spec dataset
const mockMultas: Multa[] = [
  {
    id: 'm1',
    numero: 1,
    veiculo: 'FORD/KA SE 1.0',
    placa: 'ABC1D23',
    fornecedor: 'CET-SP',
    descricao: 'Avançar o sinal vermelho do semáforo',
    condutor: 'João Silva',
    ait: '1AA2233445',
    data: '2025-10-12T10:00:00Z',
    valorOriginal: 293.47,
    desconto: '0%',
    valorPagar: 293.47,
    projeto: '0000',
    status: 'Vencida / Urgente',
    observacoes: 'Rua Augusta',
  },
  {
    id: 'm2',
    numero: 2,
    veiculo: 'CHEV/ONIX 1.0MT',
    placa: 'XYZ9E87',
    fornecedor: 'DER-SP',
    descricao: 'Transitar em velocidade superior à máxima',
    condutor: 'Maria Souza',
    ait: '5BB6677889',
    data: '2026-01-05T14:30:00Z',
    valorOriginal: 130.16,
    desconto: '20%',
    valorPagar: 104.13,
    projeto: '23-0192',
    status: 'PO lançada / Pago',
    observacoes: 'Rodovia Anhanguera',
  },
  {
    id: 'm3',
    numero: 3,
    veiculo: 'VW/GOL 1.0',
    placa: 'DEF5G67',
    fornecedor: 'CET-SP',
    descricao: 'Estacionar em local/horário proibido',
    condutor: 'Não identificado',
    ait: '9CC0011223',
    data: '2026-03-20T08:15:00Z',
    valorOriginal: 195.23,
    desconto: '-',
    valorPagar: 195.23,
    projeto: '0000',
    status: 'Condutor pendente',
    observacoes: 'Notificação recebida',
  },
  {
    id: 'm4',
    numero: 4,
    veiculo: 'FORD/KA SE 1.0',
    placa: 'ABC1D23',
    fornecedor: 'PREF. CAMPINAS',
    descricao: 'Dirigir manuseando telefone celular',
    condutor: 'João Silva',
    ait: '4DD5566778',
    data: '2026-04-02T16:45:00Z',
    valorOriginal: 293.47,
    desconto: '40%',
    valorPagar: 176.08,
    projeto: '24-0511',
    status: 'Recurso em andamento',
    observacoes: 'Defesa prévia protocolada',
  },
  {
    id: 'm5',
    numero: 5,
    veiculo: 'RENAULT/KWID',
    placa: 'GHI9J01',
    fornecedor: 'CET-SP',
    descricao: 'Transitar em local não permitido (rodízio)',
    condutor: 'Carlos Oliveira',
    ait: '8EE2233445',
    data: '2026-04-28T07:30:00Z',
    valorOriginal: 130.16,
    desconto: '-',
    valorPagar: 130.16,
    projeto: '',
    status: 'Aguardando boleto',
    observacoes: 'Aguardando processamento',
  },
]

const mockVeiculos: Veiculo[] = [
  {
    placa: 'ABC1D23',
    modelo: 'FORD/KA SE 1.0',
    categoria: 'Campo Móvel',
    condutorResp: 'João Silva',
    statusMultas: '2 multas',
    totalMultas: 469.55,
  },
  {
    placa: 'XYZ9E87',
    modelo: 'CHEV/ONIX 1.0MT',
    categoria: 'Diretoria',
    condutorResp: 'Maria Souza',
    statusMultas: '1 multa',
    totalMultas: 104.13,
  },
  {
    placa: 'DEF5G67',
    modelo: 'VW/GOL 1.0',
    categoria: 'Campo Fixo',
    condutorResp: '',
    statusMultas: '1 multa',
    totalMultas: 195.23,
  },
  {
    placa: 'GHI9J01',
    modelo: 'RENAULT/KWID',
    categoria: 'Campo Móvel',
    condutorResp: 'Carlos Oliveira',
    statusMultas: '1 multa',
    totalMultas: 130.16,
  },
  {
    placa: 'JKL3M45',
    modelo: 'FIAT/MOBI',
    categoria: 'Campo Móvel',
    condutorResp: 'Ana Costa',
    statusMultas: 'Sem multas',
    totalMultas: 0,
  },
]

let state: AppState = {
  multas: mockMultas,
  veiculos: mockVeiculos,
  isDatabaseConnected: false, // Simulating disconnected DB to show the warning
}

const listeners = new Set<() => void>()

export const store = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  updateMulta: (id: string, updates: Partial<Multa>) => {
    state = {
      ...state,
      multas: state.multas.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }
    listeners.forEach((l) => l())
  },
}

export default function useMultasStore() {
  return useSyncExternalStore(store.subscribe, store.getState)
}
