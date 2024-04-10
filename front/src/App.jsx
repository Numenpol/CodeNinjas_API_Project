import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'

import RegisterForm from './components/RegisterForm'

function App() {

  return (
    <>
     <Routes>
      <Route index element={<LoginForm />}></Route>
     <Route path='/register' element={<RegisterForm />}></Route>
     </Routes>
    </>
  )
}

export default App
