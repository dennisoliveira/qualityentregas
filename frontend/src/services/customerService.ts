export interface Customer {
  ID: number
  DataHoraCadastro: Date
  Codigo: string
  Nome: string
  CPF_CNPJ: string
  CEP: number
  Logradouro: string
  Endereco: string
  Numero: string
  Bairro: string
  Cidade: string
  UF: string
  Complemento: string
  Fone: string
  LimiteCredito: number
  Validade: Date
}

export const createCustomer = async (data: Customer): Promise<any> => {
  try {
    const response = await fetch('http://localhost:3001/customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const customer = await response.json()
    return customer
  } catch (error) {
    console.log(error)
  }
}

export const getCustomers = async (): Promise<any> => {
  try {
    const response = await fetch('http://localhost:3001/customers')
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const customers = await response.json()
    return customers
  } catch (error) {
    console.log(error)
  }
}