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
  try {
    const customers = await customerService.getCustomers(req.body)
    res.status(200).json(customers)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
