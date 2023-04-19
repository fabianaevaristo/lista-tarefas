import { BrowserRouter } from 'react-router-dom'
import RoutesApp from "./roates/index"

export default function App(){

  return(
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  )
}