import { Routes, Route } from 'react-router-dom'

import Home from '../pages/homes';
import Register from '../pages/register';
import Admin from '../pages/admin'

import Private from './Private' // vai proteger o admin

function RoutesApp(){
    return( 
      <Routes> 
        <Route path='/' element={ <Home/> } />
        <Route path='/register' element={ <Register/> } /> 

        <Route path='/admin' element={ <Private> <Admin/> </Private>} />  {/** */}
      </Routes>  
    )
}

export default RoutesApp; 