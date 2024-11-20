import prisma from '../databases/prismaClient'

export const getStates = async (): Promise<any> => {
  return await prisma.state.findMany()
}

export default {
  getStates
}