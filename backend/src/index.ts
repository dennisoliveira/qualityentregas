import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import prisma from './databases/prismaClient'

dotenv.config()
const PORT = process.env.PORT || 3001

const app: Application = express()
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  try {
    const customer = await prisma.customer.create({
      data: { Codigo: '11234', Nome: 'Nome cliente' },
    })
    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
