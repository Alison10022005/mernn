import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from "/img/Logo.png";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/CategoriesPage"); // Redirigir al inicio después del logout
    };

    return (
        <nav className="bg-zinc-700 my-3  flex justify-between py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? (user?.role === 'admin' ? "/dashboard" : "/welcome") : "/"}>
               <div className="LogoDisplay">
            <img 
                        src={Logo} 
                        alt="Logo de la empresa" 
                        className="h-10 w-auto" // Clase para ajustar el tamaño del logo
                    />
                    
                <h1 className="text-2xl font-bold">Rapido y sabroso</h1>
                </div>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>Bienvenido, {user?.username}</li>
                        {user?.role === 'admin' && (
                            <li>
                                <Link to="/dashboard" className="bg-indigo-500 px-4 py-1 rounded-md my-2">
                                    Ir al Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-1 rounded-md my-2"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>

                    <li>
                            <Link to="/Cart" className="botoncarrito bg-indigo-500 px-4 py-1 rounded-md my-2">
                                Carrito de compras
                            </Link>
                        </li>

                        <li>
                            <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-md my-2">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-md my-2">
                                Register
                            </Link>
                        </li>

                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
