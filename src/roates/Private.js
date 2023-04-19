import { useState, useEffect } from "react"; //fazer verificação se tem ou não usuário logado

import { auth } from '../firebaseconnection'
import { onAuthStateChanged } from 'firebase/auth' // vai ferificar se tem usuario logado ou não

import { Navigate } from 'react-router-dom'

export default function Private({ children }){ //esses dois estados abaixo (consts) é pra saber se está logado
  const [loading, setLoading] = useState(true); //é true pq começa carregando até saber se tem usuário ou não
  const [signed, setSigned] = useState(false); //vai começar com false pq ele não começa logado.

  useEffect(() => { //ciclo de vida, chama quando o componete for chamado para a pagina Admin
    async function checkLogin(){
      const unsub = onAuthStateChanged(auth, (user) => { //fazendo verificação se tem usuario logado ou não
        
        //posso verificar se tem User logado
        if(user){ //se tem usuario logado, cai dentro desse if
         const userData = { 
            uid: user.uid, //o uid é um objeto
            email: user.email //o email é um objeto
         }

        localStorage.setItem("@detailUser", JSON.stringify(userData)) //no localStorage vou salvar os dados do email e senha caso precise depois. foi o nome que dei, usei o objeto userData para salvar no localStorage 
        
         setLoading(false); //passei pra false, pq agora tem usuario e já passei pelo ocalStorage
         setSigned(true); //agora está true pq vou informa que acabou o loading e agora o usuario está logado de verdade.

        } else{ 
            //não possui User logado
            setLoading(false); //muda de true para false
            setSigned(false); //permace false pq não tem usuario logado 
        }
      })
    }

    checkLogin();
  }, [])

  if(loading){ //estamos faendo verificações. se tiver carregando, damos um reurno
    return(
        <div></div> //vai retornar um DIV em branco
    )
  }
  
  if(!signed){ //o (!) siginifica negação. nesse caso quer dizer não esá logado
    return <Navigate to="/"/> //quando não estiver logado direciona ele para a página da Home
  }

  
  return children; //o children significa deixa prosegui
}