import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3001

const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
