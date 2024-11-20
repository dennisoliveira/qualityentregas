import prisma from '../databases/prismaClient'

export const createCustomer = async (data: any): Promise<any> => {
  return await prisma.customer.create({ data })
}

export const getCustomers = async (): Promise<any> => {
  return await prisma.customer.findMany()
}

export const getCustomerById = async (id: number): Promise<any> => {
  return await prisma.customer.findUnique({ where: { ID: id } })
}

export const updateCustomerById = async (
  id: number,
  data: any,
): Promise<any> => {
  const { ID, DataHoraCadastro, ...customerDataUpdate } = data
  return await prisma.customer.update({
    where: { ID: id },
    data: customerDataUpdate,
  })
}

export const deleteCustomerById = async (id: number): Promise<any> => {
  return await prisma.customer.delete({
    where: { ID: id },
  })
}

export default {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
}
