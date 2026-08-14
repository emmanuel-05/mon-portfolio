import React, { useState, memo } from 'react';
import { GlobeCheck } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectCard.css';

/**
 * Composant ProjectCard optimisé (React.memo)
 * Affiche la carte d'un projet avec gestion défensive des données et lazy loading.
 */
const ProjectCard = memo(({ projet }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_VISIBLE = 3;

    const technologies = projet?.technologies || [];
    const visibleTechs = technologies.slice(0, MAX_VISIBLE);
    const extraCount = technologies.length - MAX_VISIBLE;

    return (
        <article className="project-card">
            {projet?.image_url ? (
                <div className="project-card__image-container">
                    <img
                        src={projet.image_url}
                        alt={`Capture d'écran du projet ${projet.titre || ''}`}
                        className="project-card__image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            ) : (
                <div className="project-card__image-placeholder">
                    <span>Pas d'aperçu disponible</span>
                </div>
            )}

            <div className="project-card__body">
                <h3 className="project-card__title">{projet?.titre}</h3>
                
                <p 
                    className={`project-card__description ${isExpanded ? 'is-expanded' : 'is-clamped'}`}
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    {projet?.description}
                </p>

                {technologies.length > 0 && (
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

                {(projet?.lien_demo || projet?.lien_github) && (
                    <div className="project-card__actions">
                        <span className="project-card__action-title">Liens du projet</span>
                        <div className="project-card__action-links">
                            {projet.lien_demo && (
                                <a
                                    href={projet.lien_demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__action-btn"
                                    aria-label={`Démonstration en ligne du projet ${projet.titre}`}
                                    title="Voir la démo en ligne"
                                >
                                    <GlobeCheck size={19} />
                                </a>
                            )}
                            {projet.lien_github && (
                                <a
                                    href={projet.lien_github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__action-btn"
                                    aria-label={`Code source GitHub du projet ${projet.titre}`}
                                    title="Voir le code source"
                                >
                                    <FaGithub size={19} />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
