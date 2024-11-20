import { Request, Response } from 'express'
import cepService from '../services/cepService'

export const getLocationByCep = async (req: Request, res: Response) => {
  try {
    const locationData = await cepService.getLocationByCep(req.params.cep)
    res.status(200).json(locationData)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
