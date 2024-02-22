import {
    Form,
    useLoaderData,
    useActionData,
    useNavigate,
    redirect
} from "react-router-dom";
import Formulario from "../components/Formulario";
import { obtenerCliente, actualizarCliente } from "../data/Clientes";
import Error from "../components/Error";

export async function loader({ params }) {
    const { clienteId } = params;
    const cliente = await obtenerCliente(clienteId);

    return cliente;
}

export async function action({ request, params }) {
    const formD = await request.formData();
    const datos = Object.fromEntries(formD);
    const id = params.clienteId;
    datos.id = id;

    const email = formD.get("email");

    const regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    const errores = [];
    if (Object.values(datos).includes("")) {
        errores.push("Debes llenar todos los campos");
    }

    if (!regex.test(email)) {
        errores.push("Por favor comprueba el email");
    }

    if (Object.keys(errores).length) {
        return errores;
    }

    await actualizarCliente(id, datos)

    return redirect('/');
}

function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

    console.log(errores);
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">
                Editar Cliente
            </h1>
            <p className="mt-3">
                Actualiza los campos del cliente que requieras actualizar
            </p>

            <div className="flex justify-end">
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
                {errores?.length &&
                    errores.map((error, index) => (
                        <Error key={index}>
                            <p>{error}</p>
                        </Error>
                    ))}

                <Form method="POST" noValidate>
                    <Formulario cliente={cliente} />
                    <input
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-900"
                        type="submit"
                        value="Guardar cliente"
                    />
                </Form>
            </div>
        </>
    );
}

export default EditarCliente;
