import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Chargement différé (Code Splitting) des pages pour un premier rendu ultra-rapide
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));

// Composants globaux de structure
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

function App() {
    const [projets, setProjets] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const apiBase = import.meta.env.VITE_API_BASE || '';
        const urlProjects = `${apiBase}/api/projets/`;
        const urlTechnos = `${apiBase}/api/projets/list-techno`;

        const fetchData = async () => {
            try {
                const [resProjects, resTechnos] = await Promise.all([
                    fetch(urlProjects, { signal: controller.signal }),
                    fetch(urlTechnos, { signal: controller.signal })
                ]);

                if (!resProjects.ok || !resTechnos.ok) {
                    throw new Error(`Erreur réseau (${resProjects.status} / ${resTechnos.status})`);
                }

                const [dataProjets, dataTechnos] = await Promise.all([
                    resProjects.json(),
                    resTechnos.json()
                ]);

                setProjets(dataProjets);
                setTechnologies(dataTechnos);
                setLoading(false);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Erreur lors du chargement des données:', err);
                    setError('Impossible de charger les données depuis le serveur.');
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    if (loading) {
        return (
            <div className="loading" role="status" aria-live="polite">
                <div className="spinner"></div>
                <p>Chargement du portfolio gnamien...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error" role="alert">
                <p>⚠️ {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="error__retry-btn"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />

            <Suspense fallback={<div className="loading">Chargement de la page...</div>}>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Home projets={projets} technologies={technologies} />} 
                    />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>

            <Footer />
        </>
    );
}

export default App;
