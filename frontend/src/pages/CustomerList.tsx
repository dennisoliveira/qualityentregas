import { useEffect, useState } from 'react'
import { Customer, getCustomers } from '../services/customerService'

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    getCustomers().then((response) => {
      setCustomers(response)
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">Nome</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.ID}>
                <td className="border px-4 py-2">{customer.ID}</td>
                <td className="border px-4 py-2">{customer.Codigo}</td>
                <td className="border px-4 py-2">{customer.Nome}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerList
