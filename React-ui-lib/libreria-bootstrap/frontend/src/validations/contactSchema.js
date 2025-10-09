import * as yup from 'yup';
export const contactSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio').min(5, 'El nombre debe tener al menos 5 caracteres').max(50, 'El nombre no debe exceder los 50 caracteres'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  message: yup.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(500, 'El mensaje no debe exceder los 500 caracteres').required('El mensaje es obligatorio'),
});