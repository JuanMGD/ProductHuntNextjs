/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import { css } from '@emotion/react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'

import firebase from '../firebase'

// validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {
  
  const [error, guardarError] = useState(false)

  const { valores, errores, handleSubmit, handlechange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)

  const { nombre, email, password } = valores

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password)
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al crear un usuario', error.message);
      guardarError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear cuenta</h1>
          <Formulario 
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id='nombre' 
                placeholder='Tu nombre'
                name='nombre'
                value={nombre}
                onChange={handlechange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.nombre && <Error>{errores.nombre}</Error> }

            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id='email' 
                placeholder='Tu email'
                name='email'
                value={email}
                onChange={handlechange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.email && <Error>{errores.email}</Error> }

            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                id='password' 
                placeholder='Tu contraseña'
                name='password'                
                value={password}
                onChange={handlechange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.password && <Error>{errores.password}</Error> }

            {error && <Error>{error}</Error> }

            <InputSubmit type="submit" value="Crear cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default CrearCuenta
