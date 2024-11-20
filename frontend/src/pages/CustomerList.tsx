import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify'
import CollapseBox from '../components/CollapseBox'
import 'react-toastify/dist/ReactToastify.css'
import {
  Customer,
  Filters,
  getCustomers,
  getCustomersByFilters,
  deleteCustomerById,
} from '../services/customerService'

const schema = yup.object().shape({
  Codigo: yup.string().max(15),
  Nome: yup.string().max(150),
  Cidade: yup.string().max(150),
  CEP: yup.string().max(150),
})

const CustomerList = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

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

  const filterCustomers = async (data: any) => {
    const filters: Filters = {
      codigo: data.Codigo,
      nome: data.Nome,
      cidade: data.Cidade,
      cep: data.CEP,
    }
    const filteredCustomers = await getCustomersByFilters(filters)
    setCustomers(filteredCustomers)
  }

  const clearFilters = async (event: any) => {
    event.preventDefault()
    reset({
      Codigo: '',
      Nome: '',
      Cidade: '',
      CEP: '',
    })
    const customers = await getCustomers()
    setCustomers(customers)
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <CollapseBox title="Filtrar clientes">
        <div>
          <form onSubmit={handleSubmit(filterCustomers)}>
            <div className="flex space-x-4">
              <div>
                <label className="block mb-1 font-bold">Código:</label>
                <input
                  type="text"
                  placeholder="Filtrar por código"
                  className="w-full border px-4 py-2 rounded"
                  {...register('Codigo')}
                />
                <p>{errors.Codigo?.message}</p>
              </div>
              <div>
                <label className="block mb-1 font-bold">Nome:</label>
                <input
                  type="text"
                  placeholder="Filtrar por nome"
                  className="w-full border px-4 py-2 rounded"
                  {...register('Nome')}
                />
                <p>{errors.Nome?.message}</p>
              </div>
              <div>
                <label className="block mb-1 font-bold">Cidade:</label>
                <input
                  type="text"
                  placeholder="Filtrar por Cidade"
                  className="w-full border px-4 py-2 rounded"
                  {...register('Cidade')}
                />
                <p>{errors.Nome?.message}</p>
              </div>
              <div>
                <label className="block mb-1 font-bold">CEP:</label>
                <input
                  type="text"
                  placeholder="Filtrar por CEP"
                  className="w-full border px-4 py-2 rounded"
                  {...register('CEP')}
                />
                <p>{errors.Nome?.message}</p>
              </div>
            </div>

            <br />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Filtrar
              </button>
              <button
                onClick={clearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Limpar filtros
              </button>
            </div>
          </form>
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
