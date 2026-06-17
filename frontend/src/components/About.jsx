import "./About.css";

const About = () => {
    return (
        <section className="about" id="about">
            <div className="about__content">
                <h2 className="about__title">About</h2>
                <p className="about__text">
                    Étudiant en Big Data et IA, je conçois des applications web et mobiles performantes
                    en intégrant toute la chaîne de la donnée et de l'intelligence artificielle.
                </p>
                <p className="about__text">
                    De l'interface utilisateur jusqu'à l'infrastructure invisible, je construis des 
                    solutions complètes et intelligentes centrées sur les besoins réels.
                </p>
            </div>
        </section>
    );
};

export default About;
