import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getCustomerById, updateCustomer } from '../services/customerService'

const schema = yup.object().shape({
  Codigo: yup.string().max(150),
  Nome: yup.string().max(150).required('Nome é obrigatório'),
})

const CustomerEditForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    console.log('Formulário de atualização submetido')
    console.log('Dados enviados:', data)
    const customer = await updateCustomer(data.ID, data)
    console.log('Dados recebidos:', customer)
    navigate('/')
  }

  const cancelUpdate = (event: any) => {
    event.preventDefault()
    navigate('/')
  }

  useEffect(() => {
    ;(async () => {
      const customer = await getCustomerById(Number(id))
      reset(customer)
    })()
  }, [id, reset])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1 font-bold">Código:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Codigo')}
          />
          <p>{errors.Codigo?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Nome:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Nome')}
          />
          <p>{errors.Nome?.message}</p>
        </div>
        <br />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Salvar alterações
          </button>
          <button
            onClick={cancelUpdate}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CustomerEditForm
