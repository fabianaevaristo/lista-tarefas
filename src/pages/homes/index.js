import { useState } from 'react'
import './home.css'

import { Link} from 'react-router-dom'

import { auth } from '../../firebaseconnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'


export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
           
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){  //se seu email for diferente de zero e sua senha for diferente de zero
      
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          //NAVEGAR PARA /ADMIN
          navigate('/admin', {replace: true} )
        })
        .catch(() => {
          console.log("erro ao fazer o LOGIN")
        })

    }else{
      alert("prencha todos os campos!")
    }


    
    }
     
    return(
      <div className="home-container">
        <h1> Lista de tarefas </h1>
        <span> Gerencie sua agenada de forma fácil.</span>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="test"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit"> Acessar </button>
        </form>

        <Link className="button-Link" to="/register">
          Não possui uma conta? cadastre-se
        </Link>
      </div>
    )
  }