import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomerList from './pages/CustomerList'
import CustomerForm from './pages/CustomerCreateForm'
import CustomerEditForm from './pages/CustomerEditForm'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/cadastro" element={<CustomerForm />} />
          <Route path="/editar/:id" element={<CustomerEditForm />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
