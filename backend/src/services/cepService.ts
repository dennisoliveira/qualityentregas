const baseURL = 'https://viacep.com.br/ws'
const formatData = 'json'

const getLocationByCep = async (cep: string): Promise<any> => {
  const getURL = `${baseURL}/${cep}/${formatData}`
  try {
    const response = await fetch(getURL)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const locationData = await response.json()
    return locationData
  } catch (error) {
    throw error
  }
}

export default {
  getLocationByCep,
}
