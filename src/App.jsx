import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Component.jsx/Nav'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from '.pages/Signin'


const App = () => {
  return (
<BrowserRouter>
<Nav/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/Signup' element={<Signup/>}/>
<Route path='/Signin' element={<Signin/>}/>


  
</Routes>









</BrowserRouter>

  )
}

export default App