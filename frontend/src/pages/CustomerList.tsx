import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify'
import CollapseBox from '../components/CollapseBox'
import 'react-toastify/dist/ReactToastify.css'
import {
  Customer,
  getCustomers,
  deleteCustomerById,
} from '../services/customerService'

const CustomerList = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])

  const notify = () =>
    toast.success('Cliente removido com sucesso!', { autoClose: 1800 })

  useEffect(() => {
    ;(async () => {
      const customers = await getCustomers()
      setCustomers(customers)
    })()
  }, [])

  const editCustomer = (id: number) => {
    navigate(`/editar/${id}`)
  }

  const deleteCustomer = async (id: number) => {
    await deleteCustomerById(id)
    const customers = await getCustomers()
    setCustomers(customers)
    notify()
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <CollapseBox title="Filtrar clientes">
      <div className="flex flex-col gap-4">
          {/* Campo Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Filtrar por nome"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Campo Código */}
          <div>
            <label
              htmlFor="codigo"
              className="block text-sm font-medium text-gray-700"
            >
              Código
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              placeholder="Filtrar por código"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </CollapseBox>
      <br />
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2 w-48">Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.ID}>
                <td className="border px-4 py-2">{customer.ID}</td>
                <td className="border px-4 py-2">{customer.Codigo}</td>
                <td className="border px-4 py-2">{customer.Nome}</td>
                <td className="border px-4 py-2 flex space-x-4 w-48">
                  <button
                    className="bg-blue-500 text-white text-xs px-2 py-2 rounded hover:bg-blue-600"
                    onClick={() => editCustomer(customer.ID)}
                  >
                    <PencilSquareIcon className="inline size-4" /> Editar
                  </button>
                  <button
                    className="bg-red-500 text-white text-xs px-2 py-2 rounded hover:bg-red-600"
                    onClick={() => deleteCustomer(customer.ID)}
                  >
                    <TrashIcon className="inline size-4" /> Excluir
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerList
