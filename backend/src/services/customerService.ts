import prisma from '../databases/prismaClient'

export const createCustomer = async (data: any): Promise<any> => {
  return await prisma.customer.create({
    data: { Nome: `Cliente ${Math.random()}` },
  })
}

export const getCustomers = async (data: any): Promise<any> => {
  return await prisma.customer.findMany()
}

export default {
  createCustomer,
  getCustomers,
}