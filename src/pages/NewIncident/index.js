import React from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import { useForm } from 'react-hook-form'

export default function NewIncident() {
  const { handleSubmit, register } = useForm()
  const ongId = localStorage.getItem('@ong:id')
  const history = useHistory()

  async function handleNewIncident(data) {
    try {
      await api.post('incidents', data, { 
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch(ex) {
      alert(`Erro ao tentar registrar incidente`)
    }
  }

  return (
    <div className="new-incident-container">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>

        <h1>Cadastrar novo caso</h1>
        <p>
          Descreva o novo caso detalhadamente para encontrar um herói para 
          resolver isso.
        </p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041"/>
          Voltar para home
        </Link>
      </section>

      <form onSubmit={handleSubmit(handleNewIncident)}>
        <input 
          type="text" 
          placeholder="Título do caso" 
          name="title" 
          ref={register} 
        />
        <textarea 
          type="text" 
          placeholder="Descrição" 
          name="description" 
          ref={register} 
        />
        <input 
          type="text" 
          placeholder="Valor em reais" 
          name="value" 
          ref={register} 
        />

        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
  )
}