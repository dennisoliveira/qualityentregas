import { Request, Response } from 'express'
import customerService from '../services/customerService'

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body)
    res.status(201).json(newCustomer)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getCustomers = async (req: Request, res: Response) => {
  const { codigo, nome, cidade, cep } = req.query

  if (Object.keys(req.query).length === 0) {
    try {
      const customers = await customerService.getCustomers()
      res.status(200).json(customers)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  } else if (codigo || nome || cidade || cep) {
    const filters = {
      codigo: codigo?.toString(),
      nome: nome?.toString(),
      cidade: cidade?.toString(),
      cep: cep?.toString(),
    }
    try {
      const customers = await customerService.getCustomersByFilters(filters)
      res.status(200).json(customers)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res
      .status(400)
      .json({
        error: 'Parametros informados não são validos para essa consulta',
      })
  }
}

export const getCustomersById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.getCustomerById(
      Number(req.params.id),
    )
    res.status(200).json(customer)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCustomersById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomerById(
      Number(req.params.id),
      req.body,
    )
    res.status(200).json(customer)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCustomersById = async (req: Request, res: Response) => {
  try {
    await customerService.deleteCustomerById(Number(req.params.id))
    res.status(204).send()
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
