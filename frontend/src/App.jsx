import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Importation de la page principale
import Home from "./pages/Home";
import Contact from "./pages/Contact";

// Importation des composants globaux de structure
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importation des styles généraux de l'application
import "./App.css";

function App() {
    // Déclaration des états locaux avec useState :
    // projets : Liste des projets récupérés de l'API (initialisé à tableau vide)
    const [projets, setProjets] = useState([]);

    // technologies : Liste des compétences/technologies de l'API (initialisé à tableau vide)
    const [technologies, setTechnologies] = useState([]);

    // loading : Indicateur de chargement actif/inactif (initialisé à true)
    const [loading, setLoading] = useState(true);

    // error : Message d'erreur s'il y a un souci avec l'API (initialisé à null)
    const [error, setError] = useState(null);

    // useEffect avec un tableau de dépendances vide [] s'exécute uniquement au montage du composant
    useEffect(() => {
        
        //URLs des API Django locales
        const urlProjects = "http://localhost:8000/api/projets/";
        const urlTechnos = "http://localhost:8000/api/projets/list-techno";
       

        // URLs de l'API Django en production
        /* const urlProjects = "https://mon-portfolio-1-48v8.onrender.com/api/projets/";
        const urlTechnos = "https://mon-portfolio-1-48v8.onrender.com/api/projets/list-techno";
 */
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
            <ScrollToTop />
            <Navbar />

            <Routes>
                <Route path="/" element={<Home projets={projets} technologies={technologies} />} />
                <Route path="contact" element={<Contact />} />
            </Routes>

            {/* Pied de page global */}
            <Footer />
        </>
    );
}

export default App;
