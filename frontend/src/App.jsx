import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Initialiser l'état pour stocker nos projets (un tableau vide par défaut)
  const [projets, setProjets] = useState([]);
  // État optionnel pour gérer le chargement ou les erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Déclencher la fonction de récupération au chargement du composant
  useEffect(() => {
    // URL de l'API Django (ajuste le port si nécessaire, ex: 8000)
    const urlAPI = 'http://127.0.0.1:8000/api/projets/';

    fetch(urlAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        return response.json(); // Convertit la réponse textuelle en JSON [cite: 8, 14]
      })
      .then((data) => {
        setProjets(data); // Stocke les données de Django dans notre état 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Impossible de charger les projets :", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Le tableau vide [] signifie "exécuter cette fonction une seule fois au chargement"

  // 3. Gestion des affichages d'attente ou d'erreur
  if (loading) return <div className="loading">Chargement de mes super projets...</div>;
  if (error) return <div className="error">Oups ! Une erreur est survenue : {error}</div>;

  // 4. L'affichage de ton Portfolio si tout s'est bien passé [cite: 8]
  return (
    <div className="portfolio-container">
      <header>
        <h1>Mon Portfolio Full-Stack</h1>
        <p>Découvrez les projets que j'ai développés avec Django et React !</p>
      </header>

      <main>
        <section className="projets-section">
          <h2>Mes Projets ({projets.length})</h2>
          
          {projets.length === 0 ? (
            <p>Aucun projet trouvé. Ajoute-en dans le panel Admin de Django !</p>
          ) : (
            <div className="projets-grid">
              {projets.map((projet) => (
                <article key={projet.id} className="projet-card">
                  {/* Si tu as configuré les images dans Django */}
                  {projet.image && (
                    <img src={projet.image} alt={projet.titre} className="projet-img" />
                  )}
                  <div className="projet-content">
                    <h3>{projet.titre}</h3>
                    <p>{projet.description}</p>
                    <div className="tech-tags">
                        {projet.technologies.split(',').map((tech, index) => {
                            const cleanedTech = tech.trim();
                            // On n'affiche le tag que s'il n'est pas vide
                            return cleanedTech ? (
                                <span key={index} className="tech-tag">
                                    {cleanedTech}
                                </span>
                            ) : null;
                        })}
                    </div>
                    {projet.lien_github && (
                      <a href={projet.lien_github} target="_blank" rel="noopener noreferrer" className="btn-github">
                        Voir sur GitHub
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;