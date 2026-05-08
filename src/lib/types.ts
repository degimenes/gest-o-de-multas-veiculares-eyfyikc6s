export type StatusMulta =
  | 'PO lançada / Pago'
  | 'Aguardando boleto'
  | 'Condutor pendente'
  | 'Recurso em andamento'
  | 'Vencida / Urgente'
  | 'Aguard. notif. penalidade'

export interface Multa {
  id: string
  numero: number
  veiculo: string
  placa: string
  fornecedor: string
  descricao: string
  condutor: string
  ait: string
  data: string
  valorOriginal: number
  desconto: string
  valorPagar: number
  projeto: string
  status: StatusMulta
  observacoes: string
}

export type CategoriaVeiculo = 'Campo Móvel' | 'Campo Fixo' | 'Diretoria'

export interface Veiculo {
  placa: string
  modelo: string
  categoria: CategoriaVeiculo
  condutorResp: string
  statusMultas: string
  totalMultas: number
}
