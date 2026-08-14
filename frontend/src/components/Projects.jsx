import React, { memo } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

/**
 * Composant Projects (Section Grille de projets)
 * Mémorisé via React.memo pour éviter des recalculs inutiles.
 */
const Projects = memo(({ projets = [] }) => {
    return (
        <section className="projects" id="projects">
            <div className="projects__content">
                <h2 className="projects__title">Mes Projets</h2>
                
                {projets.length === 0 ? (
                    <div className="projects__empty">
                        <p>Aucun projet disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="projects__grid">
                        {projets.map((project) => (
                            <ProjectCard key={project.id} projet={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
