import { useLocation, useNavigate } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.name || "Usuario";

  return (
    <div className="welcome">
      <h1 className="Welcometitle">Bienvenido, {userName}!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aquí puedes explorar y descubrir más sobre nuestra aplicación.
      </p>
      <button onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
}

export default Welcome;
