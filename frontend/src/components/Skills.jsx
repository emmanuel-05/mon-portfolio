function Skills({ technologies }) {
    return (
        <section className="skills-section">
            <h2>Mes Compétences</h2>
            <div className="skills-container">
                {technologies.length === 0 ? (
                    <p>Aucune compétence enregisterée.</p>
                ) : (
                    technologies.map((tech) => (
                        <div key={tech.id} className="skill-card">
                            <span className="skill-name">{tech.nom}</span>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Skills;
