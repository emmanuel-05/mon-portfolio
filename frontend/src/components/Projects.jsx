// Importation du composant enfant ProjectCard qui servira à afficher chaque projet
import ProjectCard from "./ProjectCard";
// Importation des styles CSS associés à la section des projets
import "./Projects.css";

/**
 * Composant Projects
 * Gère l'affichage de la section des projets sous forme de grille.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array} props.projets - Un tableau contenant la liste de tous les projets récupérés de l'API.
 */
const Projects = ({ projets }) => {
    return (
        // Section sémantique HTML5 pour regrouper tous les projets
        <section className="projects" id="projects">
            <div className="projects__content">
                {/* Titre principal de la section */}
                <h2 className="projects__title">Projects</h2>

                {/* Grille flexbox/grid pour disposer les cartes projets */}
                <div className="projects__grid">
                    {/* 
            Boucle sur le tableau 'projets' avec la méthode .map() :
            - Chaque élément du tableau est représenté par la variable locale 'project'.
            - Pour chaque projet, on retourne le composant <ProjectCard />.
            - key={project.id} : Très important en React ! Fournit une clé unique et stable à React 
              pour optimiser le rendu et le suivi des éléments dans le DOM virtuel.
            - projet={project} : On transmet l'objet projet complet en tant que propriété (prop) 
              au composant enfant ProjectCard.
          */}
                    {projets.map((project) => (
                        <ProjectCard key={project.id} projet={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Exportation du composant pour son utilisation dans la page d'accueil (Home)
export default Projects;
