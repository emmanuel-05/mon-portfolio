import "./Footer.css";
import { Link } from 'react-router-dom'; // 1. On importe Link pour la navigation interne
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__head">
                <div className="footer__portfolio">
                    <h3>Portfolio</h3>
                    <p>Développeur Full-Stack passionné par la création de solutions innovantes.</p>
                </div>

                <div className="footer__nav">
                    <h3>Navigation</h3>
                    <Link to="/">Accueil</Link>
                    <Link to="/projects">Projets</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer__socials">
                    <h3>Réseaux</h3>
                    <div className="footer__socials-icons">
                        <a
                            href="https://github.com/emmanuel-05/"
                            target="_blank"
                            rel="noreferrer"
                            className="project__link"
                        >
                            <FiGithub size={20} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/gnamien-bi-hirigolin-emmanuel-pers%C3%A9v%C3%A9rance-662189284"
                            target="_blank"
                            rel="noreferrer"
                            className="project__link"
                        >
                            <FiLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer__inner">
                <p className="footer__text">
                    © {new Date().getFullYear()} Portfolio. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;