export type StatusMulta = 'Pendente' | 'Pago' | 'Em Recurso'

export interface Multa {
  id: string
  placa: string
  veiculo: string
  condutor: string
  valor: number
  data_infracao: string
  tipo: string
  status: StatusMulta
  created?: string
  updated?: string
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
