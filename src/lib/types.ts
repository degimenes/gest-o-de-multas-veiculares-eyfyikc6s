export type StatusMulta =
  | 'Pendente'
  | 'Pago'
  | 'Aguardando boleto'
  | 'Condutor pendente'
  | 'Em Recurso'
  | 'Vencida / Urgente'

export interface Multa {
  id: string
  placa: string
  veiculo: string
  condutor: string
  valor: number
  valor_original?: number
  valor_a_pagar?: number
  desconto?: string
  fornecedor?: string
  descricao?: string
  ait?: string
  projeto?: string
  observacoes?: string
  data_infracao: string
  tipo: string
  status: StatusMulta
  created?: string
  updated?: string
}

export type CategoriaVeiculo = 'Campo Móvel' | 'Campo Fixo' | 'Diretoria' | string

export interface Veiculo {
  id: string
  placa: string
  modelo: string
  categoria: CategoriaVeiculo
  condutor_responsavel: string
  created?: string
  updated?: string
}
