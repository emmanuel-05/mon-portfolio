// Importation des styles CSS spécifiques à la carte projet
import "./ProjectCard.css";
import { GlobeCheck } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";

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
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article className="project-card">
            {projet.image_url ? (
                <div className="project-card__image-container">
                    <img 
                        src={projet.image_url} 
                        alt={`Capture d'écran du projet ${projet.titre}`} 
                        className="project-card__image"
                        loading="lazy" // charge l'image uniquement quand elle apparaît à l'écran
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
                <p className={`project-card__description ${isExpanded ? 'is-expanded' : 'is-clamped'} `}>{projet.description}</p>
                {/* <p className={`project-card__description ${isExpanded ? 'is-expanded' : 'is-clamped'} `}>
                    {projet.description}
                    {extraCount > 0 && (
                        <button 
                        onClick={() => setIsExpanded(isExpanded)}
                        className="project-card__see-more"
                        >
                            {isExpanded ? 'Voir moins' : 'Voir plus'}
                        </button>
                    )}
                </p> */}

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
                
                <div className="project-card__actions">
                    <h4 className="project-card__action-title">Liens du projet</h4>
                        <a 
                            href={projet.lien_demo} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__action-btn"
                        >
                            <GlobeCheck size={19} />
                        </a>
                        <a 
                            href={projet.lien_github} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__action-btn"
                        >
                            <FaGithub size={19} />
                        </a>

                </div>
                
            </div>
        </article>
    );
};

export default ProjectCard;
