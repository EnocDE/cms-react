export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();
    return resultado;
}

export async function obtenerCliente($id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${$id}`);
    if (!respuesta.ok) {
        throw new Error(
            `Error al obtener el resultado: ${respuesta.status} ${respuesta.statusText}`
        );
    }
    const resultado = await respuesta.json();
    return resultado;
}

export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-type": "application/json",
            },
        });
        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarCliente($id, datos) {
    try {
        const respuesta = await fetch(
            `${import.meta.env.VITE_API_URL}/${$id}`,
            {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );
        if (!respuesta.ok) {
            throw new Error(
                `Error al realizar la petición: ${respuesta.status} ${respuesta.statusText}`
            );
        }
        await respuesta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente($id) {
    try {
        const respuesta = await fetch(
            `${import.meta.env.VITE_API_URL}/${$id}`,
            {
                method: "delete",
            }
        );
        if (!respuesta.ok) {
            throw new Error(
                `Error al realizar la petición: ${respuesta.status} ${respuesta.statusText}`
            );
        }
        await respuesta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}
