import React, { useState } from 'react'
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../context/authContext'
import { loginSchema } from '../validations/loginSchema'

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [err, setErr] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data) => {
    setErr(null)
    try {
      await login(data.email.trim().toLowerCase(), data.password)
      nav('/', { replace: true }) // entra al home con Layout
    } catch (e) {
      setErr(e.message || 'Credenciales inválidas')
      setError('root', {
        type: 'manual',
        message: 'Credenciales inválidas'
      })
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
         style={{
           background: "url('../assets/Imagenes/alejandria.jpg') center/cover no-repeat",
           backdropFilter: 'blur(2px)'
         }}>
      <Card className="shadow" style={{ minWidth: 380, maxWidth: 420 }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Iniciar sesión</Card.Title>
          {err && <Alert variant="danger">Error: {err}</Alert>}
           <Form onSubmit={handleSubmit(onSubmit)}>
             <Form.Group className="mb-3">
               <Form.Label>Email</Form.Label>
               <Form.Control 
                 type="email" 
                 {...register("email")} 
                 isInvalid={!!errors.email}
               />
               {errors.email && (
                 <Form.Control.Feedback type="invalid">
                   {errors.email.message}
                 </Form.Control.Feedback>
               )}
             </Form.Group>
             <Form.Group className="mb-3">
               <Form.Label>Contraseña</Form.Label>
               <Form.Control 
                 type="password" 
                 {...register("password")} 
                 isInvalid={!!errors.password}
               />
               {errors.password && (
                 <Form.Control.Feedback type="invalid">
                   {errors.password.message}
                 </Form.Control.Feedback>
               )}
             </Form.Group>
             <div className="d-grid">
               <Button type="submit" disabled={isSubmitting}>
                 {isSubmitting ? 'Ingresando…' : 'Ingresar'}
               </Button>
             </div>
           </Form>
        </Card.Body>
      </Card>
    </div>
  )
}