// Importation des styles CSS spécifiques à la carte projet
import "./ProjectCard.css";

/**
 * Composant ProjectCard
 * Affiche les détails d'un projet individuel reçu via les props.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Object} props.projet - L'objet projet contenant titre, description, technologies, lien_github.
 */
const ProjectCard = ({ projet }) => {
    const MAX_VISIBLE = 3;
    const visibleTechs = projet.technologies.slice(0, MAX_VISIBLE);
    const extraCount = projet.technologies.length - MAX_VISIBLE;
    return (
        // Balise sémantique HTML5 <article> représentant un contenu autonome (la carte projet)
        <article className="project-card">
            {projet.image_url ? (
                <div className="project-card__image-container">
                    <img 
                        src={projet.image_url} 
                        alt={`Capture d'écran du projet ${projet.titre}`} 
                        className="project-card__image"
                        loading="lazy" // Optimisation performance : charge l'image uniquement quand elle apparaît à l'écran
                    />
                </div>
            ) : (
                /* Un bloc gris par défaut si jamais un projet n'a pas encore d'image */
                <div className="project-card__image-placeholder">
                    <span>Pas d'aperçu disponible</span>
                </div>
            )}

            <div className="project-card__body">
                <h3 className="project-card__title">{projet.titre}</h3>
                <p className="project-card__description">{projet.description}</p>

                {/* 
                    Section des technologies (tags) :
                    1. On vérifie si la liste de technologies existe et n'est pas vide.
                    2. Si oui, on affiche un conteneur div avec la classe CSS 'project-card__tags'.
                    3. On utilise .map() pour boucler sur chaque technologie de la liste.
                    4. Pour chaque technologie, on génère un élément <span> avec une clé unique (tech.id) 
                        et on affiche son nom (tech.nom).
                */}

                {projet.technologies && projet.technologies.length > 0 && (
                    <div className="project-card__tags">
                        {visibleTechs.map((tech) => (
                            <span key={tech.id} className="project-card__tag">
                                {tech.nom}
                            </span>
                        ))}
                        {extraCount > 0 && (
                            <span className="project-card__tag--extra">+{extraCount} plus</span>
                        )}
                    </div>
                )}

                <a href={projet.lien_github} target="_blank" rel="noopener noreferrer">
                    Voir le projet
                </a>
            </div>
        </article>
    );
};

export default ProjectCard;
