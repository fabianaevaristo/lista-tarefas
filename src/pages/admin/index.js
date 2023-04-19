import {useState, useEffect} from 'react'
import './admin.css'

import {auth, db} from '../../firebaseconnection'
import { signOut} from 'firebase/auth' //o sigOut desloga o ursuario

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
 } from 'firebase/firestore'
import { async } from '@firebase/util'

export default function Admin(){
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState({})

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas(){
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))
      
      
      if(userDetail){
        const data = JSON.parse(userDetail);
        
        console.log(collection(db, "tarefas"))
        const tarefaRef = collection(db, "tarefas")
        
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];
        
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          
          setTarefas(lista);

        })
      }
    }
    loadTarefas()
  }, [])

   async function handerRegister(e){
    e.preventDefault();

    if(tarefaInput === ''){
      alert(" Digite sua tarefa...")
      return;
    }

    if(edit?.id){
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), { //o addDoc vai gerar um documento com o Aid aleatorio
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      console.log("Tarefa registrada")
      setTarefaInput('')
    })
    .catch((error) => {
      console.log("Erro ao registrar" + error)

    })
  }

  async function handerLogout(){
    await signOut(auth);
  }

  async function deleteTarefa(id){
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
  }

  function editTarefa(item){
    setTarefaInput(item.tarefa)
    setEdit(item);
  }

  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas" , edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    
    .then(() => {
      console.log("tarefa atualizada")
      setTarefaInput('')
      setEdit({})
    })
    .catch(() => {
      console.log("Erro ao atualizar")
      setTarefaInput('')
      setEdit({})
    })
  }

  return(
    <div className="admin-container">
      <h1> Minhas tarefas </h1>

      <form className="form" onSubmit={handerRegister}>
        <textarea
        placeholder="digite sua tarefa..."
        value={tarefaInput}
        onChange={(e) => setTarefaInput(e.target.value)}
        />
        
        {Object.keys(edit).length > 0 ? ( // abaixo é tipo um if e else, se está maior que zero, clicou em editar. ficando com o botão (atualizar tarefa). se for maior que zero fica no botão (registrar tarefa)
          <button className="btn-register" style={{ backgroundColor: '#6add25' }} type="submit"> Atualizar tarefa </button> // o button dentro {Objct...} é renderização condicional
        ) : (
          <button className="btn-register" type="submit"> Registrar tarefa </button>
        )} 
        
      </form>

      {tarefas.map((item) => (
      <article key={item.id} className="list" >
        <p> {item.tarefa} </p>
              
        <div>
          <button onClick={ () => editTarefa(item) }> Editar </button>
          <button onClick={ () => deleteTarefa(item.id) } className="delete" > Concluir </button>
        </div>
      </article>
      ))}

      <button className="btn-logout" onClick={handerLogout}> Sair </button>

    </div>
  )
}