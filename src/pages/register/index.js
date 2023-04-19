import { useState } from 'react'

import { Link } from 'react-router-dom'
import { auth } from '../../firebaseconnection'
import { createUserWithEmailAndPassword } from 'firebase/auth' //metodo para fazer o login
import { useNavigate } from 'react-router-dom'


export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate(); //instaciar o navigate

  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){  //se seu email for diferente de zero e sua senha for diferente de zero
      await createUserWithEmailAndPassword (auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true})
      })
      .catch(() => {
        console.log("erro ao fazer o cadastro")
      })


    }else{
      alert("prencha todos os campos!")
    }

    }
     
    return(
      <div class="home-container">
        <h1> Cadastre-se </h1>
        <span> Vamos criar sua conta.</span>

        <form className="form" onSubmit={handleRegister}>
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

          <button type="submit"> Cadastrar </button>
        </form>

        <Link className="button-Link" to="/">
          Já possui uma conta? Faça o login!
        </Link>
        
      </div>
    )
  }