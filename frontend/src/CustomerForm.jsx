import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  Nome: yup.string().max(150).required('Nome é obrigatório'),
})

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('Formulário submetido')
    console.log('Dados enviados:', data)
    fetch('http://localhost:3001/customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('retorno do post')
        console.log(response)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Código:</label>
        <input type="text" {...register('Codigo')} />
        <p>{errors.Codigo?.message}</p>
      </div>
      <div>
        <label>Nome:</label>
        <input type="text" {...register('Nome')} />
        <p>{errors.Nome?.message}</p>
      </div>
      <button type="submit">Cadastrar Cliente</button>
    </form>
  )
}

export default CustomerForm
