import { Request, Response } from 'express'
import stateService from '../services/stateService'

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await stateService.getStates()
    res.status(200).json(states)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
