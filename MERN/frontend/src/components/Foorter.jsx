import Logo from "/img/Logo.png";
import Facebook from "/img/facebook.png";
import Instagram from "/img/instagram.png";
import Whatsapp from "/img/whatsapp.png";

const Footer = () => {
    return (
        <>
            <footer className="FooterContainer">
                <div className="FooterRow">
                    {/* Columna 1: Logo y nombre */}
                    <section className="Columna_1">
                        <img src={Logo} alt="Logo" className="LogoFooter" />
                        <p>Rápido y sabroso</p>
                    </section>

                    {/* Columna 2: Contacto */}
                    <section className="Columna_1">
                        <h4>Contacto</h4>
                        <p>Teléfono: +123 456 7890</p>
                        <p>Email: info@rapido_y_sabroso.com</p>
                    </section>

                    {/* Columna 3: Dirección y horarios */}
                    <section className="Columna_1">
                        <h4>Dirección</h4>
                        <p>Avenida Principal 123, Ciudad</p>
                        <h4>Horarios de Atención</h4>
                        <p>Lunes a Viernes: 10:00 AM - 11:00 PM</p>
                        <p>Sábado y Domingo: 12:00 PM - 12:00 AM</p>
                    </section>

                    {/* Columna 4: Redes sociales */}
                    <section className="Columna_1 RedesSociales">
                        <a href="https://es-la.facebook.com/login/">
                            <img className="imgSocial" src={Facebook} alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com/">
                            <img className="imgSocial" src={Instagram} alt="Instagram" />
                        </a>
                        <a href="https://web.whatsapp.com/">
                            <img className="imgSocial" src={Whatsapp} alt="Twitter" />
                        </a>
                    </section>
                </div>

                {/* Pie de página */}
                <div className="FooterBottom">
                    <p>&copy; 2024 Rapido y sabroso. Todos los derechos reservados.</p>
                </div>
                <hr />
            </footer>
        </>
    );
};

export default Footer;
