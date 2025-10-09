import { useForm } from 'react-hook-form' ;
import { yupResolver } from '@hookform/resolvers/yup' ;
import { contactSchema } from '../validations/contactSchema' ;
import { useAuth } from '../context/authContext';

function ContactPage () {
    const {user, isAdmin} = useAuth();
    const {
        register ,
        handleSubmit ,
        formState : { errors , isSubmitting },
        reset
    } = useForm ({
            resolver: yupResolver (contactSchema )
        });
    const onSubmit = (data) => {
        alert(`Mensaje enviado por ${data.name}`);
        reset();
    };
    return (
        <div className ="contact-page" >
            <h2>📧 Contacto </h2>
            <div className ="contact-content" >
                <div className ="contact-info" >
                    <h3>¿Necesitas ayuda? </h3>
                    <p>📍 Av.60 esq. 126, Berisso, Buenos Aires, Argentina </p>
                    <p>📞 +54 (0221) 412- 4300 </p>
                    <p>✉ info@milibreria.com </p>
                    {/* Botón solo para admin */ }
                    {isAdmin && ( <button onClick ={() => alert('Eres Admin!' )}> Sólo ADMIN </button >) }
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                    <div className="form-group">
                        <input {...register("name")} type="text" placeholder="Tu nombre" className={errors.name ? "input-error" : ""} /> 
                        {errors.name && <span className="field-error">{errors.name.message}</span>}
                    </div>
                    <div className="form-group">
                        <input {...register("email")} type="email" placeholder="Tu email" className={errors.email ? "input-error" : ""} />
                        {errors.email && <span className="field-error">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <textarea {...register("message")} placeholder="Tu mensaje" rows="5" className={errors.message ? "input-error" : ""} />
                        {errors.message && ( <span className="field-error">{errors.message.message}</span> )}
                    </div>
                    <button type="submit" disabled={isSubmitting}> {isSubmitting ? "Enviando..." : "Enviar Mensaje"} </button>
                </form>
            </div>
        </div>
    );
} export default ContactPage;