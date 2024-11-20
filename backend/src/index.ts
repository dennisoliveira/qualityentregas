import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import customerRoutes from './routes/customerRoutes'
import cepRoutes from './routes/cepRoutes '
import statesRoutes from './routes/stateRoutes'
dotenv.config()
const PORT = process.env.PORT || 3001

const app: Application = express()
app.use(cors())
app.use(express.json())

app.use('/', customerRoutes)
app.use('/', cepRoutes)
app.use('/', statesRoutes)
app.get('/', async (req: Request, res: Response) => {
  res.send(`Server is running on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
