import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to="/welcome" />; // Redirige si no es admin
    }

    return children; // Permite acceso si es admin
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;