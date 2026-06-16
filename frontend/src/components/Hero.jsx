import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero__content">
                <h1 className="hero__title">Software Developer</h1>
                <p className="hero__subtitle">
                    Développement de solutions logicielles performantes pour le web, les appareils
                    mobiles
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="btn btn--primary">
                        View my projects <span className="btn__arrow">→</span>
                    </a>
                    <a href="#contact" className="btn btn--secondary">
                        Contact me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
