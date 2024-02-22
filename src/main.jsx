import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {
    action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import EditarCliente, {
    loader as editarClienteLoader,
    action as editarClienteAction,
} from "./pages/EditarCliente";
import { loader as eliminarClienteLoader } from "./pages/EliminarCliente";
import Index, { loader as clientesLoader } from "./pages/Index";
import ErroPage from "./components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />,
                loader: clientesLoader,
                errorElement: <ErroPage />,
            },
            {
                path: "/clientes/nuevo",
                element: <NuevoCliente />,
                action: nuevoClienteAction,
                errorElement: <ErroPage />,
            },
            {
                path: "/clientes/:clienteId/editar",
                element: <EditarCliente />,
                loader: editarClienteLoader,
                action: editarClienteAction,
                errorElement: <ErroPage />,
            },
            {
                path: "/clientes/:clienteId/eliminar",
                loader: eliminarClienteLoader,
                errorElement: <ErroPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
