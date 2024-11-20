export interface LocationData {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const getLocationByCep = async (cep: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3001/cep/${cep}`)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const locationData = await response.json()
    return locationData
  } catch (error) {
    console.log(error)
  }
}
