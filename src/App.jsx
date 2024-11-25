import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=> res.json())
    .then(data=>setUsers(data))

  },[])

  const handleSubmit =(e)=>{
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value

    const user = {name , email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data=>{
      console.log(data);
      const newUsers = [...users, data]
      setUsers(newUsers)
      
    })
    
  }


  return (
    <>

      <h1>Total users {users.length}</h1>
      <h3>Fill the form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='enter name' name='name' /><br />
        <input type="text" placeholder='enter email' name='email' /><br />
        <button type="submit">Submit</button>
      </form>

      {
        users.map(item=><p key={item.id}>{item.id} : {item.name} : {item.email}</p>)
      }
      
    </>
  )
}

export default App
