import { redirect } from "react-router-dom";
import { eliminarCliente } from "../data/Clientes";

export async function loader({ params }) {
    const id = params.clienteId;

    const respuesta = confirm("¿Seguro que quieres eliminar este cliente?");
    if (respuesta) {
        await eliminarCliente(id);
    }
    return redirect('/')
}