// Importation des différents composants constitutifs de la page d'accueil
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import ContactAcc from "../components/ContactAcc";
import Expertise from "../components/Expertise";

/**
 * Composant de page Home
 * Structure la page principale du portfolio en assemblant les différentes sections.
 *
 * @param {Object} props - Les propriétés passées au composant par App.jsx.
 * @param {Array} props.projets - Le tableau des projets à transmettre à la section Projets.
 * @param {Array} props.technologies - Le tableau des technologies disponibles.
 */
const Home = ({ projets, technologies }) => {
    return (
        // Balise sémantique <main> pour le contenu principal de la page
        <main>
            <Hero />
            <About />
            <Expertise />
            <Projects projets={projets} technologies={technologies} />

            {/* Section Formulaire de contact */}
            <ContactAcc />
        </main>
    );
};

export default Home;
