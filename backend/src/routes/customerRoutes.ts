import { Router } from 'express'
import { createCustomer, getCustomers } from '../controllers/customerController'

const router = Router()

router.post('/customers', createCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:id', () => {})
router.put('/customers/:id', () => {})
router.delete('/customers/:id', () => {})

export default router
