import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
     <SearchBar />
     <Routes>
      <Route path='/login' element={<LoginForm />}></Route>
     <Route path='/register' element={<RegisterForm />}></Route>
     </Routes>
    </>
  )
}

export default App
