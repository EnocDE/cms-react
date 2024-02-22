import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

function Layout() {
    const { pathname } = useLocation();

    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">
                    CRM - Clientes
                </h2>

                <nav className="mt-10">
                    <Link
                        className={`text-2xl block mt-2 text-white 
                        ${pathname === "/" ? "text-blue-400" : ""}`}
                        to="/">
                        Clientes
                    </Link>
                    <Link
                        className={`text-2xl block mt-2 text-white 
                        ${
                            pathname === "/clientes/nuevo"
                                ? "text-blue-400"
                                : ""
                        }`}
                        to="/clientes/nuevo">
                        Nuevo cliente
                    </Link>
                </nav>
            </aside>

            <main className="md:w-3/4 p-10 md:h-screen text-black overflow-scroll transition-colors">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
