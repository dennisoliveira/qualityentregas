export interface State {
  Nome: string
  Sigla: string
}

export const getStates = async (): Promise<any> => {
  try {
    const response = await fetch('http://localhost:3001/states')
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const states = await response.json()
    return states
  } catch (error) {
    console.log(error)
  }
}
