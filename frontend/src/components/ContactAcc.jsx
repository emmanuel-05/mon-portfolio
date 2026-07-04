import "./ContactAcc.css";
import { Link } from "react-router-dom";
const ContactAcc = () => {
  return (
    <section className="cta">
      <div className="cta__content">
        <h2 className="cta__title">Travaillons ensemble </h2>
        <p className="cta__subtitle">
          Je suis disponible pour des opportunités professionnelles et des missions en freelance.
          N'hésitez pas à me contacter pour discuter de votre projet.
        </p>
        <Link to="/contact" className="btn btn--primary">Contactez-moi</Link>

      </div>
    </section>
  );
};

export default ContactAcc;