import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { parse, isDate } from 'date-fns'
import { createCustomer } from '../services/customerService'
import { State, getStates } from '../services/stateService'
import { LocationData, getLocationByCep } from '../services/cepService'

const schema = yup.object().shape({
  Codigo: yup.string().max(15),
  Nome: yup.string().max(150).required('Nome é obrigatório'),
  CPF_CNPJ: yup.string().max(20),
  CEP: yup.string().min(8).max(8),
  Endereco: yup.string().max(120),
  Numero: yup.string().max(20),
  Bairro: yup.string().max(50),
  Cidade: yup.string().max(60),
  UF: yup.string().max(2).required('Estado é obrigatório'),
  Complemento: yup.string().max(150),
  Fone: yup.string().max(15),
  LimiteCredito: yup
    .number()
    .typeError('O Limite de crédito precisa ser um valor válido'),
  Validade: yup
    .date()
    .typeError('A Validade precisa ser uma data válida')
    .transform((value, originalValue) => {
      const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'dd/MM/yyyy', new Date())
      return parsedDate
    }),
})

const CustomerForm = () => {
  const [states, setStates] = useState<State[]>([])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    await createCustomer(data)
    navigate('/')
  }

  const handleCepBlur = async () => {
    const { CEP } = watch()
    if (!CEP) return
    const locationData: LocationData = await getLocationByCep(CEP)
    reset({
      ...watch(),
      Endereco: locationData.logradouro,
      Bairro: locationData.bairro,
      Cidade: locationData.localidade,
      UF: locationData.uf,
    })
  }

  useEffect(() => {
    ;(async () => {
      const states = await getStates()
      setStates(states)
    })()
  }, [])

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
        <div>
          <label className="block mb-1 font-bold">CPF_CNPJ:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('CPF_CNPJ')}
          />
          <p>{errors.CPF_CNPJ?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">CEP:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('CEP')}
            onBlur={handleCepBlur}
          />
          <p>{errors.CEP?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Endereco:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Endereco')}
          />
          <p>{errors.Endereco?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Numero:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Numero')}
          />
          <p>{errors.Numero?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Bairro:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Bairro')}
          />
          <p>{errors.Bairro?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Cidade:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Cidade')}
          />
          <p>{errors.Cidade?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">UF:</label>
          <select
            className="w-full border px-4 py-2 rounded"
            {...register('UF')}
          >
            <option value="" defaultValue={''}>
              --
            </option>
            {states.map((state) => (
              <option key={state.Sigla} value={state.Sigla}>
                {state.Nome}
              </option>
            ))}
          </select>
          <p>{errors.UF?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Complemento:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Complemento')}
          />
          <p>{errors.Complemento?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Fone:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Fone')}
          />
          <p>{errors.Fone?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">LimiteCredito:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('LimiteCredito')}
          />
          <p>{errors.LimiteCredito?.message}</p>
        </div>
        <div>
          <label className="block mb-1 font-bold">Validade:</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            {...register('Validade')}
          />
          <p>{errors.Validade?.message}</p>
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
