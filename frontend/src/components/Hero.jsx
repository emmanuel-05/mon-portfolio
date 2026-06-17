import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero__content">
                <h1 className="hero__title">Full-Stack Product & Data Engineer</h1>
                <p className="hero__subtitle">
                    Développement Full-Stack, Pipelines Data, Applications Mobiles & Intégration IA.
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="btn btn--primary">
                        Voir mes projets
                    </a>
                    <a href="#contact" className="btn btn--secondary">
                        Contactez-moi
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
