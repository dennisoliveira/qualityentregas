import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createCustomer } from '../services/customerService'

const schema = yup.object().shape({
  Codigo: yup.string().max(150),
  Nome: yup.string().max(150).required('Nome é obrigatório'),
})

const CustomerForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    console.log('Formulário submetido')
    console.log('Dados enviados:', data)
    const customer = await createCustomer(data)
    console.log('Dados recebidos:', customer)
    navigate('/')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Cliente</h1>
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
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm
