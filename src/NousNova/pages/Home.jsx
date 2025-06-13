import { Link } from 'react-router-dom';
import "../styles/home.css"

function NousNovaHomePage(){
    return(
        <div className="HomePageGlobalDiv">
            <div className="NousNovaHome">
                <div className="galaxy-grid" style={{width:"80%"}}>
                    {/* Saudação filosófica */}
                    <section id="welcome-section">
                        <h2>Bem-vindo à Nous Nova</h2>
                        <p>
                            Na contramão do ensino engessado e mercantilizado, a Nous Nova nasce como um refúgio para os que ainda acreditam no poder transformador do saber. Mais que uma escola, somos um movimento. Um espaço onde aprender é um ato de liberdade, investigar é um modo de viver, e o conhecimento é tratado com a dignidade que merece — como um bem sagrado, compartilhado, vivo. Aqui, não moldamos mentes: acendemos ideias.
                        </p>
                    </section>

                    {/* Caminhos disponíveis */}
                    <section id="navigation-cards">
                        <Link to="/nousnova/about" className="card-link">
                        <div className="card">
                        <h3>🌱 Sobre a Nous Nova</h3>
                        <p>Conheça nossa filosofia e história.</p>
                        Explorar
                        </div>
                        </Link>
                        <Link to="/nousnova/private-lessons" className="card-link">
                        <div className="card">
                        <h3>👨‍🏫 Aulas Particulares</h3>
                        <p>Comece sua jornada personalizada.</p>
                        Agendar
                        </div>
                        </Link>
                        <Link to="/nousnova/courses" className="card-link">
                        <div className="card">
                        <h3>🌌 Universo de Cursos</h3>
                        <p>Explore nossa galáxia do saber.</p>
                        Descobrir
                        </div>
                        </Link>
                    </section>

                    {/* Chamada final */}
                    <section id="closing-quote">
                        <img src="LogoPerfilTransparente.png" />
                        <p>O conhecimento é prazer, é poder, é liberdade.</p>
                        <div style={{marginTop:"10%"}}>
                            <a href="/Manifesto.pdf" download="Manifesto_Nous_Nova.pdf" className="planet-button" >Baixar Manifesto</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default NousNovaHomePage;