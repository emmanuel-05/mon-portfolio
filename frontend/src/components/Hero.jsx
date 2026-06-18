import "./Hero.css";
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin } from 'react-icons/fi';


const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero__content">
                <h1 className="hero__title">Full-Stack Product & Data Engineer</h1>
                <p className="hero__subtitle">
                    Développement Full-Stack, Pipelines Data, Applications Mobiles & Intégration IA.
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="btn btn--primary">Voir mes projets</a>
                    <Link to="/contact" className="btn btn--secondary">Contact</Link>
                    <div className="hero__socials">
                        <a
                            href="https://www.linkedin.com/in/gnamien-bi-hirigolin-emmanuel-pers%C3%A9v%C3%A9rance-662189284"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project__link"
                        >
                            <FiLinkedin size={35} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
