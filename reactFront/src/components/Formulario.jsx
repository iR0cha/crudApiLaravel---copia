import { use } from "react";
import { useForm } from "react-hook-form";


const Formulario = () => {
    
    const { register, handleSubmit, formState:{errors} } = useForm();

    /* funcion donde recibimos los datos del fomrulario */
    const onSubmit = (data) => {
        console.log(data);
    }

    return <div>
        <h2>Formulario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre</label>
                <input type="text" {...register('name', {
                    required:true,
                    maxLenth:15
                })} />
                {errors.name?.type === 'required' && <p>Nombre requerido</p>}
                {errors.name?.type === 'required' && <p>max 10 caracteres</p>}  
            </div>
            <div>
                <label>Email</label>
                <input type="text" {...register('email', {
                    required:true,
                    pattern: /[^[^s@]+@[^\s@]+\.[^\s@]+$/i
                })} />
                {errors.email?.type === 'pattern' && <p>example@gmail.com</p>}
                {errors.name?.type === 'required' && <p>Email requerido </p>}
            </div>
            <div>
                <label>Telefono</label>
                <input type="text" {...register('phone', {
                    required:true,
                }   
                )} />
                {errors.phone?.type === 'required' && <p>Telefono requerido</p>}
            </div>
            <div>
                <select {...register('language')}>
                    <option value="es">Spanish</option>
                    <option value="in">English</option>
                    <option value="por">Portugues</option>
                </select>
            </div>
            <input type="submit" value="Enviar"/>
        </form>
    </div>
}

export default Formulario;