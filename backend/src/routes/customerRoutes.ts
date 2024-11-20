import { Router } from 'express'
import {
  createCustomer,
  getCustomers,
  getCustomersById,
  updateCustomersById,
  deleteCustomersById
} from '../controllers/customerController'

const router = Router()

router.post('/customers', createCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomersById)
router.put('/customers/:id', updateCustomersById)
router.delete('/customers/:id', deleteCustomersById)

export default router
