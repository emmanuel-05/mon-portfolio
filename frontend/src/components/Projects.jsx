import ProjectCard from "./ProjectCard";
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
        <section className="projects" id="projects">
            <div className="projects__content">
                <h2 className="projects__title">Mes Projets</h2>
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

export default Projects;
