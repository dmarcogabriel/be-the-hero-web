import React from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import api from '../../services/api'

export default function Register() {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  async function handleRegister(data) {
    try {
      const response = await api.post('ongs', data)

      alert(`Seu Id de acesso é ${response.data.id}`)
      
      history.push('/')
    } catch(ex) {
      console.log(ex);
      alert('Erro ao cadastrar ONG')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para logon
          </Link>
        </section>

        <form onSubmit={handleSubmit(handleRegister)}>
          <input 
            type="text" 
            name="name" 
            placeholder="Nome da ONG" 
            ref={register} 
          />
          <input type="text" name="email" placeholder="E-mail" ref={register} />
          <input 
            type="text" 
            name="whatsapp" 
            placeholder="WhatsApp" 
            ref={register} 
          />

          <div className="input-group">
            <input 
              type="text" 
              name="city" 
              placeholder="Cidade" 
              ref={register} 
            />
            <input 
              type="text" 
              name="uf"
              placeholder="UF" 
              style={{ width: 80 }} 
              ref={register} 
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}