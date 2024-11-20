import { Router } from 'express'
import { getLocationByCep } from '../controllers/cepController'

const router = Router()

router.get('/cep/:cep', getLocationByCep)

export default router
