import prisma from '../databases/prismaClient'

interface Filters {
  codigo?: string
  nome?: string
  cidade?: string
  cep?: string
}

export const createCustomer = async (data: any): Promise<any> => {
  return await prisma.customer.create({ data })
}

export const getCustomers = async (): Promise<any> => {
  return await prisma.customer.findMany()
}

export const getCustomersByFilters = async (filters: Filters): Promise<any> => {
  return await prisma.customer.findMany({
    where: {
      AND: [
        { Codigo: { contains: filters.codigo } },
        { Nome: { contains: filters.nome } },
        { Cidade: { contains: filters.cidade } },
        { CEP: { contains: filters.cep } },
      ],
    },
  })
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
  getCustomersByFilters,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
}
