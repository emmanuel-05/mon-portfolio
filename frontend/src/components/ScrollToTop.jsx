import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // useLocation écoute les changements d'URL
  const { pathname } = useLocation();

  useEffect(() => {
    // Dès que le chemin change, on remonte la fenêtre tout en haut instantanément
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ce composant ne visuel rien, il applique juste la logique
};

export default ScrollToTop;