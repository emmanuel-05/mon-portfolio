// Importation des hooks React nécessaires :
// - useState : Permet de gérer l'état local dans le composant fonctionnel
// - useEffect : Permet d'exécuter des effets de bord (comme la récupération de données) après le rendu
import { useState, useEffect } from "react";
// Importation des composants de routage de React Router
import { Routes, Route } from "react-router-dom";

// Importation de la page principale
import Home from "./pages/Home";

// Importation des composants globaux de structure
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";

// Importation des styles généraux de l'application
import "./App.css";

function App() {
    // Déclaration des états locaux avec useState :
    // - projets : Liste des projets récupérés de l'API (initialisé à tableau vide)
    const [projets, setProjets] = useState([]);

    // - technologies : Liste des compétences/technologies de l'API (initialisé à tableau vide)
    const [technologies, setTechnologies] = useState([]);

    // - loading : Indicateur de chargement actif/inactif (initialisé à true)
    const [loading, setLoading] = useState(true);

    // - error : Message d'erreur s'il y a un souci avec l'API (initialisé à null)
    const [error, setError] = useState(null);

    // useEffect avec un tableau de dépendances vide [] s'exécute uniquement au montage du composant
    useEffect(() => {
        // URLs des API Django locales
        const urlProjects = "http://127.0.0.1:8000/api/projets/";
        const urlTechnos = "http://127.0.0.1:8000/api/projets/list-techno";

        // Promise.all() permet d'exécuter les deux requêtes fetch en parallèle
        // et d'attendre que les deux soient résolues avec succès.
        Promise.all([
            fetch(urlProjects).then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            }),
            fetch(urlTechnos).then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
        ])
            // Une fois les deux requêtes terminées et converties en JSON :
            .then(([dataProjets, dataTechnos]) => {
                console.log("Projets chargés :", dataProjets);
                console.log("Technologies chargées :", dataTechnos);

                // Mise à jour des états locaux avec les données reçues
                setProjets(dataProjets);
                setTechnologies(dataTechnos);

                // Fin du mode chargement
                setLoading(false);
            })
            // En cas d'erreur sur l'une des requêtes fetch :
            .catch((err) => {
                console.error("Erreur de chargement :", err);
                setError("Impossible de charger les données depuis l'API Django.");
                setLoading(false);
            });
    }, []);

    // Affichage d'un écran de chargement temporaire
    if (loading) return <div className="loading">Chargement...</div>;

    // Affichage d'un écran d'erreur en cas d'échec de la récupération des données
    if (error) return <div className="error"> Oups ! {error}</div>;

    return (
        <>
            {/* Barre de navigation globale */}
            <Navbar />

            {/* Système de navigation par routes */}
            <Routes>
                {/* Route par défaut (Page d'accueil) */}
                <Route path="/" element={<Home projets={projets} technologies={technologies} />} />

                {/* Route secondaire vers la section À propos */}
                <Route path="/about" element={<About />} />
            </Routes>

            {/* Pied de page global */}
            <Footer />
        </>
    );
}

export default App;
