import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const states = [
    { Nome: 'Acre', Sigla: 'AC' },
    { Nome: 'Alagoas', Sigla: 'AL' },
    { Nome: 'Amapá', Sigla: 'AP' },
    { Nome: 'Amazonas', Sigla: 'AM' },
    { Nome: 'Bahia', Sigla: 'BA' },
    { Nome: 'Ceará', Sigla: 'CE' },
    { Nome: 'Espírito Santo', Sigla: 'ES' },
    { Nome: 'Goiás', Sigla: 'GO' },
    { Nome: 'Maranhão', Sigla: 'MA' },
    { Nome: 'Mato Grosso', Sigla: 'MT' },
    { Nome: 'Mato Grosso do Sul', Sigla: 'MS' },
    { Nome: 'Minas Gerais', Sigla: 'MG' },
    { Nome: 'Pará', Sigla: 'PA' },
    { Nome: 'Paraíba', Sigla: 'PB' },
    { Nome: 'Paraná', Sigla: 'PR' },
    { Nome: 'Pernambuco', Sigla: 'PE' },
    { Nome: 'Piauí', Sigla: 'PI' },
    { Nome: 'Rio de Janeiro', Sigla: 'RJ' },
    { Nome: 'Rio Grande do Norte', Sigla: 'RN' },
    { Nome: 'Rio Grande do Sul', Sigla: 'RS' },
    { Nome: 'Rondônia', Sigla: 'RO' },
    { Nome: 'Roraima', Sigla: 'RR' },
    { Nome: 'Santa Catarina', Sigla: 'SC' },
    { Nome: 'São Paulo', Sigla: 'SP' },
    { Nome: 'Sergipe', Sigla: 'SE' },
    { Nome: 'Tocantins', Sigla: 'TO' },
  ]
  await prisma.state.createMany({ data: states, skipDuplicates: true })
}

;(async () => {
  try {
    await main()
    console.log(`Dados carregados com sucesso!`)
  } catch (error) {
    console.log(`Erro ao carregar dados`)
  }
})()
