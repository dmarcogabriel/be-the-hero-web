import React from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { useForm } from 'react-hook-form'

export default function Logon() {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  async function handleLogon({ id }) {
    if (id) {
      try {
        const res = await api.post('sessions', { id })

        localStorage.setItem('@ong:id', id)
        localStorage.setItem('@ong:name', res.data.ong.name)

        history.push('profile')
      } catch(ex) {
        alert(`Falha no login, tente novamente`)
      }
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleSubmit(handleLogon)}>
          <h1>Faça seu logon</h1>
 
          <input type="text" name="id" placeholder="Sua ID" ref={register} />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}