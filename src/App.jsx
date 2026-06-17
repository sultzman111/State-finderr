import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Component.jsx/Nav'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import About from './Component.jsx/Abt'
import Service from './pages/Service'
const App = () => {
  return (
<BrowserRouter>
<Nav/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/Signup' element={<Signup/>}/>
<Route path='/Signin' element={<Signin/>}/>
<Route path='/About' element={<About/>}/>
<Route path='/Service' element={<Service/>}/>
</Routes>









</BrowserRouter>

  )
}

export default App