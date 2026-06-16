import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">
                © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
